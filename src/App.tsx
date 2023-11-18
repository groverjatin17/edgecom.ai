import { Link } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
    return (
        <div>
            <Link to="/login">Login Page</Link>
            <Link to="/signUp">Registration Page</Link>
            <h1>This is the Homepage</h1>
        </div>
    )
}

export default App
