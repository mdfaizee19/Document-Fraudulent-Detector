const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function extractStructuredJSON(ocrText) {
const prompt = `
You are an expert import/export compliance analyst.  
Your job is to take noisy, incomplete, or corrupted OCR text and generate a FULLY POPULATED, REALISTIC, CONSISTENT structured JSON object.

RULES (READ CAREFULLY):
1. You MUST fill every field with a realistic, domain-appropriate value.
2. You CANNOT output "unknown", "", null, or placeholders.
3. If OCR is incomplete, you MUST infer plausible values based on international trade norms.
4. File URLs must be realistic mock IPFS URLs.
5. SHA-256 must be realistic-looking.
6. Dates must be realistic ISO date strings.
7. Names, companies, weights, IDs, and document numbers MUST look real.
8. Do NOT hallucinate impossible values — they must be reasonable.
9. Output MUST follow the EXACT JSON structure below. DO NOT MODIFY THE STRUCTURE.
10. NEVER output explanations. Only JSON.
11. You must include an additional numeric field "trustworthiness" (0–100) which represents how consistent the inferred data is relative to the OCR.

OUTPUT JSON FORMAT (DO NOT CHANGE):

{
  "inspectionId": "INS-YYYY-NNNNNN",
  "exporter": {
    "name": "",
    "address": "",
    "exporterId": "",
    "contact": ""
  },
  "shipment": {
    "hsCode": "",
    "productName": "",
    "batchNumber": "",
    "lotNumbers": [],
    "quantityKg": 0,
    "destinationCountry": "",
    "expectedShipDate": ""
  },
  "documents": {
    "commercialInvoice": {
      "fileUrl": "",
      "sha256": "",
      "fields": {
        "invoiceNumber": "",
        "invoiceDate": "",
        "declaredValueUSD": 0,
        "buyerName": ""
      }
    },
    "packingList": {
      "fileUrl": "",
      "sha256": "",
      "fields": {
        "totalPackages": 0,
        "netWeightKg": 0,
        "grossWeightKg": 0
      }
    },
    "certificateOfOrigin": {
      "fileUrl": "",
      "sha256": "",
      "fields": {
        "issuer": "",
        "originCountry": "",
        "issueDate": ""
      }
    },
    "phytosanitaryCertificate": {
      "fileUrl": "",
      "sha256": "",
      "fields": {
        "treatment": "",
        "inspectionDate": ""
      }
    },
    "labTestReport": {
      "fileUrl": "",
      "sha256": "",
      "fields": {
        "moisturePercent": 0,
        "pesticideResiduePpm": 0,
        "aflatoxinPpm": 0
      }
    },
    "exporterDeclaration": {
      "fileUrl": "",
      "sha256": "",
      "fields": {
        "declaredBy": "",
        "position": "",
        "declarationDate": ""
      }
    }
  },
  "evidence": {
    "photos": [
      {
        "fileUrl": "",
        "sha256": "",
        "exif": {
          "timestamp": "",
          "gps": ""
        }
      },
      {
        "fileUrl": "",
        "sha256": "",
        "exif": {
          "timestamp": "",
          "gps": ""
        }
      }
    ]
  },
  "ocrExtraction": {
    "fields": {
      "productName": "",
      "batchNumber": "",
      "invoiceNumber": ""
    },
    "confidence": 0.0,
    "lowConfidenceFields": [],
    "anomalies": {
      "bboxVariance": 0.0,
      "dpiMismatch": false,
      "exifMismatch": false
    }
  },
  "trustScore": 0,
  "trustworthiness": 0,
  "status": "PENDING_INSPECTION",
  "submittedAt": ""
}

INPUT OCR TEXT:
{{OCR_TEXT}}

Return ONLY JSON. No text outside JSON.

`;


  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",   // best for structured JSON
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0,
    max_tokens: 4000
  });

  return response.choices[0].message.content;
}

module.exports = { extractStructuredJSON };

