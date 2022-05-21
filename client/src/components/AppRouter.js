import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const isAuth = useSelector((state) => state.user.isAuthenticated);

    return isAuth ? (
        <Routes>
            <Route path="/*" element={<Navigate replace to={HOME_ROUTE} />} />
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}
        </Routes>
    )
    :
    (
        <Routes>
            <Route path="/*" element={<Navigate replace to={LOGIN_ROUTE} />} />
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}
        </Routes>
    )
};

export default connect()(AppRouter);