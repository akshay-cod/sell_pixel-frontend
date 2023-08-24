import { routeTypes } from "../configs/routes/routeConfigs"
import FlexibleCards from "../pages/v2/Profile/FlexibleCards"
import SinglePostView from "../pages/v2/single-post-v2/SinglePostView"

const config = {
    type:routeTypes.PUBLIC
}

export const PublicRoutes = [
    {
        path:"/ui/v2",
        component:<FlexibleCards/>,
        order:1,
        ...config
    },
    {
        path:"/ui/post",
        component:<SinglePostView/>,
        order:1,
        ...config
    }
]