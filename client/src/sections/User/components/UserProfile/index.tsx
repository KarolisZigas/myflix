import React, { Fragment } from 'react';
import { UserQuery as UserData } from '../../../../generated/graphql';
import { Avatar, Button, Card, Divider, Typography } from 'antd';

interface Props {
    user: UserData["user"];
    viewerIsUser: boolean;
}

const { Paragraph, Text, Title } = Typography;

export const UserProfile = ({ user, viewerIsUser }: Props) => {

    const additionalDetailsSection = viewerIsUser ? (
        <Fragment>
            <Divider />
            <div className="user-profile__details">
                <Title level={4}>
                    Additional Details
                </Title>
                <Paragraph>
                    Interested in becoming a Host?
                </Paragraph>
                <Button type="primary" className='user-profile__details-cta'>
                    Connect
                </Button>
                <Paragraph type='secondary'>
                    TinyHouse uses lalala
                </Paragraph>
            </div>
        </Fragment>
    ) : null;

    return (
        <div className='user-profile'>
            <Card className='user-profile__card'>
                <div className='user-profile__avatar'>
                    <Avatar size={100} src={user.avatar} />
                </div>
                <Divider />
                <div className="user-profile__details">
                    <Title level={4}>Details</Title>
                    <Paragraph>
                        Name: <Text strong>{user.name}</Text>
                    </Paragraph>
                    <Paragraph>
                        Contact: <Text strong>{user.contact}</Text>
                    </Paragraph>
                </div>
                {additionalDetailsSection}
            </Card>
        </div>
    );
}