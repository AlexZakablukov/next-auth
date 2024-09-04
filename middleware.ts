import { auth } from '@/app/_services/auth';

const SIGN_IN_ROUTE = '/sign-in';

const PRIVATE_ROUTES = [
    '/private',
    '/private-pages/products',
    '/private-pages/exhibitors',
]

export default auth((req) => {
    const { nextUrl } = req;
    const { origin, pathname } = nextUrl;

    const isAuthenticated = !!req.auth;
    const isPrivateRoute = PRIVATE_ROUTES.includes(pathname);

    if (isPrivateRoute && !isAuthenticated) {
        return Response.redirect(`${origin}${SIGN_IN_ROUTE}`);
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};