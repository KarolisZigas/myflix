import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER } from "../../lib/graphql/queries";
import { UserQuery as UserData, UserQueryVariables } from "../../generated/graphql";
import { Col, Layout, Row } from 'antd';
import { Viewer } from "../../lib/types";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { UserMoviesList } from "./components";

const { Content } = Layout;

const PAGE_LIMIT = 10;

interface Props {
    viewer: Viewer;
}

export const UserMovies = (
    { viewer }: Props
) => {
    const params = useParams();
    const [moviesPage, setMoviesPage] = useState(1);

    const { data, loading, error } = useQuery<UserData, UserQueryVariables>(USER, {
        variables: {
            id: params.id ?? "",
            moviesPage,
            limit: PAGE_LIMIT
        },
        onCompleted: (data) => {
            if (data.user) {
                console.log(data);
            }
        },
    });

    if (loading) {
        return (
            <Content className="user">
                <PageSkeleton />
            </Content>
        )
    }

    if (error) {
        return (
            <Content className="user">
                <ErrorBanner description="This user may not exist or there has been an error. Please try again later."/>
                <PageSkeleton />
            </Content>
        )
    }

    const user = data ? data.user : null;

    const userMovies = user ? user.savedMovies : null;

    const userMoviesElement = userMovies ? (
        <UserMoviesList 
            userMovies={userMovies} 
            moviesPage={moviesPage} 
            limit={PAGE_LIMIT} 
            setMoviesPage={setMoviesPage} 
        />
    ) : null;

    return (
        <Content className="user">
            <Row gutter={12} justify="space-between">
                <Col xs={24}>
                    {userMoviesElement}
                </Col>
            </Row>
        </Content>
    )
}