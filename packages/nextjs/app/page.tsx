"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { CpuChipIcon, ShieldCheckIcon, SparklesIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        {/* Hero Section */}
        <div className="px-5 max-w-5xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-center mb-8">
              <span className="block text-3xl mb-3 text-primary">Welcome to</span>
              <span className="block text-5xl md:text-6xl font-bold text-primary">OnLicit</span>
            </h1>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              OnLicit digitizes and automates public bidding processes using blockchain, ensuring transparency,
              security, anonymity in evaluation, and fraud prevention.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            <Link href="/licitacoes">
              <button className="btn btn-primary btn-lg gap-2 px-8 shadow-lg hover:shadow-xl transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                View Bids
              </button>
            </Link>
            <Link href="/auth">
              <button className="btn btn-outline btn-lg gap-2 px-8 shadow-lg hover:shadow-xl transition-all">
                <UserGroupIcon className="w-6 h-6" />
                Sign In
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grow bg-base-300 w-full px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Main Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Feature 1 */}
              <div className="flex flex-col bg-base-100 px-8 py-10 text-center items-center rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 p-4 rounded-2xl mb-4">
                  <ShieldCheckIcon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Anonymous Evaluation</h3>
                <p className="text-base-content/70">
                  Homomorphic encryption (Zama) enables proposal analysis without revealing provider identity,
                  preventing fraud and ensuring confidentiality
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col bg-base-100 px-8 py-10 text-center items-center rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-secondary/10 p-4 rounded-2xl mb-4">
                  <CpuChipIcon className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Blockchain Transparency</h3>
                <p className="text-base-content/70">
                  All transactions, contracts, and payment history are recorded onchain, ensuring real transparency of
                  government spending
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col bg-base-100 px-8 py-10 text-center items-center rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-accent/10 p-4 rounded-2xl mb-4">
                  <SparklesIcon className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fair Scoring System</h3>
                <p className="text-base-content/70">
                  Automated scoring based on Law 14.133 criteria (price, economic return, innovation) for impartial and
                  objective evaluation
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-base-100 rounded-3xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-base-content/70">Anonymous</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2">Onchain</div>
                  <div className="text-base-content/70">Transparent</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">Law 14.133</div>
                  <div className="text-base-content/70">Compliant</div>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center mt-12">
              <p className="text-lg mb-6 text-base-content/70">Ready to start your journey?</p>
              <Link href="/licitacoes">
                <button className="btn btn-primary btn-lg gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  Explore Bids
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
