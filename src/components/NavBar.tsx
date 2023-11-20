import { Fragment, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Ability } from '../types/PokemonType';
import Box from '@mui/material/Box';
import _ from 'lodash';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleUserStatus } from '../redux/mainSlice';
import AuthenticationHOC from '../components/AuthenticationHOC';

export default function NavBar() {
    const [navigateToHome, setNavigateToHome] = useState<boolean>(false);
    const dispatch = useDispatch();
    return (
        <AuthenticationHOC>
            <Fragment>
                {navigateToHome && <Navigate to="/" replace={true} />}
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '50%',
                            margin: 'auto',
                            marginTop: '50px',
                        }}
                    >
                        <Button onClick={() => setNavigateToHome(true)}>
                            Back to Dashboard
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(toggleUserStatus());
                            }}
                        >
                            Sign Out
                        </Button>
                </Box>
            </Fragment>
        </AuthenticationHOC>
    );
}
