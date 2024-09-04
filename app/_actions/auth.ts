'use server'

import { signIn, signOut } from "@/app/_services/auth";

export const login = async (formData: FormData) => {
    return signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirect: true,
    })
}

export const logout = async () => {
    return signOut({ redirectTo: "/" });
}

