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

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Bids",
    href: "/licitacoes",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

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
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 shrink-0 justify-between z-20 shadow-md px-0 sm:px-2 border-b border-base-300">
      <div className="navbar-start w-auto lg:w-1/2">
        <details className="dropdown" ref={burgerMenuRef}>
          <summary className="ml-1 btn btn-ghost lg:hidden hover:bg-transparent">
            <Bars3Icon className="h-1/2" />
          </summary>
          <ul
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-sm bg-base-100 rounded-box w-52"
            onClick={() => {
              burgerMenuRef?.current?.removeAttribute("open");
            }}
          >
            <HeaderMenuLinks />
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href={userType === "governo" ? "/governo/dashboard" : "/participante/dashboard"}
                    className="gap-2"
                  >
                    <UserCircleIcon className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="gap-2">
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth" className="gap-2">
                  <UserCircleIcon className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>
        </details>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="App logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">OnLicit</span>
            <span className="text-xs">Online Bids</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end grow mr-4">
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary btn-sm gap-2 cursor-pointer">
              <UserCircleIcon className="h-5 w-5" />
              <span className="hidden sm:inline">{truncateAddress(walletAddress)}</span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2 border border-base-300"
            >
              <li className="menu-title">
                <span className="text-xs">Wallet Address</span>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddress);
                    alert("Address copied!");
                  }}
                  className="text-xs font-mono"
                >
                  {truncateAddress(walletAddress)}
                </button>
              </li>
              <div className="divider my-1"></div>
              <li>
                <Link href={userType === "governo" ? "/governo/dashboard" : "/participante/dashboard"}>
                  <UserCircleIcon className="h-4 w-4" />
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/auth">
            <button className="btn btn-primary btn-sm gap-2">
              <UserCircleIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
