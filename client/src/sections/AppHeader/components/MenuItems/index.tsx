import React from "react"
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Avatar, Button, Menu } from 'antd';
import { Viewer } from "../../../../lib/types";
import { LOG_OUT } from "../../../../lib/graphql/mutations";
import { LogOutMutation as LogOutData } from "../../../../generated/graphql";
import { HeartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { displaySuccessNotification, displayErrorMessage } from "../../../../lib/utils";

const { Item, SubMenu } = Menu;

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({ viewer, setViewer }: Props) => {
    const [logOut] = useMutation<LogOutData>(LOG_OUT, {
        onCompleted: (data) => {
            if (data && data.logOut) {
                setViewer(data.logOut as Viewer);
                sessionStorage.removeItem("token");
                displaySuccessNotification("You've successfully logged out!");
            }
        },
        onError: () => {
            displayErrorMessage(
                "Sorry! We weren't able to log you out. Please try again later!"
            );
        }
    });

    const handleLogOut = () => {
        logOut();
    }


    const SubMenuLogin = viewer.id && viewer.avatar ? (
        <SubMenu key={viewer.id} title={
            <Avatar 
                src={viewer.avatar} 
                icon={<UserOutlined />}
                crossOrigin="anonymous"
            />
        }>
            <Item key="/user">
                <Link to={`/user/${viewer.id}`}>
                    <UserOutlined className="mr-2" />
                    Profile
                </Link>
            </Item>
            <Item key="/logout">
                <div onClick={handleLogOut}>
                    <LogoutOutlined className="mr-2" />
                    Logout
                </div>
            </Item>
        </SubMenu>
    ) : (
        <Item>
                <Link to="/login">
                    <Button type="primary">Sign in</Button>
                </Link>
            </Item>
    );

    return (
        <Menu mode="horizontal" selectable={false} className="menu">
            <Item key="/host">
                <Link to="/movies/test">
                    <HeartOutlined className="mr-2" />
                    Movies
                </Link>
            </Item>
            {SubMenuLogin}
        </Menu>
    )
}