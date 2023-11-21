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
import { IUser } from '../types/userTypes';
import { useDispatch } from 'react-redux';
import { toggleUserStatus } from '../redux/mainSlice';
import LoadingBackdrop from '../components/LoadingBackdrop';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Controller, FieldValues, useForm } from 'react-hook-form';

type FormValues = {
    email: string;
    password: string;
};
export default function SignIn() {
    const {
        data: listOfUsers,
        isLoading,
        error,
        fetchData,
    } = useApi<Array<IUser>>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<FormValues>();

    useEffect(() => {
        fetchData('http://localhost:8000/users', {
            method: 'GET',
        });
    }, []);

    const onSubmit = (data: FieldValues) => {
        //TODO: Technically the logic of whether the username is present should be in backend.
        //We will just mock the login functionality just for the sake of it.

        const currentUser = listOfUsers?.find(
            (user: IUser) => user.email === data.email
        );

        if (!currentUser) {
            toast.warn('Email not found, Please check again', {
                position: toast.POSITION.TOP_CENTER,
                toastId: 2,
            });
        }
        if (currentUser?.password === data.password) {
            dispatch(toggleUserStatus());
            navigate('/');
        } else {
            toast.warn('Please enter a valid password to login', {
                position: toast.POSITION.TOP_CENTER,
                toastId: 1,
            });
        }
    };

    return (
        <>
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
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i,
                                    message: 'Please enter valid email',
                                },
                            }}
                            defaultValue=""
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    helperText={error ? error.message : null}
                                    error={!!error}
                                    onChange={onChange}
                                    value={value}
                                    margin="normal"
                                    fullWidth
                                    label="Email Address"
                                    autoFocus
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Password is required',
                            }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    helperText={error ? error.message : null}
                                    error={!!error}
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    onChange={onChange}
                                    value={value}
                                    type="password"
                                />
                            )}
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
                            <Link to="/signUp">
                                <Button variant="text">Register</Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
