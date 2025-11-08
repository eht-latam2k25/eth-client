"use client";

import { ProtectedRoute } from "~~/components/ProtectedRoute";
import { GovernoNav } from "~~/components/governo/GovernoNav";

export default function GovernoLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredUserType="governo">
      <div className="min-h-screen bg-base-100">
        <GovernoNav />
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
