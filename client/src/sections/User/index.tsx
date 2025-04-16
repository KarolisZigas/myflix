import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER } from "../../lib/graphql/queries";
import { UserQuery as UserData, UserQueryVariables } from "../../generated/graphql";
import { Col, Layout, Row } from 'antd';
import { UserProfile, UserMovies } from "./components";
import { Viewer } from "../../lib/types";
import { PageSkeleton, ErrorBanner } from "../../lib/components";

const { Content } = Layout;

const PAGE_LIMIT = 4;

interface Props {
    viewer: Viewer;
}

export const User = (
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
                console.log()
            }
        }
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
    const viewerIsUser = viewer.id === params.id; 

    const userMovies = user ? user.savedMovies : null;
        
    const userProfileElement = user ? (
        <UserProfile user={user} viewerIsUser={viewerIsUser}/>
    ) : null;

    const userMoviesElement = userMovies ? (
        <UserMovies 
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
                    {userProfileElement}
                </Col>
                <Col xs={24}>
                    {userMoviesElement}
                </Col>
            </Row>
        </Content>
    )
}