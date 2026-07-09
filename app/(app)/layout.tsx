"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import {
  LayoutDashboard,
  Users,
  Receipt,
  User,
  LogOut,
  Plus,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/groups",    label: "Groups",    icon: Users },
  { href: "/expenses",  label: "Expenses",  icon: Receipt },
  { href: "/profile",   label: "Profile",   icon: User },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface SidebarProps {
  pathname: string;
  user: ReturnType<typeof useAuthStore.getState>["user"];
  onNavigate: () => void;
  onLogout: () => void;
}

function Sidebar({
  pathname,
  user,
  onNavigate,
  onLogout,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col p-4">
      {/* Logo */}
      <div className="mb-8 px-2 pt-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/EvenUp-black.svg"
            alt="Evven"
            width={42}
            height={42}
          />
          <span className="font-semibold text-sm tracking-wide" style={{ color: "var(--evven-text-primary)" }}>
            Evven
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-(--evven-accent-primary)"
                  : "text-muted-foreground hover:bg-(--evven-surface) hover:text-(--evven-text-primary)"
              )}
              style={active ? { color: "var(--evven-text-inverse)" } : undefined}
            >
              <Icon size={16} className="shrink-0" />
              {label}
              {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Quick add */}
      <div className="mb-4">
        <Link
          href="/expenses/new"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 hover:opacity-90"
          style={{ background: "var(--evven-accent-primary)", color: "var(--evven-text-inverse)" }}
        >
          <Plus size={15} />
          Log expense
        </Link>
      </div>

      {/* User */}
      <div
        className="flex items-center gap-3 px-3 py-3 rounded-xl"
        style={{ background: "var(--evven-surface)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
          style={{ background: "var(--evven-accent-secondary)", color: "var(--evven-accent-primary)" }}
        >
          {user?.name ? getInitials(user.name) : "?"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate" style={{ color: "var(--evven-text-primary)" }}>
            {user?.name ?? ""}
          </p>
          <p className="text-[10px] truncate" style={{ color: "var(--evven-text-muted)" }}>
            {user?.email ?? ""}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="p-1.5 rounded-lg transition-colors hover:bg-(--evven-border)"
          title="Log out"
        >
          <LogOut size={14} style={{ color: "var(--evven-text-muted)" }} />
        </button>
      </div>
    </div>
  );
}

function BottomDock({ pathname }: { pathname: string }) {
  const leadingItems = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/groups", label: "Groups", icon: Users },
  ];
  const trailingItems = [
    { href: "/expenses", label: "Expenses", icon: Receipt },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 md:hidden">
      <div
        className="pointer-events-auto mx-auto grid h-16 max-w-sm grid-cols-5 items-center gap-1 rounded-full px-3 shadow-lg"
        style={{
          background: "var(--evven-background)",
          border: "0.5px solid var(--evven-border)",
        }}
      >
        {leadingItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="flex size-11 items-center justify-center justify-self-center rounded-full transition-all"
              style={{
                background: active ? "var(--evven-surface)" : "transparent",
                color: active ? "var(--evven-accent-primary)" : "var(--evven-text-muted)",
              }}
            >
              <Icon size={20} />
            </Link>
          );
        })}
        <Link
          href="/expenses/new"
          aria-label="Add expense"
          className="flex size-12 items-center justify-center justify-self-center rounded-full shadow-md transition-opacity hover:opacity-90"
          style={{ background: "var(--evven-accent-primary)", color: "var(--evven-text-inverse)" }}
        >
          <Plus size={24} />
        </Link>
        {trailingItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="flex size-11 items-center justify-center justify-self-center rounded-full transition-all"
              style={{
                background: active ? "var(--evven-surface)" : "transparent",
                color: active ? "var(--evven-accent-primary)" : "var(--evven-text-muted)",
              }}
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function MobileFloatingChrome({
  user,
}: {
  user: ReturnType<typeof useAuthStore.getState>["user"];
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start px-4 pt-4 md:hidden">
      <Link
        href="/profile"
        className="pointer-events-auto flex size-11 items-center justify-center overflow-hidden rounded-full text-xs font-semibold shadow-lg"
        style={{
          background:
            "color-mix(in srgb, var(--evven-accent-secondary) 45%, transparent)",
          color: "var(--evven-accent-primary)",
          border: "1px solid var(--evven-border)",
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
        }}
        aria-label="Profile"
      >
        {user?.profile_picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.profile_picture}
            alt={user.name ?? "Profile"}
            className="size-full object-cover"
          />
        ) : user?.name ? (
          getInitials(user.name)
        ) : (
          "?"
        )}
      </Link>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isInitialized, router]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!isInitialized || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div
          className="size-5 animate-spin rounded-full border-2 border-r-transparent"
          style={{ borderColor: "var(--evven-accent-primary)", borderRightColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 border-r"
        style={{
          background: "var(--evven-background)",
          borderColor: "var(--evven-border)",
        }}
      >
          <Sidebar
            pathname={pathname}
            user={user}
            onNavigate={() => undefined}
            onLogout={handleLogout}
          />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <MobileFloatingChrome user={user} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-24 pt-16 md:pb-0 md:pt-0">
          {children}
        </main>
        <BottomDock pathname={pathname} />
      </div>
    </div>
  );
}
