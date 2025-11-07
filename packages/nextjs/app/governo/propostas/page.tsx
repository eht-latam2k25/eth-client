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
  EyeIcon,
  TrophyIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Proposal = {
  id: number;
  company: string;
  cnpj: string;
  value: string;
  deadline: string;
  sentDate: string;
  score: number;
  status: "pending" | "approved" | "rejected";
  documents: number;
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
        company: "Construtora ABC Ltda",
        cnpj: "12.345.678/0001-90",
        value: "R$ 14.200.000,00",
        deadline: "18 months",
        sentDate: "10/12/2024 14:30",
        score: 95,
        status: "pending",
        documents: 12,
      },
      {
        id: 2,
        company: "Engenharia XYZ S.A.",
        cnpj: "98.765.432/0001-10",
        value: "R$ 14.800.000,00",
        deadline: "16 months",
        sentDate: "09/12/2024 10:15",
        score: 88,
        status: "pending",
        documents: 10,
      },
      {
        id: 3,
        company: "Obras Prime Construções",
        cnpj: "11.222.333/0001-44",
        value: "R$ 13.900.000,00",
        deadline: "20 months",
        sentDate: "11/12/2024 16:45",
        score: 92,
        status: "pending",
        documents: 11,
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
        company: "MedEquip Tecnologia",
        cnpj: "55.666.777/0001-88",
        value: "R$ 8.200.000,00",
        deadline: "6 months",
        sentDate: "18/12/2024 09:20",
        score: 90,
        status: "pending",
        documents: 8,
      },
      {
        id: 5,
        company: "HealthTech Soluções",
        cnpj: "44.555.666/0001-99",
        value: "R$ 8.100.000,00",
        deadline: "8 months",
        sentDate: "17/12/2024 15:30",
        score: 85,
        status: "pending",
        documents: 7,
      },
    ],
  },
];

const GovernoPropostas: NextPage = () => {
  const [selectedBid, setSelectedBid] = useState<Bid | null>(bidsWithProposals[0]);

  const sortedProposals = selectedBid ? [...selectedBid.proposals].sort((a, b) => b.score - a.score) : [];

  return (
    <div className="min-h-screen bg-base-100">
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
                            <div className="flex items-center gap-3">
                              {/* Ranking Position */}
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                  index === 0
                                    ? "bg-warning text-warning-content"
                                    : index === 1
                                      ? "bg-base-300 text-base-content"
                                      : "bg-base-200 text-base-content"
                                }`}
                              >
                                {index + 1}º
                              </div>
                              <div>
                                <h3 className="font-bold">{proposal.company}</h3>
                                <p className="text-xs text-base-content/60 font-mono">{proposal.cnpj}</p>
                              </div>
                            </div>

                            {/* Score */}
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">{proposal.score}</div>
                              <div className="text-xs text-base-content/60">points</div>
                            </div>
                          </div>

                          {/* Proposal Details */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            <div>
                              <div className="text-xs text-base-content/60 mb-1">Proposed Value</div>
                              <div className="font-bold text-sm">{proposal.value}</div>
                            </div>
                            <div>
                              <div className="text-xs text-base-content/60 mb-1">Deadline</div>
                              <div className="font-bold text-sm">{proposal.deadline}</div>
                            </div>
                            <div>
                              <div className="text-xs text-base-content/60 mb-1">Send Date</div>
                              <div className="font-bold text-sm">{proposal.sentDate}</div>
                            </div>
                            <div>
                              <div className="text-xs text-base-content/60 mb-1">Documents</div>
                              <div className="font-bold text-sm">{proposal.documents} attachments</div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button className="btn btn-sm btn-outline flex-1 gap-2">
                              <EyeIcon className="w-4 h-4" />
                              View Details
                            </button>
                            <button className="btn btn-sm btn-success gap-2">
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
                            <div className="mt-2 flex items-center gap-2 text-warning">
                              <TrophyIcon className="w-4 h-4" />
                              <span className="text-xs font-semibold">Best Proposal</span>
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
