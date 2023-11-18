import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/errorPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import store from './redux/store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <SignIn />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/signUp',
        element: <SignUp />,
        errorElement: <ErrorPage />,
    },
]);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
