"use client";

import { useState } from "react";
import Link from "next/link";
import { ModalCriarLicitacao } from "./components/ModalCriarLicitacao";
import type { NextPage } from "next";
import {
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CubeTransparentIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const GovernoHome: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header com Blockchain Badge */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de estatísticas melhorados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1 - Total */}
          <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="card-body p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-base-content/60 mb-1">Total Bids</p>
                  <p className="text-4xl font-bold text-primary mb-2">12</p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-success">↑ 20%</span>
                    <span className="text-base-content/60">vs last month</span>
                  </div>
                </div>
                <div className="bg-primary/20 p-3 rounded-xl">
                  <DocumentTextIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Em Andamento */}
          <div className="card bg-gradient-to-br from-warning/10 to-warning/5 border-2 border-warning/20 hover:border-warning/40 transition-all hover:shadow-lg">
            <div className="card-body p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-base-content/60 mb-1">In Progress</p>
                  <p className="text-4xl font-bold text-warning mb-2">5</p>
                  <div className="flex items-center gap-1 text-xs">
                    <ClockIcon className="w-3 h-3" />
                    <span className="text-base-content/60">Waiting for proposals</span>
                  </div>
                </div>
                <div className="bg-warning/20 p-3 rounded-xl">
                  <ClockIcon className="w-6 h-6 text-warning" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Concluídas */}
          <div className="card bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20 hover:border-success/40 transition-all hover:shadow-lg">
            <div className="card-body p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-base-content/60 mb-1">Completed</p>
                  <p className="text-4xl font-bold text-success mb-2">7</p>
                  <div className="flex items-center gap-1 text-xs">
                    <CheckCircleIcon className="w-3 h-3" />
                    <span className="text-base-content/60">This month</span>
                  </div>
                </div>
                <div className="bg-success/20 p-3 rounded-xl">
                  <CheckCircleIcon className="w-6 h-6 text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Propostas */}
          <div className="card bg-gradient-to-br from-info/10 to-info/5 border-2 border-info/20 hover:border-info/40 transition-all hover:shadow-lg">
            <div className="card-body p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-base-content/60 mb-1">Proposals Received</p>
                  <p className="text-4xl font-bold text-info mb-2">34</p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-success">↑ 12</span>
                    <span className="text-base-content/60">this week</span>
                  </div>
                </div>
                <div className="bg-info/20 p-3 rounded-xl">
                  <ChartBarIcon className="w-6 h-6 text-info" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ações rápidas melhoradas */}
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            onClick={() => setIsModalOpen(true)}
            className="card bg-base-100 border-2 border-base-300 hover:border-primary hover:scale-105 transition-all cursor-pointer hover:shadow-xl group"
          >
            <div className="card-body p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <PlusIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">New Bid</h3>
                  <p className="text-xs text-base-content/60">Create bid process</p>
                </div>
              </div>
              <div className="text-sm text-base-content/70">
                Register a new bid on the blockchain with full transparency
              </div>
            </div>
          </div>

          <Link href="/governo/licitacoes">
            <div className="card bg-base-100 border-2 border-base-300 hover:border-primary hover:scale-105 transition-all cursor-pointer hover:shadow-xl group">
              <div className="card-body p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-gradient-to-br from-info to-primary p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">My Bids</h3>
                    <p className="text-xs text-base-content/60">View and manage</p>
                  </div>
                </div>
                <div className="text-sm text-base-content/70">
                  Access all created bids and track status
                </div>
              </div>
            </div>
          </Link>

          <Link href="/governo/propostas">
            <div className="card bg-base-100 border-2 border-base-300 hover:border-primary hover:scale-105 transition-all cursor-pointer hover:shadow-xl group">
              <div className="card-body p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-gradient-to-br from-success to-info p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      Received Proposals
                    </h3>
                    <p className="text-xs text-base-content/60">Analyze and compare</p>
                  </div>
                </div>
                <div className="text-sm text-base-content/70">
                  Analyze submitted proposals and make informed decisions
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Licitações recentes melhoradas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Bids</h2>
            <Link href="/governo/licitacoes">
              <button className="btn btn-sm btn-ghost gap-2">
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </Link>
          </div>
          <div className="space-y-3">
            {[
              {
                name: "Highway Bridge Construction",
                value: "R$ 15.000.000",
                proposals: 3,
                status: "warning",
                hash: "0x7f4b...3a2c",
              },
              {
                name: "Equipment Supply",
                value: "R$ 8.500.000",
                proposals: 5,
                status: "warning",
                hash: "0x9a1d...7e8f",
              },
              {
                name: "Municipal School Renovation",
                value: "R$ 2.300.000",
                proposals: 8,
                status: "success",
                hash: "0x3c5e...1b4d",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card bg-base-100 border-2 border-base-300 hover:border-primary/50 transition-all hover:shadow-md"
              >
                <div className="card-body p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`badge badge-sm badge-${item.status}`}>
                          {item.status === "warning" ? "In Progress" : "Completed"}
                        </span>
                        <h3 className="font-bold">{item.name}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <CurrencyDollarIcon className="w-4 h-4 text-base-content/60" />
                          <span className="text-base-content/70">{item.value}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DocumentTextIcon className="w-4 h-4 text-base-content/60" />
                          <span className="text-base-content/70">{item.proposals} proposals</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CubeTransparentIcon className="w-4 h-4 text-primary" />
                          <span className="text-primary font-mono text-xs">{item.hash}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-sm btn-ghost gap-2">
                        <EyeIcon className="w-4 h-4" />
                        View
                      </button>
                      <button className="btn btn-sm btn-primary">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Bid Modal */}
      <ModalCriarLicitacao isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GovernoHome;
