import { routeTypes } from "../configs/routes/routeConfigs"
import Create from "../pages/creation/Create"
import EditCreation from "../pages/creation/EditCreate"
import SinglePost from "../pages/post/SinglePost"
import Profile from "../pages/profile/Profile"
import Index from "../pages/profile/purchases/Index"

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
        component:Index,
        order:5,
        ...config
    },
    {
        path:"/post/:id",
        component:SinglePost,
        order:2,
        ...config
    }
]