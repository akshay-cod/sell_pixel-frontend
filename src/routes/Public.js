import { routeTypes } from "../configs/routes/routeConfigs"
import PaymentStaus from "../pages/payment/PaymentStaus.jsx"

const config = {
    type:routeTypes.PUBLIC
}

export const PublicRoutes = [{
    path:"/payment/success",
    component:<PaymentStaus type={"success"}/>,
    order:1,
    ...config
},

    {
        path:"/payment/failure",
        component:<PaymentStaus type={"failure"}/>,
        order:1,
        ...config
    }
]