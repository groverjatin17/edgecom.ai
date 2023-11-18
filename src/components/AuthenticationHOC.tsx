import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface AuthenticationHOCProps {
    children: React.ReactNode;
}
export default function AuthenticationHOC({
    children,
}: AuthenticationHOCProps) {
    const isUserAuthenticated = useSelector(
        (state: RootState) => state.userReducer.isUserAuthenticated
    );
    return (
        <>
            {isUserAuthenticated ? (
                children
            ) : (
                <Navigate to="/login" replace={true} />
            )}
        </>
    );
}
