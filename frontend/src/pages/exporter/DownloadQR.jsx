import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import ExporterNavbar from "../../components/ExporterNavbar";

export default function DownloadQR() {
  const [qr, setQr] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("export_submissions")
      .select("qr_url")
      .eq("exporter_id", user.id)
      .eq("status", "APPROVED")
      .single();

    setQr(data?.qr_url || null);
  }

  return (
    <div>
      <ExporterNavbar />

      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Verifiable Credential QR</h2>

        {qr ? (
          <>
            <img src={qr} className="mx-auto w-60" />
            <a
              href={qr}
              download
              className="block mt-4 bg-purple-600 text-white px-4 py-2 rounded"
            >
              Download Credential
            </a>
          </>
        ) : (
          <p>No approved credential yet.</p>
        )}
      </div>
    </div>
  );
}
