import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EdgecomIcon from '../assets/icons/edgecom.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { IUser } from '../types';
import { useDispatch } from 'react-redux';
import { toggleUserStatus } from '../redux/mainSlice';
import LoadingBackdrop from '../components/LoadingBackdrop';
import { useEffect } from 'react';
const theme = createTheme();

export default function SignIn() {
    const { data: listOfUsers, isLoading, error, fetchData } = useApi<Array<IUser>>();

    useEffect(() => {
        fetchData('http://localhost:8000/users', {
            method: 'GET',
        });
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (error) console.error('There was an Error');
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //TODO: Technically the logic of whether the username is present should be in backend.
        //We will just mock the login functionality just for the sake of it.

        const currentUser = listOfUsers?.find(
            (user: IUser) => user.email === data.get('email')
        );

        if (currentUser?.password === data.get('password')) {
            dispatch(toggleUserStatus());
            navigate('/');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <LoadingBackdrop isOpen={isLoading} />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={EdgecomIcon} width={24} height={28} />
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {"Don't have an account? "} &nbsp;
                            <Link to="/signUp">Register</Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
