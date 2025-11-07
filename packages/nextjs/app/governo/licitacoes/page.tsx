"use client";

import { useState } from "react";
import Link from "next/link";
import { ModalCriarLicitacao } from "../dashboard/components/ModalCriarLicitacao";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

type GovernmentBid = {
  id: number;
  name: string;
  contractingParty: string;
  initialValue: string;
  closingDate: string;
  status: "open" | "closed" | "under-review";
  proposals: number;
};

const governmentBidsMock: GovernmentBid[] = [
  {
    id: 1,
    name: "Highway Bridge Construction",
    contractingParty: "City Hall of Belo Horizonte",
    initialValue: "R$ 15.000.000,00",
    closingDate: "15/12/2024",
    status: "open",
    proposals: 3,
  },
  {
    id: 2,
    name: "Medical Equipment Supply",
    contractingParty: "Hospital das Clínicas",
    initialValue: "R$ 8.500.000,00",
    closingDate: "22/12/2024",
    status: "open",
    proposals: 5,
  },
  {
    id: 3,
    name: "Municipal School Renovation",
    contractingParty: "Education Department",
    initialValue: "R$ 2.300.000,00",
    closingDate: "10/11/2024",
    status: "closed",
    proposals: 8,
  },
];

const GovernoLicitacoes: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBids = governmentBidsMock.filter(bid => {
    const matchSearch = bid.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || bid.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-primary py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/governo/dashboard"
            className="inline-flex items-center gap-2 text-primary-content hover:text-primary-content/80 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-content mb-2">My Bids</h1>
              <p className="text-primary-content/80">Manage all created bids</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-secondary gap-2">
              <PlusIcon className="w-5 h-5" />
              New Bid
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 py-4 px-4 sm:px-6 lg:px-8 border-b border-base-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                placeholder="Search bids..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-base-content/40" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="select select-bordered"
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="under-review">Under Review</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bids list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <p className="text-sm text-base-content/60">
            {filteredBids.length}{" "}
            {filteredBids.length === 1 ? "bid found" : "bids found"}
          </p>
        </div>

        <div className="space-y-4">
          {filteredBids.length > 0 ? (
            filteredBids.map(bid => (
              <div
                key={bid.id}
                className="card bg-base-100 border-2 border-base-300 hover:border-primary transition-all"
              >
                <div className="card-body p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Bid info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`badge badge-sm ${
                            bid.status === "open"
                              ? "badge-success"
                              : bid.status === "closed"
                                ? "badge-error"
                                : "badge-warning"
                          }`}
                        >
                          {bid.status === "open"
                            ? "Open"
                            : bid.status === "closed"
                              ? "Closed"
                              : "Under Review"}
                        </span>
                        <h3 className="font-bold text-lg">{bid.name}</h3>
                      </div>
                      <p className="text-sm text-base-content/70 mb-2">{bid.contractingParty}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-base-content/60">Value: </span>
                          <span className="font-semibold">{bid.initialValue}</span>
                        </div>
                        <div>
                          <span className="text-base-content/60">Closes on: </span>
                          <span className="font-semibold">{bid.closingDate}</span>
                        </div>
                        <div>
                          <span className="text-base-content/60">Proposals: </span>
                          <span className="font-semibold text-primary">{bid.proposals}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button className="btn btn-sm btn-outline gap-2">
                        <EyeIcon className="w-4 h-4" />
                        View
                      </button>
                      <button className="btn btn-sm btn-outline gap-2">
                        <PencilIcon className="w-4 h-4" />
                        Edit
                      </button>
                      <Link href={`/governo/propostas/${bid.id}`}>
                        <button className="btn btn-sm btn-primary gap-2">View Proposals ({bid.proposals})</button>
                      </Link>
                      <button className="btn btn-sm btn-error btn-outline gap-2">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-base-200 rounded-2xl p-8 max-w-md mx-auto">
                <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                <h3 className="text-xl font-bold mb-2">No bids found</h3>
                <p className="text-base-content/60 mb-4">You haven't created any bids yet</p>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary gap-2">
                  <PlusIcon className="w-5 h-5" />
                  Create First Bid
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Bid Modal */}
      <ModalCriarLicitacao isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GovernoLicitacoes;
