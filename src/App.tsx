import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthenticationHOC from './components/AuthenticationHOC';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { toggleUserStatus } from './redux/mainSlice';
import { RootState } from './redux/store';

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    return (
        <AuthenticationHOC>
            <div>
                <Link to="/login">Login Page</Link>
                <Link to="/signUp">Registration Page</Link>
                <h1>This is the Homepage</h1>
                <button
                    onClick={() => {
                        dispatch(toggleUserStatus());
                    }}
                >
                    Sign Out
                </button>
            </div>
        </AuthenticationHOC>
    );
};

export default App;
