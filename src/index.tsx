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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPokemon from './pages/EditPokemon';
import AddPokemon from './pages/AddPokemon';

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
        <RouterProvider router={router} />
        <ToastContainer />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
