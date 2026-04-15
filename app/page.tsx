"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CircleCheckBig,
  Flame,
  Sparkles,
  Trophy,
} from "lucide-react";

import { useAuthUser } from "@/hooks/useAuthUser";
import { getPlansForUser } from "@/lib/plans";
import OverallConsistencyCard from "@/components/dashboard/OverallConsistencyCard";
import type { LoadedPlan } from "@/types/plan";

export default function HomePage() {
  const user = useAuthUser();
  const [plans, setPlans] = useState<LoadedPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  useEffect(() => {
    async function loadPlans() {
      if (!user) return;

      try {
        setLoadingPlans(true);
        const allPlans = await getPlansForUser(user.uid);
        setPlans(allPlans);
      } catch (error) {
        console.error("Failed to load plans for home page:", error);
      } finally {
        setLoadingPlans(false);
      }
    }

    loadPlans();
  }, [user]);

  if (user) {
    return (
        <main className="relative min-h-full bg-[var(--bg)] px-6 py-10">
          <div className="absolute inset-0 -z-20 bg-gradient-to-b from-orange-50/80 via-[var(--bg)] to-[var(--bg)] dark:from-[#1a120c] dark:via-[var(--bg)] dark:to-[var(--bg)]" />
          <div className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl dark:bg-orange-500/10" />

          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <section className="rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm text-[var(--primary)]">
                  <Sparkles size={14} />
                  Welcome back to HabitForge
                </div>

                <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  Keep building
                  <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent dark:from-orange-400 dark:to-amber-300">
                  momentum every day
                </span>
                </h1>

                <p className="mt-5 max-w-xl leading-8 text-[var(--text-muted)]">
                  Every small action you complete makes the habit easier to keep.
                  Stay consistent, earn XP, and keep moving through your plan one
                  step at a time.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Flame size={16} className="text-orange-500" />
                      Daily focus
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      Show up for your plan and keep your streak alive.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Trophy size={16} className="text-amber-500" />
                      Earn XP
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      Every completed step adds progress you can actually see.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Sparkles size={16} className="text-[var(--primary)]" />
                      Grow by level
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      Move from beginner to advanced with structure and clarity.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:opacity-95"
                  >
                    Go to dashboard
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                      href="/onboarding"
                      className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-6 py-3.5 text-center font-semibold text-[var(--text)] transition hover:bg-white/70 dark:hover:bg-white/10"
                  >
                    Create another plan
                  </Link>
                </div>
              </section>

              <aside>
                {loadingPlans ? (
                    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl">
                      Loading your progress...
                    </div>
                ) : plans.length ? (
                    <OverallConsistencyCard plans={plans} />
                ) : (
                    <div className="relative">
                      <div className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-orange-500/10 to-amber-400/10 blur-2xl" />
                      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--bg)] p-6">
                        <div className="mb-6 flex items-start justify-between">
                          <div>
                            <p className="text-sm text-[var(--text-muted)]">
                              Your progress
                            </p>
                            <h2 className="mt-1 text-2xl font-bold">Start your first plan</h2>
                          </div>

                          <div className="rounded-2xl bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-white">
                            +0 XP
                          </div>
                        </div>

                        <div className="mb-6 flex items-center justify-center">
                          <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-orange-200 dark:border-orange-900/50">
                            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[var(--card)] text-center shadow-sm">
                              <span className="text-3xl font-bold">0%</span>
                              <span className="text-xs text-[var(--text-muted)]">
                            progress
                          </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {[
                            "Create your plan",
                            "Finish first step",
                            "Build your streak",
                          ].map((item, index) => (
                              <div
                                  key={item}
                                  className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"
                              >
                                <div className="flex items-center gap-3">
                                  <CircleCheckBig
                                      size={18}
                                      className={
                                        index === 0
                                            ? "text-[var(--text-muted)]"
                                            : "text-[var(--text-muted)]"
                                      }
                                  />
                                  <span className="text-sm font-medium">{item}</span>
                                </div>
                                <span className="text-xs text-[var(--text-muted)]">
                            +10 XP
                          </span>
                              </div>
                          ))}
                        </div>

                        <Link
                            href="/onboarding"
                            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                        >
                          Create your first plan
                        </Link>
                      </div>
                    </div>
                )}
              </aside>
            </div>
          </div>
        </main>
    );
  }

  return (
      <main className="relative flex min-h-full items-center justify-center bg-[var(--bg)] px-6 py-10">
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-orange-50/80 via-[var(--bg)] to-[var(--bg)] dark:from-[#1a120c] dark:via-[var(--bg)] dark:to-[var(--bg)]" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl dark:bg-orange-500/10" />

        <div className="w-full max-w-6xl rounded-[32px] border border-[var(--border)] bg-[var(--card)] px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm text-[var(--primary)]">
                <Sparkles size={14} />
                AI habit building with streaks and XP
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Build a habit in
                <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent dark:from-orange-400 dark:to-amber-300">
                60 focused days
              </span>
              </h1>

              <p className="mt-5 max-w-2xl leading-8 text-[var(--text-muted)]">
                HabitForge turns a vague goal into a clear plan you can actually
                follow. We guide you through three growth levels:
                <span className="mx-1 font-semibold text-[var(--text)]">
                beginner
              </span>
                ,
                <span className="mx-1 font-semibold text-[var(--text)]">
                intermediate
              </span>
                , and
                <span className="ml-1 font-semibold text-[var(--text)]">
                advanced
              </span>
                .
              </p>

              <p className="mt-4 max-w-2xl leading-8 text-[var(--text-muted)]">
                Each level gives you 20 structured steps, which means 20 focused
                days of action. Across 3 levels, that becomes a 60-day journey
                designed to help one habit become part of your real life.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <h2 className="text-lg font-semibold">Beginner</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    Start simple. Build confidence with 20 easy, practical steps.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <h2 className="text-lg font-semibold">Intermediate</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    Go deeper. Add challenge once the habit feels more natural.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <h2 className="text-lg font-semibold">Advanced</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    Make it part of your identity with stronger long-term consistency.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                    href="/login"
                    className="rounded-2xl bg-[var(--primary)] px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:opacity-95"
                >
                  Login to start
                </Link>

                <Link
                    href="/onboarding"
                    className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-6 py-3.5 text-center font-semibold text-[var(--text)] transition hover:bg-white/70 dark:hover:bg-white/10"
                >
                  Explore the plan flow
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <Flame className="text-orange-500" size={16} />
                  Daily streak tracking
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="text-amber-500" size={16} />
                  XP rewards
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="text-[var(--primary)]" size={16} />
                  3 levels × 20 steps
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-orange-500/10 to-amber-400/10 blur-2xl" />

              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Your journey</p>
                    <h2 className="mt-1 text-2xl font-bold">60 days of progress</h2>
                  </div>

                  <div className="rounded-2xl bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-white">
                    +600 XP
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-orange-200 dark:border-orange-900/50">
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[var(--card)] text-center shadow-sm">
                      <span className="text-3xl font-bold">3 levels</span>
                      <span className="text-xs text-[var(--text-muted)]">
                      20 steps each
                    </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Beginner foundation",
                    "Intermediate growth",
                    "Advanced mastery",
                  ].map((item, index) => (
                      <div
                          key={item}
                          className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <CircleCheckBig
                              size={18}
                              className={
                                index === 0
                                    ? "text-green-500"
                                    : "text-[var(--text-muted)]"
                              }
                          />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">
                      20 steps
                    </span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
