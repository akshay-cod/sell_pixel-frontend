import { routeTypes } from "../configs/routes/routeConfigs"
import FlexibleCards from "../pages/v2/Profile/FlexibleCards"
import Dashboard from "../pages/v2/dashboard/Dashboard"
import SinglePostView from "../pages/v2/single-post-v2/SinglePostView"

const config = {
    type:routeTypes.PUBLIC
}

export const PublicRoutes = [
   
    {
        path:"/dashboard/dev",
        component:<Dashboard/>,
        order:1,
        ...config
    }
]