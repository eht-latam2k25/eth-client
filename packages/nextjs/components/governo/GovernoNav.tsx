"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { logout } from "~~/utils/auth";

export const GovernoNav = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      label: "Dashboard",
      href: "/governo/dashboard",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: "Licitações",
      href: "/governo/licitacoes",
      icon: <DocumentTextIcon className="w-5 h-5" />,
    },
    {
      label: "Propostas",
      href: "/governo/propostas",
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-base-200 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <nav className="flex space-x-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-content shadow-md"
                      : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-base-content/70 hover:bg-base-300 hover:text-base-content transition-all"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};
