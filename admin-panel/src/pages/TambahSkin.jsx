import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { ref, set } from "firebase/database";
import "../styles/tambahskin.css";

export default function TambahSkin() {
  const [imageUrl, setImageUrl] = useState("");
  const [skinName, setSkinName] = useState("");
  const [unlockScore, setUnlockScore] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl || !skinName || !unlockScore) {
      alert("Semua field wajib diisi");
      return;
    }

    const skinId = skinName.toLowerCase().replace(/\s+/g, "-");
    try {
      await set(ref(db, `skins/${skinId}`), {
        name: skinName,
        imageUrl,
        unlockScore: parseInt(unlockScore),
      });
      alert("Skin berhasil ditambahkan!");
      setImageUrl("");
      setSkinName("");
      setUnlockScore("");
    } catch (error) {
      console.error("Gagal menambahkan skin:", error);
      alert("Gagal menambahkan skin.");
    }
  };

  return (
    <div className="tambah-skin-container">
      <div className="top-buttons">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ⬅ Kembali ke Dashboard
        </button>
      </div>

      <h2>🆕 Tambah Skin Baru</h2>
      <form onSubmit={handleSubmit} className="tambah-skin-form">
        <label>URL Gambar:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />

        <label>Nama Skin:</label>
        <input
          type="text"
          value={skinName}
          onChange={(e) => setSkinName(e.target.value)}
          placeholder="Contoh: Fire Ball"
        />

        <label>Score untuk Unlock:</label>
        <input
          type="number"
          value={unlockScore}
          onChange={(e) => setUnlockScore(e.target.value)}
          placeholder="Contoh: 10"
        />

        <button type="submit">➕ Tambahkan Skin</button>

        <button
          type="button"
          className="list-btn"
          onClick={() => navigate("/DaftarSkin")}
        >
          📜 Lihat Daftar Skin
        </button>
      </form>
    </div>
  );
}
