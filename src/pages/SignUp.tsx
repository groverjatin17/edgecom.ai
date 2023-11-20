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
import { IUser } from '../types/userTypes';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Controller, FieldValues, useForm } from 'react-hook-form';

const theme = createTheme();
type FormValues = {
    email: string;
    password: string;
    confirmpassword: string;
};

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm<FormValues>();
    const { data: response, isLoading, error, fetchData } = useApi<IUser>();
    const {
        data: listOfUsers,
        fetchData: getUserData,
    } = useApi<Array<IUser>>();

    useEffect(() => {
        getUserData('http://localhost:8000/users', {
            method: 'GET',
        });
    }, []);

    const onSubmit = (data: FieldValues) => {
        const user = listOfUsers?.find(
            (user: IUser) => user.email === data.email
        );

        if (user)
            toast.warn('User is already registered, Please Login Instead', {
                position: toast.POSITION.TOP_CENTER,
            });

        if (data.password === data.confirmpassword) {
            fetchData('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email: data.email,
                    password: data.password,
                    id: Math.floor(Math.random() * 100),
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
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
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
                        <Controller
                            name="confirmpassword"
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
                                    label="Confirm Password"
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
