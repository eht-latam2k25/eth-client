"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { BaseAccountConnect } from "~~/components/BaseAccountConnect";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const ParticipanteHome: NextPage = () => {
  const [hasCertificate, setHasCertificate] = useState(false);
  const [isCheckingCertificate, setIsCheckingCertificate] = useState(true);

  useEffect(() => {
    // Check certificate status from backend
    const checkCertificateStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsCheckingCertificate(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/bid/certificate-status`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHasCertificate(data.hasCertificate && data.certificateStatus && data.canBid);
        }
      } catch (error) {
        console.error("Error checking certificate status:", error);
      } finally {
        setIsCheckingCertificate(false);
      }
    };

    checkCertificateStatus();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-primary py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-content mb-2">Participant Dashboard</h1>
          <p className="text-primary-content/80">Find and participate in public bids</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Componente de Conexão BASE Account */}
        <div className="mb-8">
          <BaseAccountConnect />
        </div>
        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="stat bg-base-100 border-2 border-base-300 rounded-lg">
            <div className="stat-figure text-primary">
              <MagnifyingGlassIcon className="w-8 h-8" />
            </div>
            <div className="stat-title">Open Bids</div>
            <div className="stat-value text-primary">5</div>
            <div className="stat-desc">Available to participate</div>
          </div>

          <div className="stat bg-base-100 border-2 border-base-300 rounded-lg">
            <div className="stat-figure text-warning">
              <ClockIcon className="w-8 h-8" />
            </div>
            <div className="stat-title">Under Review</div>
            <div className="stat-value text-warning">3</div>
            <div className="stat-desc">Waiting for result</div>
          </div>

          <div className="stat bg-base-100 border-2 border-base-300 rounded-lg">
            <div className="stat-figure text-success">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <div className="stat-title">Won</div>
            <div className="stat-value text-success">2</div>
            <div className="stat-desc">Accepted proposals</div>
          </div>

          <div className="stat bg-base-100 border-2 border-base-300 rounded-lg">
            <div className="stat-figure text-info">
              <DocumentTextIcon className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Proposals</div>
            <div className="stat-value text-info">8</div>
            <div className="stat-desc">Submitted in total</div>
          </div>
        </div>

        {/* Certificate Alert */}
        {!isCheckingCertificate && !hasCertificate && (
          <div className="alert alert-warning mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="font-bold">Digital Certificate Required</h3>
              <p className="text-sm">You need a digital certificate to participate in bids.</p>
            </div>
            <Link href="/participante/certificado">
              <button className="btn btn-sm btn-primary">Get Certificate</button>
            </Link>
          </div>
        )}

        {!isCheckingCertificate && hasCertificate && (
          <div className="alert alert-success mb-6">
            <CheckCircleIcon className="h-6 w-6" />
            <div className="flex-1">
              <h3 className="font-bold">Certificate Active</h3>
              <p className="text-sm">You&apos;re qualified to participate in all public bids.</p>
            </div>
            <Link href="/participante/certificado">
              <button className="btn btn-sm btn-outline">View Certificate</button>
            </Link>
          </div>
        )}

        {/* Ações rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/participante/certificado">
            <div
              className={`card bg-base-100 border-2 transition-all cursor-pointer hover:shadow-lg ${
                hasCertificate
                  ? "border-success hover:border-success"
                  : "border-warning hover:border-warning animate-pulse"
              }`}
            >
              <div className="card-body items-center text-center relative">
                {hasCertificate && (
                  <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="w-5 h-5 text-success" />
                  </div>
                )}
                <div className={`p-4 rounded-full mb-4 ${hasCertificate ? "bg-success/10" : "bg-warning/10"}`}>
                  <ShieldCheckIcon className={`w-8 h-8 ${hasCertificate ? "text-success" : "text-warning"}`} />
                </div>
                <h3 className="card-title text-lg">Certificate</h3>
                <p className="text-sm text-base-content/70">{hasCertificate ? "Active & Valid" : "Required to bid"}</p>
              </div>
            </div>
          </Link>

          <Link href="/licitacoes">
            <div className="card bg-base-100 border-2 border-base-300 hover:border-primary transition-all cursor-pointer hover:shadow-lg">
              <div className="card-body items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <MagnifyingGlassIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title text-lg">Search Bids</h3>
                <p className="text-sm text-base-content/70">Find open bids</p>
              </div>
            </div>
          </Link>

          <Link href="/participante/minhas-propostas">
            <div className="card bg-base-100 border-2 border-base-300 hover:border-primary transition-all cursor-pointer hover:shadow-lg">
              <div className="card-body items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <DocumentTextIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title text-lg">My Proposals</h3>
                <p className="text-sm text-base-content/70">View submitted proposals</p>
              </div>
            </div>
          </Link>

          <Link href="/participante/notificacoes">
            <div className="card bg-base-100 border-2 border-base-300 hover:border-primary transition-all cursor-pointer hover:shadow-lg">
              <div className="card-body items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <BellIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title text-lg">Notifications</h3>
                <p className="text-sm text-base-content/70">Track updates</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Licitações recomendadas */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recommended Bids for You</h2>
          <div className="space-y-3">
            {[1, 2, 3].map(item => (
              <div key={item} className="card bg-base-100 border border-base-300 hover:border-primary transition-all">
                <div className="card-body p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="badge badge-primary badge-sm">Open</span>
                        <h3 className="font-bold">Medical Equipment Supply</h3>
                      </div>
                      <p className="text-sm text-base-content/70 mb-1">Hospital das Clínicas</p>
                      <p className="text-sm text-base-content/60">
                        Initial value: R$ 8.500.000,00 • Closes on 22/12/2024
                      </p>
                    </div>
                    <Link href="/licitacoes/2">
                      <button className="btn btn-primary btn-sm whitespace-nowrap">View Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/licitacoes">
              <button className="btn btn-outline btn-primary">View All Bids</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipanteHome;
