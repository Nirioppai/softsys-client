import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  adminId: string;
  exp: number;
  iat: number;
  permissions: string[];
  role: string;
  type: string;
  _id: string;
}

const ProtectedAdminRoute: FC<RouteProps> = (props) => {
  const token = localStorage.getItem('token');
  const decodedToken: DecodedToken | null = token ? jwt_decode(token) : null;

  return decodedToken?.role === 'Super-admin' ? (
    <Route {...props} />
  ) : (
    <Redirect to='/' />
  );
};

export default ProtectedAdminRoute;
