import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/errorPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { persistor, store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import EditPokemon from './pages/EditPokemon';
import AddPokemon from './pages/AddPokemon';
import ThemeHOC from './components/ThemeHOC';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';

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
    {
        path: 'editPokemon/:pokemonId',
        element: <EditPokemon />,
    },
    {
        path: 'addPokemon',
        element: <AddPokemon />,
    },
]);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeHOC>
                <RouterProvider router={router} />
            </ThemeHOC>
            <ToastContainer />
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
