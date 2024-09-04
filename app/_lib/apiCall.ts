import { auth } from "@/app/_services/auth";

type TApiCallProps = {
    url: string;
    method: string;
    body?: Record<string, any>;
}

const apiCall = async ({ url, method = "GET", body }: TApiCallProps) => {
    const session = await auth();

    const token = session?.token;

    console.log({token})

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { 'X-Auth-Token': token })
        },
        ...(method !== 'GET' && body && { body: JSON.stringify(body) }),
    });

    return res.json();
}

export default apiCall