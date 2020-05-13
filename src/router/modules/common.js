// import Layout from "../../components/layout"
import Login from "@/pages/login"
export default [
    {
        path: "/",
        name: "主页",
        redirect: "/home",
    
    },
    {
        path: "/login",
        name: "登录",
        component: Login
    },
]
