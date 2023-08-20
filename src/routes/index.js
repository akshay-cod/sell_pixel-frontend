import { PrivateRoutes } from "./Private";
 import { PublicRoutes } from "./Public";
import { SemiRoutes } from "./SemiPublic";

export const allRoutes = [
    // ...PublicRoutes,
    ...PrivateRoutes,
    ...SemiRoutes
]

//console.log(allRoutes)