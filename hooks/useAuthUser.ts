"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuthUser() {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser ?? null);
        });

        return () => unsub();
    }, []);

    return user;
}
