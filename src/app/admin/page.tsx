"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f0f5f0 0%, #f8f6f3 100%)" }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
          <svg className="w-6 h-6 text-white animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <p className="text-foreground-muted text-sm mb-3">Mengarahkan ke dashboard...</p>
        <div className="w-32 h-1 bg-bg-green-mid rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse-soft" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
}
