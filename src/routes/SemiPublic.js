import { routeTypes } from "../configs/routes/routeConfigs";
import Main from "../pages/index/Main";
import { HomeV2 } from "../pages/v2/Profile";
import SinglePostView from "../pages/v2/single-post-v2/SinglePostView";

const config = {
    type:routeTypes.SEMI
}

export const SemiRoutes =
    [{
        path:"/:user",
        component:HomeV2,
        order:1,
        ...config
    },
    {
        path:"/",
        component:Main,
        order:2,
        ...config 
    },
    {
        path:"/creations/:id",
        component:SinglePostView,
        order:1,
        ...config
    }
]