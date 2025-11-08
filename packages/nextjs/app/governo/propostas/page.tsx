"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  TrophyIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Proposal = {
  id: number;
  proposalHash: string; // Hash único da proposta (zero-knowledge)
  score: number; // Pontuação calculada pelo backend
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
};

type Bid = {
  id: number;
  name: string;
  contractingParty: string;
  initialValue: string;
  closingDate: string;
  proposals: Proposal[];
};

const bidsWithProposals: Bid[] = [
  {
    id: 1,
    name: "Highway Bridge Construction",
    contractingParty: "City Hall of Belo Horizonte",
    initialValue: "R$ 15.000.000,00",
    closingDate: "15/12/2024",
    proposals: [
      {
        id: 1,
        proposalHash: "0x7a8f3c2e1b9d4a6f5e8c2b1a9d7f3e2c1b8a6f4e2d1c9b7a5f3e1d9c7b5a3f1e",
        score: 95,
        submittedAt: "10/12/2024 14:30",
        status: "pending",
      },
      {
        id: 2,
        proposalHash: "0x2b9f4e1c8a7d3f6e2b1c9a8f7e3d2c1b9a7f6e4d3c2b1a9f8e7d6c5b4a3f2e1d",
        score: 88,
        submittedAt: "09/12/2024 10:15",
        status: "pending",
      },
      {
        id: 3,
        proposalHash: "0x5d3a1f9c7b2e8d4a6f1c9b7e5d3a2f1c9b8e7d6a5f4e3d2c1b9a8f7e6d5c4b3a",
        score: 92,
        submittedAt: "11/12/2024 16:45",
        status: "pending",
      },
    ],
  },
  {
    id: 2,
    name: "Medical Equipment Supply",
    contractingParty: "Hospital das Clínicas",
    initialValue: "R$ 8.500.000,00",
    closingDate: "22/12/2024",
    proposals: [
      {
        id: 4,
        proposalHash: "0x9e7f5d3c1b8a6f4e2d9c7b5a3f1e9d7c5b3a1f9e8d7c6b5a4f3e2d1c9b8a7f6e",
        score: 90,
        submittedAt: "18/12/2024 09:20",
        status: "pending",
      },
      {
        id: 5,
        proposalHash: "0x4c2a9f7e5d3b1c8a6f4e2d9c7b5a3f1e9d8c7b6a5f4e3d2c1b9a8f7e6d5c4b3a",
        score: 85,
        submittedAt: "17/12/2024 15:30",
        status: "pending",
      },
    ],
  },
];

const GovernoPropostas: NextPage = () => {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(bidsWithProposals[0]);

  const sortedProposals = selectedBid ? [...selectedBid.proposals].sort((a, b) => b.score - a.score) : [];

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/governo/dashboard"
            className="inline-flex items-center gap-2 text-primary-content hover:text-primary-content/80 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-primary-content mb-2">Received Proposals</h1>
          <p className="text-primary-content/90">Analyze and compare submitted proposals</p>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Selected Bid */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 space-y-4">
              {/* Bids List */}
              <div className="card bg-base-100 border-2 border-base-300">
                <div className="card-body p-4">
                  <h2 className="font-bold mb-3 flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5 text-primary" />
                    Select a Bid
                  </h2>
                  <div className="space-y-2">
                    {bidsWithProposals.map(bid => (
                      <div
                        key={bid.id}
                        onClick={() => setSelectedBid(bid)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedBid?.id === bid.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-base-200 hover:bg-base-300 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">{bid.name}</h3>
                            <p className="text-xs text-base-content/60">{bid.contractingParty}</p>
                          </div>
                          <span className="badge badge-primary badge-sm">{bid.proposals.length}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Bid Details */}
              {selectedBid && (
                <div className="card bg-base-100 border-2 border-primary/30">
                  <div className="card-body p-5">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <DocumentTextIcon className="w-6 h-6 text-primary" />
                      Selected Bid
                    </h2>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-base mb-1">{selectedBid.name}</h3>
                        <p className="text-sm text-base-content/70">{selectedBid.contractingParty}</p>
                      </div>

                      <div className="divider my-2"></div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-base-200 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CurrencyDollarIcon className="w-4 h-4 text-primary" />
                            <span className="text-xs text-base-content/60">Initial Value</span>
                          </div>
                          <p className="font-bold text-sm">{selectedBid.initialValue}</p>
                        </div>

                        <div className="bg-base-200 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            <span className="text-xs text-base-content/60">Closing</span>
                          </div>
                          <p className="font-bold text-sm">{selectedBid.closingDate}</p>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total Proposals</span>
                          <span className="text-2xl font-bold text-primary">{selectedBid.proposals.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Proposals Ranking */}
          <div className="lg:col-span-7">
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-xl flex items-center gap-2">
                    <TrophyIcon className="w-6 h-6 text-warning" />
                    Proposal Ranking
                  </h2>
                  <span className="text-sm text-base-content/60">Sorted by score</span>
                </div>

                {sortedProposals.length > 0 ? (
                  <div className="space-y-3">
                    {sortedProposals.map((proposal, index) => (
                      <div
                        key={proposal.id}
                        className={`card border-2 transition-all hover:shadow-lg ${
                          index === 0
                            ? "bg-warning/10 border-warning"
                            : index === 1
                              ? "bg-base-200 border-base-300"
                              : "bg-base-100 border-base-300"
                        }`}
                      >
                        <div className="card-body p-4">
                          {/* Proposal Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              {/* Ranking Position */}
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0 ${
                                  index === 0
                                    ? "bg-warning text-warning-content"
                                    : index === 1
                                      ? "bg-base-300 text-base-content"
                                      : "bg-base-200 text-base-content"
                                }`}
                              >
                                {index + 1}º
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-base-content/60 font-semibold">Proposal Hash</span>
                                  {index === 0 && <TrophyIcon className="w-4 h-4 text-warning" />}
                                </div>
                                <p className="text-xs font-mono text-base-content/80 truncate">
                                  {proposal.proposalHash}
                                </p>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(proposal.proposalHash);
                                    alert("Hash copied!");
                                  }}
                                  className="text-xs text-primary hover:underline mt-1"
                                >
                                  Copy hash
                                </button>
                              </div>
                            </div>

                            {/* Score */}
                            <div className="text-right shrink-0">
                              <div className="text-3xl font-bold text-primary">{proposal.score}</div>
                              <div className="text-xs text-base-content/60 font-semibold">POINTS</div>
                            </div>
                          </div>

                          {/* Proposal Info */}
                          <div className="bg-base-200/50 p-3 rounded-lg mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-base-content/60">Submitted at:</span>
                              <span className="font-mono font-semibold">{proposal.submittedAt}</span>
                            </div>
                          </div>

                          {/* Zero-Knowledge Notice */}
                          <div className="alert alert-info py-2 mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="stroke-current shrink-0 w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span className="text-xs">
                              Competitor details are hidden (zero-knowledge). Score calculated by backend.
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button className="btn btn-sm btn-success flex-1 gap-2">
                              <CheckCircleIcon className="w-4 h-4" />
                              Approve
                            </button>
                            <button className="btn btn-sm btn-error btn-outline gap-2">
                              <XMarkIcon className="w-4 h-4" />
                              Reject
                            </button>
                          </div>

                          {/* Highlight badge for 1st place */}
                          {index === 0 && (
                            <div className="mt-3 flex items-center justify-center gap-2 text-warning bg-warning/10 py-2 rounded-lg">
                              <TrophyIcon className="w-5 h-5" />
                              <span className="text-sm font-bold">HIGHEST SCORE - RECOMMENDED</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DocumentTextIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                    <h3 className="text-xl font-bold mb-2">No proposals</h3>
                    <p className="text-base-content/60">This bid has not received any proposals yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernoPropostas;
