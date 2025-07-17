import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "../styles/kelolaakun.css";

const KelolaAkun = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setUsers(usersArray);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (userId) => {
    const confirm = window.confirm("Apakah kamu yakin ingin menghapus user ini?");
    if (!confirm) return;

    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    remove(userRef)
      .then(() => alert("User berhasil dihapus."))
      .catch((error) => alert("Gagal menghapus user: " + error.message));
  };

  const handleResetScore = (userId) => {
    const confirm = window.confirm("Reset skor user ini ke 0?");
    if (!confirm) return;

    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    update(userRef, {
      highScore: 0,
      lastScore: 0,
    })
      .then(() => alert("Skor berhasil di-reset."))
      .catch((error) => alert("Gagal reset skor: " + error.message));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <button className="btn-back" onClick={() => navigate("/Dashboard")}>
        ← Kembali
      </button>
      <h1>Kelola Akun</h1>

      <input
        type="text"
        placeholder="Cari berdasarkan email atau username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>High Score</th>
            <th>Last Score</th>
            <th>Skin</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6">Tidak ada data pengguna</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.highScore}</td>
                <td>{user.lastScore}</td>
                <td>{user.selectedSkin}</td>
                <td>
                  <button className="btn-reset" onClick={() => handleResetScore(user.id)}>
                    Reset
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(user.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KelolaAkun;
