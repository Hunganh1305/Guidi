import Blog from "../components/Blog/Blog";
import TourGuide from "../components/TourGuide/TourGuide";
import TravelPlanner from "../components/TravelPlanner/TravelPlanner";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Login from "../layouts/AuthLayout/Login/Login";
import Register from "../layouts/AuthLayout/Register/Register";
import PlanContent from "../components/PlanContent/PlanContent";
import Payment from "../components/Payment/Payment";
import Profile from "../components/Profile/Profile";
import PlanList from "../components/ListPlan/PlanList";
import Qrpayment from "../components/QrPayment/Qrpayment";

const publicRoutes = [
  {
    path: "/",
    component: TravelPlanner,
    layout: DefaultLayout,
  },
  { path: "/planner", component: TravelPlanner, layout: DefaultLayout },
  {
    path: "/planner/plan",
    component: PlanContent,
    layout: DefaultLayout,
    private: true,
  },
  { path: "/blog", component: Blog, layout: DefaultLayout },
  { path: "/tourguide", component: TourGuide, layout: DefaultLayout },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  {
    path: "/payment",
    component: Payment,
    layout: DefaultLayout,
    private: true,
  },
  {
    path: "/qrpayment",
    component: Qrpayment,
    layout: DefaultLayout,
    private: true,
  },
  {
    path: "/profile",
    component: Profile,
    layout: DefaultLayout,
  },
  {
    path: "/planlist",
    component: PlanList,
    layout: DefaultLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
