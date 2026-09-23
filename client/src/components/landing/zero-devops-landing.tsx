"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  ChevronRight,
  CircleDot,
  Code2,
  GitBranch,
  Github,
  Menu,
  Play,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { GithubLoginButton } from "@/features/auth/components/github-login-button";

const steps = [
  [Github, "GitHub", "Connect your source"],
  [GitBranch, "Push", "Webhook trigger"],
  [Boxes, "Build", "Queue + worker"],
  [Server, "Deploy", "Immutable output"],
] as const;

const demoSteps = [
  [Github, "01", "Connect GitHub"],
  [GitBranch, "02", "Select repository + branch"],
  [Zap, "03", "Webhook creates a build"],
  [Terminal, "04", "Worker executes approved configuration"],
  [Rocket, "05", "Deployment status returns to dashboard"],
] as const;

export function ZeroDevOpsLanding() {
  const [demo, setDemo] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <div className="min-h-dvh overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[8%] top-[-18rem] size-[38rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="absolute right-[-8rem] top-[15%] size-[34rem] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-[-16rem] left-[35%] size-[34rem] rounded-full bg-emerald-400/8 blur-[120px]" />
      </div>

      <header className="relative z-30 border-b border-white/[0.06] bg-[#050505]/65 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-5 lg:px-8">
          <Logo />
          <div className="hidden flex-1 justify-center md:flex">
            <span className="text-xs text-white/35">Infrastructure that disappears behind your code.</span>
          </div>
          <nav className="ml-auto hidden items-center gap-2 sm:flex">
            <button onClick={() => setDemo(true)} className="rounded-lg px-3 py-2 text-xs text-white/55 hover:bg-white/[0.05] hover:text-white">Demo</button>
            <Link href="/login" className="rounded-lg px-3 py-2 text-xs text-white/55 hover:bg-white/[0.05] hover:text-white">Login</Link>
            <GithubLoginButton size="sm" label="Sign Up" className="h-9 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-white/90" />
          </nav>
          <button onClick={() => setMenu((value) => !value)} className="ml-auto rounded-lg border border-white/10 p-2 sm:hidden" aria-label="Menu">
            {menu ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
        {menu ? (
          <div className="border-t border-white/[0.06] px-5 py-4 sm:hidden">
            <div className="flex flex-col gap-2">
              <button onClick={() => { setDemo(true); setMenu(false); }} className="rounded-lg px-3 py-3 text-left text-sm text-white/60">Demo</button>
              <Link href="/login" className="rounded-lg px-3 py-3 text-sm text-white/60">Login</Link>
              <GithubLoginButton label="Sign Up with GitHub" className="w-full" />
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] uppercase tracking-[.18em] text-white/45">
                <Sparkles className="size-3.5 text-fuchsia-300" /> Git push to production
              </div>
              <h1 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-[76px]">
                Deploy without becoming a <span className="gradient-text">DevOps team.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/40 sm:text-lg">
                Zero-DevOps turns a configured GitHub repository into a reproducible build and deployment workflow, while keeping the infrastructure visible when you need it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GithubLoginButton label="Continue with GitHub" size="lg" className="h-12 rounded-xl bg-white px-6 font-semibold text-black hover:bg-white/90" />
                <button onClick={() => setDemo(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-6 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white">
                  <Play className="size-4" /> See how it works
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/30">
                <span className="inline-flex items-center gap-1.5"><CircleDot className="size-3 text-emerald-300" /> GitHub OAuth</span>
                <span className="inline-flex items-center gap-1.5"><Zap className="size-3 text-cyan-300" /> Reproducible builds</span>
                <span className="inline-flex items-center gap-1.5"><Code2 className="size-3 text-fuchsia-300" /> Backend unchanged</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
              <div className="absolute -inset-10 bg-gradient-to-r from-cyan-400/8 via-fuchsia-500/8 to-emerald-400/8 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#080808]/90 shadow-2xl shadow-black/50">
                <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-4">
                  <span className="size-2 rounded-full bg-rose-400/70" /><span className="size-2 rounded-full bg-amber-300/70" /><span className="size-2 rounded-full bg-emerald-300/70" />
                  <span className="ml-3 font-mono text-[10px] text-white/25">zero-devops / deployment-flow</span>
                </div>
                <div className="relative p-5 sm:p-8">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {steps.map(([Icon, title, subtitle], index) => (
                      <motion.div key={title} animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.25 }} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                        <div className={`flex size-9 items-center justify-center rounded-xl bg-gradient-to-br ${index % 2 === 0 ? "from-cyan-400/15 to-blue-500/10" : "from-fuchsia-400/15 to-violet-500/10"}`}><Icon className="size-4 text-white/70" /></div>
                        <p className="mt-4 text-xs font-medium">{title}</p><p className="mt-1 text-[10px] leading-4 text-white/30">{subtitle}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="my-5 h-px bg-gradient-to-r from-cyan-300/0 via-white/15 to-fuchsia-300/0" />
                  <div className="rounded-2xl border border-white/[0.07] bg-black/50 p-4 font-mono text-[10px] leading-6 text-white/35">
                    <p><span className="text-emerald-300/80">$</span> git push origin main</p>
                    <p><span className="text-cyan-300/80">→</span> webhook accepted · build queued</p>
                    <p><span className="text-fuchsia-300/80">→</span> worker receives immutable build job</p>
                    <p><span className="text-amber-200/70">→</span> output is published when the backend reports success</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto grid max-w-7xl gap-0 px-5 lg:grid-cols-3 lg:px-8">
            {["One project model", "Visible build state", "Less platform work"].map((title, index) => (
              <div key={title} className={`p-7 ${index < 2 ? "border-b border-white/[0.06] lg:border-b-0 lg:border-r" : ""}`}>
                <p className="text-xs text-white/25">0{index + 1}</p>
                <h2 className="mt-5 text-lg font-medium">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/35">{index === 0 ? "Repositories, branches and build configuration stay attached to an explicit project." : index === 1 ? "Pending, building, success and failed states come from the real backend." : "The interface keeps the deployment path understandable instead of hiding it behind magic."}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col gap-5 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-cyan-400/[0.05] via-fuchsia-500/[0.035] to-emerald-400/[0.05] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="text-xs uppercase tracking-[.18em] text-white/30">Zero-DevOps</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Your repository is the starting point. The platform handles the path.</h2></div>
            <button onClick={() => setDemo(true)} className="inline-flex shrink-0 items-center gap-2 text-sm text-white/60 hover:text-white">Explore the flow <ArrowRight className="size-4" /></button>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {demo ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 12 }} className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-3xl border border-white/10 bg-[#090909] shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.07] bg-[#090909]/90 px-6 py-5 backdrop-blur">
                <div><p className="text-xs uppercase tracking-[.18em] text-white/30">Interactive demo</p><h3 className="mt-1 text-lg font-semibold">From Git push to deployment</h3></div>
                <button onClick={() => setDemo(false)} className="rounded-lg border border-white/10 p-2 text-white/45 hover:text-white" aria-label="Close demo"><X className="size-4" /></button>
              </div>
              <div className="grid gap-4 p-6 md:grid-cols-[.9fr_1.1fr]">
                <div className="space-y-2">
                  {demoSteps.map(([Icon, number, title]) => (
                    <div key={number} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]"><Icon className="size-4 text-white/60" /></span><span><span className="block text-[10px] text-white/25">{number}</span><span className="mt-0.5 block text-sm text-white/65">{title}</span></span><ChevronRight className="ml-auto size-4 text-white/15" /></div>
                  ))}
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505]">
                  <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3"><Terminal className="size-3.5 text-white/25" /><span className="font-mono text-[10px] text-white/30">workflow-preview</span></div>
                  <div className="p-5 font-mono text-[11px] leading-7 text-white/45">
                    <p><span className="text-emerald-300">$</span> git push origin main</p><p className="text-cyan-200/70">✓ webhook received</p><p className="text-fuchsia-200/70">✓ build queued</p><p>→ worker receives approved configuration</p><p>→ build status: pending</p><p>→ build status: building</p><p>→ deployment result is read from the backend</p><p className="mt-4 border-t border-white/[0.06] pt-4 text-white/25">This demo is illustrative. It does not execute these commands.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
