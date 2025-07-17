import { useState } from "react";
import { db } from "../utils/firebaseConfig";
import { ref, get, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../styles/resetleaderboard.css";

export default function ResetLeaderboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    const confirmReset = window.confirm("Apakah kamu yakin ingin me-reset seluruh skor?");
    if (!confirmReset) return;

    setLoading(true);
    setMessage("");

    try {
      const usersRef = ref(db, "users");
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const updates = {};
        snapshot.forEach((child) => {
          updates[`${child.key}/highScore`] = 0;
          updates[`${child.key}/lastScore`] = 0;
        });

        await update(usersRef, updates);
        setMessage("✅ Semua skor berhasil di-reset!");
      } else {
        setMessage("Tidak ada data pengguna ditemukan.");
      }
    } catch (error) {
      console.error("Gagal reset:", error);
      setMessage("❌ Terjadi kesalahan saat me-reset skor.");
    }

    setLoading(false);
  };

  return (
    <div className="reset-leaderboard-container">
      <h2>🔄 Reset Leaderboard</h2>
      <p>Halaman ini akan me-reset seluruh skor pemain.</p>

      <button onClick={handleReset} disabled={loading}>
        {loading ? "Memproses..." : "🧹 Reset Semua Skor"}
      </button>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Kembali ke Dashboard
      </button>

      {message && <p className="reset-message">{message}</p>}
    </div>
  );
}
