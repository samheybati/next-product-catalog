"use client";

import Link from "next/link";
import {ThemeToggle} from "@/components/theme-toggle";
import {logout} from "@/lib/auth";
import {useAuthUser} from "@/hooks/useAuthUser";

export function Header() {
    const user = useAuthUser();

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]"
                >
                    HabitForge
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <ThemeToggle/>

                    {user ? (
                        <div className="flex items-center gap-3">

                            {/* Avatar */}
                            {user.photoURL && (
                                <img
                                    src={user.photoURL}
                                    alt="user"
                                    className="h-9 w-9 rounded-full border border-[var(--border)]"
                                />
                            )}

                            {/* Logout */}
                            <button
                                onClick={logout}
                                className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm hover:opacity-80"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
