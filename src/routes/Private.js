import { routeTypes } from "../configs/routes/routeConfigs"
import Create from "../pages/creation/Create"
import EditCreation from "../pages/creation/EditCreate"
import Profile from "../pages/profile/Profile"
import Purchases from "../pages/profile/Purchases"

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
    },
    {
        path:"/creations/edit/:creationId",
        component:EditCreation,
        order:4,
        ...config
    },
    {
        path:"/profile/purchases",
        component:Purchases,
        order:5,
        ...config
    }
]