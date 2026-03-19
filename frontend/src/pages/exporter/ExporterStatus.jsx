import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import ExporterNavbar from "../../components/ExporterNavbar";
import TrustScoreBar from "../../components/TrustScoreBar";
export default function ExporterStatus() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("export_submissions")
      .select("*")
      .eq("exporter_id", user.id)
      .order("submitted_at", { ascending: false });

    setRows(data || []);
  }

  return (
    <div>
      <ExporterNavbar />

      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">Verification Status</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Submission</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.structured?.shipment?.productName}</td>
                <td>{new Date(r.submitted_at).toLocaleDateString()}</td>
                <td className="font-semibold">{r.status}</td>
                <td>
                    <TrustScoreBar score={r.structured.trustScore} />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
