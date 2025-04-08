import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import { Card, Layout, Spin, Typography } from 'antd'
import { Viewer } from '../../lib/types';
import { ErrorBanner } from "../../lib/components";
import { LOG_IN } from "../../lib/graphql/mutations";
import { AUTH_URL } from "../../lib/graphql/queries/AuthUrl";
import { AuthUrlQuery as AuthUrlData, LogInMutation as LogInData, LogInMutationVariables } from "../../generated/graphql";
import { 
    displaySuccessNotification,
    displayErrorMessage
} from "../../lib/utils";

import googleLogo from "./assets/google_logo.jpg"

interface Props {
    setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = ({ setViewer }: Props ) => {
    const client = useApolloClient();
    const [
        logIn, 
        { 
            data: logInData, 
            loading: logInLoading, 
            error: logInError 
        }
    ] = useMutation<LogInData, LogInMutationVariables>(LOG_IN, {
        onCompleted: (data) => {
            if (data && data.logIn && data.logIn.token) {
                setViewer(data.logIn as Viewer);
                sessionStorage.setItem("token", data.logIn.token);
                displaySuccessNotification("You've successfully logged in!");
            }
        }
    });

    const logInRef = useRef(logIn);

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');

        if (code) {
            logInRef.current({
                variables: {
                    input: { code }
                }
            })
        }
    }, []);

    const handleAuthorize = async () => {
        try {
            const { data } = await client.query<AuthUrlData>({
                query: AUTH_URL
            })
            window.location.href = data.authUrl;
        } catch (error) {
            displayErrorMessage("Sorry! We weren't able to log you in. Please try again later.")
        }
    }

    if (logInLoading) {
        return (
            <Content className="log-in">
                <div className="flex flex-col items-center justify-center min-h-[200px] rounded-md">
                    <Spin size="large" tip="Logging you in...">
                        <div className="h-32 w-full" />
                    </Spin>
                </div>
            </Content>
        )
    }

    const logInErrorBannerElement = logInError ? (
        <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later."/>
    ) : null;

    if (logInData && logInData.logIn) {
        const { id: viewerId } = logInData.logIn;
        return <Navigate to={`/user/${viewerId}`} replace/>
    }

    return (
        <Content className="log-in">
            {logInErrorBannerElement}
            <Card className="log-in-card">
                <div className="log-in-card__intro">
                    <Title level={3} className="log-in-card__intro-title">
                        <span role="img" aria-label="wave">👋</span>
                    </Title>
                    <Title level={3} className="log-in-card__intro-title">
                        Log in to Myflix!
                    </Title>
                    <Text>
                        Sign in with Google to start saving your favorite movies!
                    </Text>
                </div>
                <button onClick={handleAuthorize} className="log-in-card__google-button">
                    <img src={googleLogo} alt="Google Logo" className="log-in-card__google-button-logo" />
                    <span className="log-in-card__google-button-text">
                        Sign in with Google
                    </span>
                </button>
                <Text type="secondary">
                    Note: By signing in, you'll be redirected to the Google 
                    consent form to sign in with your Google account
                </Text>
            </Card>
        </Content>
    )
} 