import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // kita buat CSS-nya juga

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Bisa tambahkan logika clear session/token jika pakai Firebase Auth
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1>🎯 Admin Dashboard</h1>
      <div className="menu-grid">
        <button onClick={() => navigate("/Users")}>👤 Kelola Akun</button>
        <button onClick={() => navigate("/TambahSkin")}>🎨 Tambah Skin</button>
        <button onClick={() => navigate("/AturWaktu")}>⏱️ Atur Waktu Bermain</button>
        <button onClick={() => navigate("/ResetLeaderboard")}>🏆 Reset Leaderboard</button>
        <button className="logout" onClick={handleLogout}>🔓 Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
