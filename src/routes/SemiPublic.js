import { routeTypes } from "../configs/routes/routeConfigs";
import Avaitor from "../pages/avaiator/Avaitor";
import Home from "../pages/home/Home";
import Main from "../pages/index/Main";
import SinglePost from "../pages/post/SinglePost";
import { HomeV2 } from "../pages/v2/Profile";
import FlexibleCards from "../pages/v2/Profile/FlexibleCards";
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
    // {
    //     path:"/post/:id",
    //     component:SinglePost,
    //     order:2,
    //     ...config
    // },
    {
        path:"/ui/:user",
        component:FlexibleCards,
        order:1,
        ...config
    },
    {
        path:"/post/:id",
        component:SinglePostView,
        order:1,
        ...config
    }
]