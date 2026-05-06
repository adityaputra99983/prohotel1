"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f4" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#6b6b65", marginBottom: "16px" }}>Redirecting to dashboard...</p>
        <Link href="/admin/dashboard" style={{ color: "#2d5a3d" }}>
          Klik di sini jika tidak diarahkan otomatis
        </Link>
      </div>
    </div>
  );
}