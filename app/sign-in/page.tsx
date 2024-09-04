import {login} from "@/app/_actions/auth";
import {auth} from "@/app/_services/auth";
import SubmitButton from "@/app/_components/SubmitButton";

const Page = async () => {
    const session = await auth();
    const isAuthorized = !!session?.user;

    if(isAuthorized) {
        return <div>Already signed in</div>
    }

    return (
        <form action={login}>
            <div className="flex flex-col gap-2">
                <label htmlFor="username">Email Address</label>
                <input type="email" name="username" id="username" defaultValue={process.env.NEXT_PUBLIC_USERNAME}/>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" defaultValue={process.env.NEXT_PUBLIC_PASSWORD}/>
            </div>

            <SubmitButton label='Sign in' loading='Signing in...'/>
        </form>
    )
}

export default Page