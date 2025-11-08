"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getUserType, isAuthenticated, logout } from "~~/utils/auth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Bids",
    href: "/licitacoes",
  },
];

/**
 * Truncate wallet address to show first 6 and last 4 characters
 */
const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Site header
 */
export const Header = () => {
  const pathname = usePathname();
  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userType, setUserType] = useState<string>("");

  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      // Get wallet address from localStorage
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const userData = JSON.parse(user);
          setWalletAddress(userData.walletAddress || "");
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      // Get user type
      const type = getUserType();
      setUserType(type || "");
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/80">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="relative w-32 h-8">
            <Image alt="OnLicit" className="object-contain" fill src="/OnLicit.png" priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {menuLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side - User menu */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm gap-2 hover:bg-base-200 normal-case font-normal">
                <UserCircleIcon className="h-5 w-5" />
                <span className="hidden sm:inline text-xs font-mono">{truncateAddress(walletAddress)}</span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-lg w-56 mt-2 border border-base-300"
              >
                <li className="menu-title px-3 py-2">
                  <span className="text-xs font-semibold text-base-content/60">Wallet</span>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(walletAddress);
                      alert("Address copied!");
                    }}
                    className="text-xs font-mono justify-between hover:bg-base-200"
                  >
                    <span>{truncateAddress(walletAddress)}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>
                  </button>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <Link
                    href={userType === "governo" ? "/governo/dashboard" : "/participante/dashboard"}
                    className="hover:bg-base-200"
                  >
                    <UserCircleIcon className="h-4 w-4" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="text-error hover:bg-error/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/auth">
              <button className="btn btn-primary btn-sm gap-2 normal-case">
                <UserCircleIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            </Link>
          )}

          {/* Mobile menu */}
          <details className="dropdown dropdown-end md:hidden" ref={burgerMenuRef}>
            <summary className="btn btn-ghost btn-sm btn-square">
              <Bars3Icon className="h-5 w-5" />
            </summary>
            <ul
              className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-lg w-52 mt-2 border border-base-300"
              onClick={() => {
                burgerMenuRef?.current?.removeAttribute("open");
              }}
            >
              {menuLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:bg-base-200">
                    {label}
                  </Link>
                </li>
              ))}
              {isLoggedIn && (
                <>
                  <div className="divider my-0"></div>
                  <li>
                    <Link
                      href={userType === "governo" ? "/governo/dashboard" : "/participante/dashboard"}
                      className="hover:bg-base-200"
                    >
                      <UserCircleIcon className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="text-error hover:bg-error/10">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
};
