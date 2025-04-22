import { Col, Row, Typography, Space, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Viewer } from '../../../../lib/types';
import { CameraOutlined } from '@ant-design/icons';

const { Text } = Typography

interface Props {
    viewer: Viewer
}

export const UserLists = ({ viewer }: Props) => {
    const params = useParams();

    return (
        <Row gutter={16} justify={'center'}>
            <Col span={8}>
                <Link to={`/user/${params.id}/movies`}>
                    <Space.Compact direction="vertical">
                        <Button>
                            <Space align='center' >
                                <CameraOutlined style={{ fontSize: '24px' }} />
                                <Text>Movies</Text>
                            </Space>
                        </Button>
                        <Button>
                            <Space align='center' >
                                <CameraOutlined style={{ fontSize: '24px' }} />
                                <Text>Movies</Text>
                            </Space>
                        </Button>
                        <Button>
                            <Space align='center' >
                                <CameraOutlined style={{ fontSize: '24px' }} />
                                <Text>Movies</Text>
                            </Space>
                        </Button>
                    </Space.Compact>
                </Link>
            </Col>
        </Row>
    )
}