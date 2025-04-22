import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { USER } from '../../graphql/queries';
import { UserQuery, UserQueryVariables } from '../../../generated/graphql';
import { Spin } from 'antd';

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const sessionToken = sessionStorage.getItem('token');
  const params = useParams();

  const { data, loading } = useQuery<UserQuery, UserQueryVariables>(USER, {
    variables: {
      id: params.id ?? "",
      moviesPage: 1,
      limit: 1
    },
    skip: !sessionToken
  });

  if (!sessionToken) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (data && !data.user?.authorized) {
    return <Navigate to="/login" />;
  }

  if (data?.user?.authorized) {
    return <>{children}</>;
  }

  return <Spin size="large" tip="Authenticating..." />;
};