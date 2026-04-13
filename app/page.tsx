import Link from "next/link";
import {Flame, Sparkles, Trophy} from "lucide-react";

export default function HomePage() {
  return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--bg)] px-6 py-10">

        {/* Card */}
        <div
            className="w-full max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--card)] px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 shadow-xl backdrop-blur">

          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <div
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm text-[var(--primary)]">
              <Sparkles size={14}/>
              AI habit building with streaks and XP
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Turn goals into
            <span
                className="ml-2 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent dark:from-orange-400 dark:to-amber-300 pb-4">
            lasting habits
          </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-7 text-[var(--text-muted)]">
            HabitForge helps you turn vague goals into simple daily actions,
            stay consistent with streaks, and build momentum with AI-guided plans.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
                href="/onboarding"
                className="rounded-2xl bg-[var(--primary)] px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Start Your Plan
            </Link>

            <Link
                href="/dashboard"
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-6 py-3 text-center font-semibold text-[var(--text)] hover:opacity-90"
            >
              View Demo Dashboard
            </Link>
          </div>

          {/* Features */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" size={16}/>
              Daily streak tracking
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-amber-500" size={16}/>
              XP rewards
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-[var(--primary)]" size={16}/>
              AI-generated plans
            </div>
          </div>

        </div>
      </main>
  );
}
