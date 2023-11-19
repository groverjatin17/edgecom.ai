import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EdgecomIcon from '../assets/icons/edgecom.svg';
import { Link, useNavigate } from 'react-router-dom';
import { toggleUserStatus } from '../redux/mainSlice';
import { useDispatch } from 'react-redux';
import { useApi } from '../hooks/useApi';
import { IUser } from '../types';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: response, isLoading, error, fetchData } = useApi<IUser>();
    const {
        data: listOfUsers,
        isLoading: getUserIsLoading,
        error: getUserError,
        fetchData: getUserData,
    } = useApi<Array<IUser>>();

    useEffect(() => {
        getUserData('http://localhost:8000/users', {
            method: 'GET',
        });
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = listOfUsers?.find(
            (user: IUser) => user.email === data.get('email')
        );
        console.log('🚀 ~ file: SignUp.tsx:43 ~ handleSubmit ~ user:', user);

        if (user)
            toast.warn('User is already registered, Please Login Instead', {
                position: toast.POSITION.TOP_CENTER,
            });
        if (data.get('password') === data.get('confirmpassword')) {
            fetchData('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email: data.get('email'),
                    password: data.get('password'),
                    id: Math.floor(Math.random() * 10),
                },
            })
                .then(() => {
                    dispatch(toggleUserStatus());
                    navigate('/');
                })
                .catch((error) => console.log('error', error));
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
                        Sign Up
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <Typography
                                    component="p"
                                    sx={{ fontSize: '14px', fontWeight: 500 }}
                                >
                                    Sign Up
                                </Typography>
                            )}
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {'Already have an account?'} &nbsp;
                            <Link to="/login">Login</Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
