import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { MenuItems } from "./components";
import logo from './assets/myflix-logo.png'
import { Viewer } from "../../lib/types";

const { Header } = Layout

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: Props) => {
    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo"> 
                    <Link className="flex" to="/">
                        <img src={logo} alt="App logo" />
                    </Link>
                </div>
            </div>
            <div className="app-header__menu-section">
                <MenuItems viewer={viewer} setViewer={setViewer}/>
            </div>
        </Header>
    )
}