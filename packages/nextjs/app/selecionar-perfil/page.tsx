"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { BuildingOfficeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const SelecionarPerfil: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 py-8 px-4">
      <div className="max-w-5xl w-full">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-3">Welcome to the Platform</h1>
          <p className="text-lg text-base-content/70">Select how you want to access the system</p>
        </div>

        {/* Cards de seleção */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Governo */}
          <Link href="/governo/dashboard">
            <div className="card bg-base-100 border-2 border-base-300 hover:border-primary hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full">
              <div className="card-body items-center text-center p-8">
                <div className="bg-primary/10 p-6 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <BuildingOfficeIcon className="w-16 h-16 text-primary" />
                </div>
                <h2 className="card-title text-2xl mb-3 group-hover:text-primary transition-colors">Government</h2>
                <p className="text-base-content/70 mb-6">
                  Access as a government agency to create, manage and track public bids
                </p>
                <div className="space-y-2 text-sm text-left w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Create new bids</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Manage received proposals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Track processes</span>
                  </div>
                </div>
                <button className="btn btn-primary w-full mt-6">Access as Government</button>
              </div>
            </div>
          </Link>

          {/* Card Participante */}
          <Link href="/participante/dashboard">
            <div className="card bg-base-100 border-2 border-base-300 hover:border-primary hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full">
              <div className="card-body items-center text-center p-8">
                <div className="bg-primary/10 p-6 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <UserGroupIcon className="w-16 h-16 text-primary" />
                </div>
                <h2 className="card-title text-2xl mb-3 group-hover:text-primary transition-colors">Participant</h2>
                <p className="text-base-content/70 mb-6">
                  Access as a company or individual to participate in public bids
                </p>
                <div className="space-y-2 text-sm text-left w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Search available bids</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Submit proposals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Track participations</span>
                  </div>
                </div>
                <button className="btn btn-primary w-full mt-6">Access as Participant</button>
              </div>
            </div>
          </Link>
        </div>

        {/* Link para voltar */}
        <div className="text-center mt-8">
          <Link href="/" className="link link-primary">
            ← Back to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelecionarPerfil;
