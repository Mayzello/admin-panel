import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { ref, get, set } from "firebase/database";
import "../styles/aturwaktu.css";

export default function AturWaktu() {
  const [waktu, setWaktu] = useState(10);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWaktu = async () => {
      try {
        const snapshot = await get(ref(db, "settings/gameplayTime"));
        if (snapshot.exists()) {
          setWaktu(snapshot.val());
        }
      } catch (error) {
        console.error("Gagal mengambil waktu:", error);
      }
    };
    fetchWaktu();
  }, []);

  const handleSimpan = async () => {
    if (waktu < 5 || waktu > 999) {
      setStatus("❌ Waktu harus antara 5 dan 999 detik");
      return;
    }

    try {
      await set(ref(db, "settings/gameplayTime"), parseInt(waktu));
      setStatus("✅ Waktu berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan waktu:", error);
      setStatus("❌ Gagal menyimpan waktu");
    }
  };

  return (
    <div className="atur-waktu-container">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Kembali ke Dashboard
      </button>

      <h2>🕒 Atur Waktu Gameplay</h2>

      <div className="form-group">
        <label>Masukkan Waktu (detik):</label>
        <input
          type="number"
          value={waktu}
          onChange={(e) => setWaktu(e.target.value)}
          min={5}
          max={999}
        />
        <button onClick={handleSimpan}>💾 Simpan</button>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}
