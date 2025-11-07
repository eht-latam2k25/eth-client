"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowPathIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// Bid data type
type Bid = {
  id: number;
  name: string;
  contractingParty: string;
  description: string;
  initialValue: string;
  closingDate: string;
  status: "open" | "closed" | "under-review";
};

// Mock bid data
const bidsMock: Bid[] = [
  {
    id: 1,
    name: "Highway Bridge Construction",
    contractingParty: "City Hall of Belo Horizonte",
    description:
      "Construction of a highway bridge over the Velhas River, including environmental impact studies, executive design and construction execution. The bridge will be 450 meters long with capacity for heavy traffic.",
    initialValue: "R$ 15.000.000,00",
    closingDate: "December 15, 2024 at 14:00",
    status: "open",
  },
  {
    id: 2,
    name: "Medical Equipment Supply",
    contractingParty: "Hospital das Clínicas",
    description:
      "Acquisition of hospital medical equipment including 5 magnetic resonance imaging machines, 10 computed tomography scanners and ICU equipment. Includes installation, training and 3-year warranty.",
    initialValue: "R$ 8.500.000,00",
    closingDate: "December 22, 2024 at 16:30",
    status: "open",
  },
  {
    id: 3,
    name: "Municipal School Renovation",
    contractingParty: "Education Department",
    description:
      "Complete renovation of Santos Dumont Municipal School, including modernization of classrooms, construction of computer lab, covered sports court and full accessibility.",
    initialValue: "R$ 2.300.000,00",
    closingDate: "January 10, 2025 at 10:00",
    status: "open",
  },
  {
    id: 4,
    name: "LED Public Lighting System",
    contractingParty: "City Hall of São Paulo",
    description:
      "Replacement of 50,000 public lighting points with LED technology throughout the city, including preventive and corrective maintenance for 5 years. System with remote control and monitoring.",
    initialValue: "R$ 45.000.000,00",
    closingDate: "December 28, 2024 at 11:00",
    status: "open",
  },
  {
    id: 5,
    name: "Urban Road Paving",
    contractingParty: "City Hall of Contagem",
    description:
      "Asphalt paving of 25km of urban roads in various city neighborhoods, including drainage, horizontal and vertical signage, and accessible sidewalks according to current standards.",
    initialValue: "R$ 12.750.000,00",
    closingDate: "January 5, 2025 at 15:00",
    status: "open",
  },
];

const Licitacoes: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Filter bids
  const filteredBids = bidsMock.filter(bid => {
    const matchSearch =
      bid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.contractingParty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filterStatus === "all" || bid.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-base-100">
      {/* Search bar and filters */}
      <div className="bg-base-100 py-4 px-4 sm:px-6 lg:px-8 border-b border-base-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search field */}
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

            {/* Refresh button */}
            <button
              onClick={handleRefresh}
              className={`btn btn-primary gap-2 ${isRefreshing ? "loading" : ""}`}
              disabled={isRefreshing}
            >
              <ArrowPathIcon className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Bids list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Results counter */}
        <div className="mb-3">
          <p className="text-sm text-base-content/60">
            {filteredBids.length} {filteredBids.length === 1 ? "bid found" : "bids found"}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredBids.length > 0 ? (
            filteredBids.map(bid => (
              <div
                key={bid.id}
                className="card bg-base-100 border-2 border-base-300 hover:border-[#93BBFB] transition-all duration-300 hover:shadow-xl"
              >
                <div className="card-body p-5">
                  {/* Card header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="badge badge-primary badge-sm mt-1">
                          {bid.status === "open" ? "Open" : bid.status === "closed" ? "Closed" : "Under Review"}
                        </div>
                        <h2 className="text-lg font-bold text-base-content hover:text-[#93BBFB] transition-colors">
                          {bid.name}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <BuildingOfficeIcon className="w-4 h-4" />
                        <span className="font-medium">Contracting Party:</span>
                        <span className="italic">{bid.contractingParty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-base-content/80 mb-3 leading-relaxed">{bid.description}</p>

                  {/* Card footer with information */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3 border-t border-base-300">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Initial value */}
                      <div className="flex items-center gap-2">
                        <div className="bg-[#93BBFB]/10 p-2 rounded-lg">
                          <CurrencyDollarIcon className="w-5 h-5 text-[#93BBFB]" />
                        </div>
                        <div>
                          <p className="text-xs text-base-content/60">Initial Value</p>
                          <p className="font-bold text-base-content">{bid.initialValue}</p>
                        </div>
                      </div>

                      {/* Closing date */}
                      <div className="flex items-center gap-2">
                        <div className="bg-[#93BBFB]/10 p-2 rounded-lg">
                          <ClockIcon className="w-5 h-5 text-[#93BBFB]" />
                        </div>
                        <div>
                          <p className="text-xs text-base-content/60">Closes on</p>
                          <p className="font-bold text-base-content">{bid.closingDate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <Link href={`/licitacoes/${bid.id}`}>
                      <button className="btn btn-primary btn-sm gap-2 whitespace-nowrap">
                        View Details
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
                </div>
              </div>
            ))
          ) : (
            // Message when there are no results
            <div className="text-center py-12">
              <div className="bg-base-200 rounded-2xl p-8 max-w-md mx-auto">
                <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                <h3 className="text-xl font-bold mb-2">No bids found</h3>
                <p className="text-base-content/60">Try adjusting the filters or search terms</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Licitacoes;
