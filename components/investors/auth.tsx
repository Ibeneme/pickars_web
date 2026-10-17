"use client";

/**
 * Pickars – Investor sign in & account creation
 * Place at: app/investors/sign-in/page.tsx (Next.js App Router + TypeScript + Tailwind)
 */

import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/api/store";
import {
  loginInvestor,
  verifyOtp,
  createAccount,
  clearInvestorError,
} from "@/api/slices/investors/auth.investor.slice";

const AFTER_SIGN_IN_URL = "/investors/dashboard/dashboard";
const SUPPORT_URL = "mailto:support@pickars.com";
const LOGO = "/card.png";
const HERO_IMAGE = "https://www.pickars.com/opengraphs/about-us.png";
const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const FIELD =
  "w-full rounded-lg border border-neutral-300 bg-white text-black outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-400 focus:border-black focus:ring-4 focus:ring-red-500/15 disabled:opacity-50";

export default function InvestorSignInPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error: reduxError,
    isAuthenticated,
  } = useSelector((state: RootState) => state.investor);

  const [isRegistering] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [investorShare, setInvestorShare] = useState("");
  const [address, setAddress] = useState("");

  const [codeSent, setCodeSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [done, setDone] = useState(false);
  const [localError, setLocalError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const boxes = useRef<Array<HTMLInputElement | null>>([]);

  const error = localError || reduxError;
  const busy = loading || done;

  // Active identifier for verification and submission
  const identifier = loginMethod === "email" ? email : phone;

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  useEffect(() => {
    if (codeSent) boxes.current[0]?.focus();
  }, [codeSent]);

  useEffect(() => {
    if (isAuthenticated) {
      setDone(true);
      const timer = setTimeout(() => {
        router.push(AFTER_SIGN_IN_URL);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  // Handle Account Creation
  async function handleCreateAccount(e?: FormEvent) {
    if (e) e.preventDefault();
    dispatch(clearInvestorError());
    setLocalError("");

    if (!name.trim() || !phone.trim() || !email.trim() || !investorShare) {
      setLocalError("Please fill out all required fields.");
      return;
    }

    if (!emailOk(email)) {
      setLocalError("Enter a valid email address.");
      return;
    }

    const result = await dispatch(
      createAccount({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        investorShare: Number(investorShare),
        address: address.trim(),
        role: "Investor",
      })
    );

    if (createAccount.fulfilled.match(result)) {
      setCodeSent(true);
      setCooldown(RESEND_SECONDS);
    }
  }

  // Handle Sign In Request (Sends OTP via phone or email lookup)
  async function handleLogin(e?: FormEvent) {
    if (e) e.preventDefault();
    dispatch(clearInvestorError());
    setLocalError("");

    if (!identifier.trim()) {
      setLocalError(
        loginMethod === "email"
          ? "Enter your registered email address."
          : "Enter your registered phone number."
      );
      return;
    }

    if (loginMethod === "email" && !emailOk(email)) {
      setLocalError("Enter a valid email address.");
      return;
    }

    const result = await dispatch(
      loginInvestor({ identifier: identifier.trim() })
    );

    if (loginInvestor.fulfilled.match(result)) {
      setCodeSent(true);
      setCooldown(RESEND_SECONDS);
    }
  }

  // Verify OTP
  async function verify(code: string) {
    dispatch(clearInvestorError());
    setLocalError("");

    const result = await dispatch(
      verifyOtp({ identifier: identifier.trim(), otp: code })
    );

    if (verifyOtp.fulfilled.match(result)) {
      setDone(true);
    } else {
      setDigits(Array(OTP_LENGTH).fill(""));
      setTimeout(() => boxes.current[0]?.focus(), 0);
    }
  }

  function setDigit(i: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < OTP_LENGTH - 1) boxes.current[i + 1]?.focus();
    if (next.every(Boolean)) verify(next.join(""));
  }

  function onKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0)
      boxes.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < OTP_LENGTH - 1)
      boxes.current[i + 1]?.focus();
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array.from({ length: OTP_LENGTH }, (_, i) => text[i] ?? "");
    setDigits(next);
    boxes.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
    if (next.every(Boolean)) verify(next.join(""));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!codeSent) {
      if (isRegistering) {
        return handleCreateAccount(e);
      } else {
        return handleLogin(e);
      }
    }
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setLocalError(`Enter all ${OTP_LENGTH} digits.`);
      return;
    }
    verify(code);
  }

  function resetFlow() {
    setCodeSent(false);
    setDigits(Array(OTP_LENGTH).fill(""));
    setCooldown(0);
    setLocalError("");
    dispatch(clearInvestorError());
  }

  return (
    <main className="grid min-h-screen bg-white text-black lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* ============ LEFT: FORM ============ */}
      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24 justify-between">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Pickars home"
            className={`inline-flex items-center rounded-md ${FOCUS}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO}
              alt="Pickars"
              className="h-9 rounded-[8px] w-auto sm:h-10"
            />
          </Link>
          {/* <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              resetFlow();
            }}
            className="text-xs font-semibold text-neutral-600 hover:text-black underline underline-offset-4"
          >
            {isRegistering
              ? "Already an investor? Sign in"
              : "Create an account"}
          </button> */}
        </header>

        <div className="flex flex-1 items-center py-12">
          <div className="mx-auto w-full max-w-sm">
            {done ? (
              <div role="status" className="space-y-3 text-center">
                <CheckCircle2
                  size={40}
                  aria-hidden
                  className="mx-auto text-[#ff0000]"
                />
                <h1 className="text-2xl font-semibold tracking-tight">
                  You&apos;re signed in
                </h1>
                <p className="text-sm text-neutral-600">
                  Taking you to your dashboard…
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div className="space-y-2">
                  {codeSent && (
                    <button
                      type="button"
                      onClick={resetFlow}
                      disabled={busy}
                      className={`-ml-1 mb-2 inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-sm text-neutral-600 hover:text-black ${FOCUS}`}
                    >
                      <ArrowLeft size={15} aria-hidden />
                      Back to {isRegistering ? "registration" : "sign in"}
                    </button>
                  )}
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {codeSent
                      ? "Check your inbox"
                      : isRegistering
                      ? "Create Investor Account"
                      : "Investor Portal Sign in"}
                  </h1>
                  <p className="text-[15px] leading-relaxed text-neutral-600">
                    {codeSent ? (
                      <>
                        We sent a 6-digit code to{" "}
                        <span className="font-medium text-black break-all">
                          {identifier}
                        </span>
                        .
                      </>
                    ) : isRegistering ? (
                      "Fill in your stakeholder details to generate your account and receive your verification code."
                    ) : (
                      "Sign in using your registered phone number or email address."
                    )}
                  </p>
                </div>

                <div aria-live="polite">
                  {error && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {error}
                    </div>
                  )}
                </div>

                {!codeSent ? (
                  <div className="space-y-4">
                    {!isRegistering && (
                      <div className="flex rounded-lg bg-neutral-100 p-1">
                        <button
                          type="button"
                          onClick={() => {
                            setLoginMethod("phone");
                            setLocalError("");
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-xs font-medium transition-all ${
                            loginMethod === "phone"
                              ? "bg-white text-black shadow-sm"
                              : "text-neutral-500 hover:text-black"
                          }`}
                        >
                          <Phone size={14} />
                          Phone Number
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLoginMethod("email");
                            setLocalError("");
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-xs font-medium transition-all ${
                            loginMethod === "email"
                              ? "bg-white text-black shadow-sm"
                              : "text-neutral-500 hover:text-black"
                          }`}
                        >
                          <Mail size={14} />
                          Email Address
                        </button>
                      </div>
                    )}

                    {isRegistering && (
                      <>
                        <div className="space-y-1.5">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={busy}
                            className={`${FIELD} px-4 py-3 text-sm`}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={busy}
                            className={`${FIELD} px-4 py-3 text-sm`}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="share"
                            className="text-sm font-medium"
                          >
                            Investor Share (%)
                          </label>
                          <input
                            id="share"
                            type="number"
                            required
                            placeholder="10"
                            value={investorShare}
                            onChange={(e) => setInvestorShare(e.target.value)}
                            disabled={busy}
                            className={`${FIELD} px-4 py-3 text-sm`}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="address"
                            className="text-sm font-medium"
                          >
                            Address (Optional)
                          </label>
                          <input
                            id="address"
                            type="text"
                            placeholder="123 Financial District"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={busy}
                            className={`${FIELD} px-4 py-3 text-sm`}
                          />
                        </div>
                      </>
                    )}

                    {!isRegistering && loginMethod === "phone" && (
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="08012345678 or +234..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={busy}
                          autoFocus
                          className={`${FIELD} px-4 py-3 text-sm`}
                        />
                      </div>
                    )}

                    {!isRegistering && loginMethod === "email" && (
                      <div className="space-y-1.5">
                        <label
                          htmlFor="login-email"
                          className="text-sm font-medium"
                        >
                          Email Address
                        </label>
                        <input
                          id="login-email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={busy}
                          autoFocus
                          className={`${FIELD} px-4 py-3 text-sm`}
                        />
                      </div>
                    )}

                    {isRegistering && (
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="08012345678 or +234..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={busy}
                          className={`${FIELD} px-4 py-3 text-sm`}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span id="otp-label" className="text-sm font-medium">
                      Verification code
                    </span>
                    <div
                      role="group"
                      aria-labelledby="otp-label"
                      className="grid grid-cols-6 gap-2 sm:gap-2.5"
                    >
                      {digits.map((d, i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            boxes.current[i] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete={i === 0 ? "one-time-code" : "off"}
                          maxLength={1}
                          value={d}
                          onChange={(e) => setDigit(i, e.target.value)}
                          onKeyDown={(e) => onKeyDown(i, e)}
                          onPaste={onPaste}
                          onFocus={(e) => e.target.select()}
                          aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
                          aria-invalid={!!error}
                          disabled={busy}
                          className={`${FIELD} aspect-square p-0 text-center text-xl font-semibold`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#ff0000] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-black ${FOCUS}`}
                >
                  {busy
                    ? "Processing…"
                    : codeSent
                    ? "Verify and sign in"
                    : isRegistering
                    ? "Create account & send code"
                    : "Send code"}
                  {!busy && <ArrowRight size={18} aria-hidden />}
                </button>

                {codeSent && (
                  <p className="text-center text-sm text-neutral-600">
                    Didn&apos;t get it?{" "}
                    <button
                      type="button"
                      disabled={cooldown > 0 || busy}
                      onClick={() =>
                        isRegistering ? handleCreateAccount() : handleLogin()
                      }
                      className={`rounded font-medium text-black underline underline-offset-4 decoration-neutral-300 hover:decoration-black disabled:cursor-not-allowed disabled:text-neutral-400 disabled:no-underline ${FOCUS}`}
                    >
                      {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                    </button>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <footer className="flex items-center justify-between text-sm text-neutral-500 pt-6">
          <span>© {new Date().getFullYear()} Pickars</span>
          <a
            href={SUPPORT_URL}
            className={`rounded font-medium text-black underline underline-offset-4 decoration-neutral-300 hover:decoration-black ${FOCUS}`}
          >
            Contact support
          </a>
        </footer>
      </section>

      {/* ============ RIGHT: IMAGE PANEL ============ */}
      <aside className="hidden p-4 lg:block">
        <div className="relative h-full min-h-[600px] overflow-hidden rounded-3xl bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 space-y-4 p-10 xl:p-12">
            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-white xl:text-4xl">
              Your equity and performance, in one place.
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-white/70">
              Review portfolio metrics, reports and shareholder records.
            </p>
            <p className="flex items-start gap-2.5 border-t border-white/15 pt-4 text-sm text-white/70">
              <ShieldCheck
                size={18}
                aria-hidden
                className="mt-0.5 shrink-0 text-[#ff0000]"
              />
              Sign-ins are checked against registered shareholder records.
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
