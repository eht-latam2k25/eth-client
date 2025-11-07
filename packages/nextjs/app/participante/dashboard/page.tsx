"use client";

import Link from "next/link";
import type { NextPage } from "next";
import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { BaseAccountConnect } from "~~/components/BaseAccountConnect";

const ParticipanteHome: NextPage = () => {
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

        {/* Ações rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
