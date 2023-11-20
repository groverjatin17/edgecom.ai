import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthenticationHOC from './components/AuthenticationHOC';
import PokemonTableContainer from './components/PokemonTable';
import { toggleUserStatus } from './redux/mainSlice';

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <AuthenticationHOC>
            <div>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        margin: '20px 30px 0 0',
                    }}
                >
                    <Button
                        onClick={() => {
                            navigate('/addPokemon');
                        }}
                    >
                        Add Pokemon
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(toggleUserStatus());
                        }}
                    >
                        Sign Out
                    </Button>
                </Box>
                <PokemonTableContainer />
            </div>
        </AuthenticationHOC>
    );
};

export default App;
