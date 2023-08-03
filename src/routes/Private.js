import { routeTypes } from "../configs/routes/routeConfigs"
import Create from "../pages/creation/Create"
import Profile from "../pages/profile/Profile"

const config = {
    type:routeTypes.PRIVATE
}

export const PrivateRoutes = [
    {
    path:"/profile/edit",
    component:Profile,
    order:3,
    ...config
    },
    {
        path:"/creations/create",
        component:Create,
        order:3,
        ...config
    }
]