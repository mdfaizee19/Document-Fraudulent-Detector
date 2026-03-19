import { useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";

export default function CertificatePage() {
  const [params] = useSearchParams();
  const tx = params.get("tx");
  const cid = params.get("cid");

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Verified Certificate</h1>

      <p className="mt-4">
        Transaction Hash:<br />
        <span className="font-mono">{tx}</span>
      </p>

      <div className="flex justify-center mt-6">
        <QRCode value={JSON.stringify({ tx, cid })} size={220} />
      </div>
    </div>
  );
}
