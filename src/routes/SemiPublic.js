import { routeTypes } from "../configs/routes/routeConfigs";
import Avaitor from "../pages/avaiator/Avaitor";
import Home from "../pages/home/Home";
import SinglePost from "../pages/post/SinglePost";

const config = {
    type:routeTypes.SEMI
}

export const SemiRoutes =
    [{
        path:"/:user",
        component:Home,
        order:1,
        ...config
    },
    {
        path:"/post/:id",
        component:SinglePost,
        order:2,
        ...config
    }
]