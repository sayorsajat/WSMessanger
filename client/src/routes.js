import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]