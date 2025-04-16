import React from "react";
import { Input, Layout, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Content } = Layout;

export const Home = () => {
    const navigate = useNavigate();

    const handleSearch = (input: string) => {
        navigate(`/movies/${input}`);
    }

    return (
        <Content>
            <Row gutter={12} justify="space-between" className="mt-[20px]">
                <Col xs={24}>
                    <h1 className="text-center">Search and add movies to your list!</h1>
                </Col>
                <Col xs={24} className="justify-center flex">
                    <Search onSearch={handleSearch} className="max-w-[50%] mx-auto" placeholder="Type a title" enterButton/>
                </Col>
            </Row>
        </Content>
    )
}