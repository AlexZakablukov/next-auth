import Link from "next/link";
import { auth } from "@/app/_services/auth";
import {logout} from "@/app/_actions/auth";
import User from "@/app/_components/User";

const Navbar = async () => {
    const session = await auth();

    // console.log({session})

    const isAuthorized = !!session?.user;

    return <div className='flex items-center gap-2 p-5 border-b-2 border-amber-900'>
        <Link href='/'>Home</Link>
        <Link href='/public'>Public page</Link>
        <Link href='/private'>Private page</Link>
        <Link href='/private-pages/products'>Private:Products</Link>
        <Link href='/private-pages/exhibitors'>Private:Exhibitors</Link>

        {!isAuthorized && <Link href='/sign-in' className='m-auto'>Sign-in</Link>}
        {isAuthorized &&
            <div className='m-auto flex gap-10 items-center'>
                <User name={session.user!.displayName} image={session.user!.photoUrl}/>
                <form action={logout}>
                    <button type='submit'>Logout</button>
                </form>
            </div>
        }
        {/*{isAuthorized && <div>{session.user?.displayName} - logout</div>}*/}
    </div>
}

export default Navbar