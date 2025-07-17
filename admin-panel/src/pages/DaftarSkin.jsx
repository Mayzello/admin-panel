import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { ref, onValue, remove } from "firebase/database";
import "../styles/daftarskin.css";

export default function DaftarSkin() {
  const [skins, setSkins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const skinsRef = ref(db, "skins");
    onValue(skinsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const skinArray = Object.entries(data).map(([id, skin]) => ({
          id,
          ...skin,
        }));
        setSkins(skinArray);
      } else {
        setSkins([]);
      }
    });
  }, []);

  const handleDelete = (skinId) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus skin ini?"
    );
    if (confirmDelete) {
      remove(ref(db, `skins/${skinId}`))
        .then(() => alert("Skin berhasil dihapus"))
        .catch((err) => {
          console.error("Gagal menghapus skin:", err);
          alert("Gagal menghapus skin");
        });
    }
  };

  return (
    <div className="daftar-skin-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Kembali ke Dashboard
      </button>
      <h2>📜 Daftar Skin Bola</h2>
      <div className="skin-grid">
        {skins.map((skin) => (
          <div key={skin.id} className="skin-card">
            <img src={skin.imageUrl} alt={skin.name} />
            <h4>{skin.name}</h4>
            <p>🔓 Unlock Score: {skin.unlockScore}</p>
            <button className="delete-btn" onClick={() => handleDelete(skin.id)}>
              🗑 Hapus
            </button>
          </div>
        ))}
        {skins.length === 0 && <p>Belum ada skin ditambahkan.</p>}
      </div>
    </div>
  );
}
