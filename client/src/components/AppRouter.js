import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const user = true
    return (
        <Routes>
            <Route path="/*" element={<Navigate replace to={LOGIN_ROUTE} />} />
            {publicRoutes.map((path, Component) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {user == true && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}
        </Routes>
    );
};

export default AppRouter;