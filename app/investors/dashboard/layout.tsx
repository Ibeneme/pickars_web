"use client";

/**
 * Pickars – Investor portal shell with user display profile & responsive layout
 * Place at: app/investors/dashboard/layout.tsx
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/api/store";
import { logoutInvestor } from "@/api/slices/investors/auth.investor.slice";
import gsap from "gsap";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  FileText,
  LayoutDashboard,
  ListChecks,
  Loader2,
  Lock,
  LogOut,
  Megaphone,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Truck,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

const BASE = "/investors/dashboard";
const SIGN_IN_URL = "/investors/sign-in";
const LOGO = "/card.png"; // from /public/card.png

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  locked?: boolean;
  comingSoon?: boolean;
};
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Overview", href: `${BASE}/dashboard`, icon: LayoutDashboard },
      { label: "Finances & payouts", href: `${BASE}/finances`, icon: PieChart },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Company", href: `${BASE}/company`, icon: Building2 },
      { label: "Business plan", href: `${BASE}/business-plan`, icon: FileText },
      { label: "Marketing", href: `${BASE}/marketing`, icon: Megaphone },
      { label: "Logistics & rides", href: `${BASE}/rides`, icon: Truck },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Calendar",
        href: `${BASE}/calendar`,
        icon: CalendarDays,
        locked: true,
        comingSoon: true,
      },
      {
        label: "Tasks",
        href: `${BASE}/tasks`,
        icon: ListChecks,
        locked: true,
        comingSoon: true,
      },
      {
        label: "Circle",
        href: `${BASE}/circle`,
        icon: Users,
        locked: true,
        comingSoon: true,
      },
      {
        label: "Feedback",
        href: `${BASE}/feedback`,
        icon: MessageSquare,
        locked: true,
        comingSoon: true,
      },
    ],
  },
];

const ALL_ITEMS = NAV.flatMap((g) => g.items);

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000]";

const initials = (name?: string) =>
  (name || "Investor")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

export default function InvestorDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, investor } = useSelector(
    (state: RootState) => state.investor
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const searchRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* ---------- auth guard ---------- */
  useEffect(() => {
    if (!isAuthenticated && !signingOut) router.push(SIGN_IN_URL);
  }, [isAuthenticated, signingOut, router]);

  /* ---------- close drawer on navigation ---------- */
  useEffect(() => {
    setDrawerOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  /* ---------- "/" or ⌘K / Ctrl+K focuses search ---------- */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        el?.tagName === "INPUT" ||
        el?.tagName === "TEXTAREA" ||
        el?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setDrawerOpen(true);
        setTimeout(() => searchRef.current?.focus(), 0);
        return;
      }
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setDrawerOpen(true);
        setTimeout(() => searchRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- close account menu on outside click / Esc ---------- */
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !mobileMenuRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /* ---------- lock page scroll behind drawer / modal ---------- */
  useEffect(() => {
    document.body.style.overflow = drawerOpen || confirmOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, confirmOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  function goTo(href: string, locked?: boolean) {
    if (locked) return;
    setQuery("");
    searchRef.current?.blur();
    router.push(href);
  }

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    if (results[0] && !results[0].locked)
      goTo(results[0].href, results[0].locked);
  }

  function onSearchKey(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setQuery("");
      e.currentTarget.blur();
    }
  }

  async function confirmSignOut() {
    setSigningOut(true);
    try {
      await dispatch(logoutInvestor());
    } finally {
      router.replace(SIGN_IN_URL);
    }
  }

  if (!isAuthenticated && !signingOut) return null;

  return (
    <div className="min-h-screen bg-white font-['Lufga',sans-serif] text-neutral-900 lg:flex">
      {/* ================= MOBILE DRAWER BACKDROP ================= */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[16.5rem] flex-col border-r border-neutral-200 bg-[#f8f9fb] transition-transform duration-200 motion-reduce:transition-none lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Workspace header */}
        <div className="flex items-center gap-3 px-4 pb-3 pt-4">
          <Link
            href={`${BASE}/dashboard`}
            aria-label="Pickars investor overview"
            className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl ${FOCUS}`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO}
                alt=""
                className="h-full w-full rounded-md object-contain"
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[15px] font-semibold">
                Pickars
              </span>
              <span className="block truncate text-sm text-neutral-400">
                Investor portal
              </span>
            </span>
          </Link>
          <ChevronsUpDown
            size={16}
            aria-hidden
            className="shrink-0 text-neutral-400"
          />
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className={`rounded-lg p-1.5 text-neutral-600 hover:bg-black/5 lg:hidden ${FOCUS}`}
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Search */}
        <form
          onSubmit={onSearchSubmit}
          role="search"
          className="relative px-4 pb-2"
        >
          <label htmlFor="portal-search" className="sr-only">
            Search the portal
          </label>
          <Search
            size={16}
            aria-hidden
            className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <input
            id="portal-search"
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
            onKeyDown={onSearchKey}
            placeholder="Search"
            autoComplete="off"
            className="w-full rounded-xl border border-transparent bg-neutral-200/60 py-2.5 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-red-500/10 [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd className="pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 rounded-md bg-white px-1.5 py-0.5 text-[11px] font-medium text-neutral-500">
            /
          </kbd>

          {searchFocused && query.trim() && (
            <ul className="absolute inset-x-4 top-full z-10 mt-1 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-lg">
              {results.length === 0 ? (
                <li className="px-3 py-2.5 text-sm text-neutral-500">
                  No sections match “{query.trim()}”.
                </li>
              ) : (
                results.map((r) => {
                  const Icon = r.icon;
                  return (
                    <li key={r.href}>
                      <button
                        type="button"
                        disabled={r.locked}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => goTo(r.href, r.locked)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                          r.locked
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-neutral-100"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon
                            size={16}
                            aria-hidden
                            className="text-neutral-500"
                          />
                          {r.label}
                        </span>
                        {r.comingSoon && (
                          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-500">
                            Coming soon
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </form>

        {/* Navigation */}
        <nav
          aria-label="Investor portal"
          className="flex-1 space-y-1 overflow-y-auto px-4 pb-4 pt-2"
        >
          {NAV.map((group) => {
            const hasActive = group.items.some((i) => isActive(i.href));
            const open = !collapsed[group.title] || hasActive;
            const panelId = `nav-${group.title.toLowerCase()}`;
            return (
              <div key={group.title}>
                <button
                  type="button"
                  onClick={() =>
                    setCollapsed((c) => ({
                      ...c,
                      [group.title]: !c[group.title],
                    }))
                  }
                  aria-expanded={open}
                  aria-controls={panelId}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400 transition-colors hover:text-neutral-600 ${FOCUS}`}
                >
                  {open ? (
                    <ChevronUp size={14} aria-hidden />
                  ) : (
                    <ChevronDown size={14} aria-hidden />
                  )}
                  {group.title}
                </button>

                {open && (
                  <ul id={panelId} className="space-y-0.5 pb-2">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);

                      if (item.locked) {
                        return (
                          <li key={item.href}>
                            <div
                              aria-disabled="true"
                              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-neutral-400 cursor-not-allowed bg-neutral-100/50"
                            >
                              <span className="flex items-center gap-3">
                                <Icon
                                  size={18}
                                  aria-hidden
                                  strokeWidth={1.75}
                                  className="text-neutral-400"
                                />
                                {item.label}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-200/60 px-2 py-0.5 rounded-full">
                                <Lock size={10} /> Coming soon
                              </span>
                            </div>
                          </li>
                        );
                      }

                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${FOCUS} ${
                              active
                                ? "bg-white font-medium text-neutral-900 border border-neutral-200/60"
                                : "text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900"
                            }`}
                          >
                            <Icon
                              size={18}
                              aria-hidden
                              strokeWidth={active ? 2.25 : 1.75}
                              className={
                                active ? "text-[#ff0000]" : "text-neutral-500"
                              }
                            />
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        {/* Account / User Footer (Desktop) */}
        <div ref={menuRef} className="relative border-t border-neutral-200 p-4">
          {menuOpen && (
            <div
              role="menu"
              className="absolute inset-x-4 bottom-full mb-2 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-lg"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setConfirmOpen(true);
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-800 hover:bg-red-50 hover:text-[#ff0000] ${FOCUS}`}
              >
                <LogOut size={16} aria-hidden />
                Sign out
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-neutral-200/50 ${FOCUS}`}
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white"
            >
              {initials(investor?.name)}
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-medium">
                {investor?.name || "Investor"}
              </span>
              <span className="block truncate text-xs text-neutral-400">
                {investor?.email || investor?.phone || "Stakeholder"}
              </span>
            </span>
            <ChevronsUpDown
              size={16}
              aria-hidden
              className="shrink-0 text-neutral-400"
            />
          </button>
        </div>
      </aside>

      {/* ================= MAIN PANEL ================= */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-[#f8f9fb]">
        {/* Top bar with User Profile and Responsive controls */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-neutral-200 bg-white/90 px-4 py-3.5 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className={`-ml-1 rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 lg:hidden ${FOCUS}`}
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>

          {/* Display User Profile in Header */}
          <div className="relative shrink-0" ref={mobileMenuRef}>
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl lg:hidden"
              >
                <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                  <p className="text-sm font-semibold truncate">
                    {investor?.name || "Investor"}
                  </p>
                  <p className="text-xs text-neutral-400 truncate">
                    {investor?.email || investor?.phone || "Stakeholder"}
                  </p>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setConfirmOpen(true);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-red-50 hover:text-[#ff0000] ${FOCUS}`}
                >
                  <LogOut size={16} aria-hidden />
                  Sign out
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className={`flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white py-1.5 pl-1.5 pr-3 shadow-xs transition-colors hover:border-neutral-300 ${FOCUS}`}
            >
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white"
              >
                {initials(investor?.name)}
              </span>
              <span className="hidden sm:block text-left text-xs leading-tight">
                <span className="block font-medium truncate max-w-[110px]">
                  {investor?.name || "Investor"}
                </span>
                <span className="block text-[10px] text-neutral-400">
                  {investor?.investorShare
                    ? `${investor.investorShare}% Equity`
                    : "Stakeholder"}
                </span>
              </span>
              <ChevronsUpDown size={14} className="text-neutral-400" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      {/* ================= SIGN-OUT MODAL WITH GSAP ANIMATIONS ================= */}
      {confirmOpen && (
        <SignOutDialog
          loading={signingOut}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={confirmSignOut}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SignOutDialog({
  loading,
  onCancel,
  onConfirm,
}: {
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();

    // GSAP Entrance Animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.2)" }
      );
    });

    return () => ctx.revert();
  }, []);

  function handleClose() {
    if (loading) return;
    // GSAP Exit Animation
    gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 12,
        duration: 0.2,
        ease: "power2.in",
        onComplete: onCancel,
      });
    });
    setTimeout(onCancel, 220);
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && !loading) {
      e.stopPropagation();
      handleClose();
      return;
    }
    if (e.key === "Tab") {
      const first = cancelRef.current;
      const last = confirmRef.current;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 opacity-0"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) handleClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div
        ref={modalRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="signout-title"
        aria-describedby="signout-desc"
        className="w-full max-w-xs rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 opacity-0 scale-95 shadow-xl"
      >
        <div className="flex items-center justify-center mb-1.5">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#ff0000] border border-red-100"
          >
            <LogOut size={17} />
          </span>
          {!loading && (
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors ml-auto"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <h2
          id="signout-title"
          className="mt-3 text-lg font-semibold tracking-tight text-neutral-900 text-center"
        >
          Sign out of Pickars?
        </h2>
        <p
          id="signout-desc"
          className="mt-1.5 text-xs leading-relaxed text-neutral-500 font-normal text-center"
        >
          You&apos;ll need a fresh verification code next time you sign in.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <button
            ref={cancelRef}
            type="button"
            onClick={handleClose}
            disabled={loading}
            className={`rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-medium text-neutral-700 transition-colors hover:border-black disabled:opacity-50 ${FOCUS}`}
          >
            Stay signed in
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex items-center justify-center gap-1.5 rounded-xl bg-black px-3.5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#ff0000] disabled:cursor-not-allowed disabled:opacity-70 ${FOCUS}`}
          >
            {loading ? (
              <>
                <Loader2 size={14} aria-hidden className="animate-spin" />
                Signing out…
              </>
            ) : (
              "Sign out"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
