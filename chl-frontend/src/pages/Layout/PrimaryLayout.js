import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import AppFooter from "./Footer";
import AppHeader from "./Header";

const PrimaryLayout = () => {
    return(
        <Layout>
            <AppHeader />
            <div className="container">
                <Outlet />
            </div>
            <AppFooter />
        </Layout>
    )
}

export default PrimaryLayout;