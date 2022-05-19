import Auth from "./pages/Auth";
import Room from "./pages/Room";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, ROOM_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ROOM_ROUTE + '/:id',
        Component: Room
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