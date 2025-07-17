import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/KelolaAkun";
import TambahSkin from "./pages/TambahSkin";
import DaftarSkin from "./pages/DaftarSkin";
import ResetLeaderboard from "./pages/ResetLeaderboard";
import AturWaktu from "./pages/AturWaktu";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/TambahSkin" element={<TambahSkin />} />
        <Route path="/DaftarSkin" element={<DaftarSkin />} />
        <Route path="/ResetLeaderboard" element={<ResetLeaderboard />} />
        <Route path="/AturWaktu" element={<AturWaktu />} />
      </Routes>
    </BrowserRouter>
  );
}
