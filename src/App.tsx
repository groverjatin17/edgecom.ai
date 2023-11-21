import { Button, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthenticationHOC from './components/AuthenticationHOC';
import PokemonTableContainer from './components/PokemonTable';
import { toggleCurrentMode, toggleUserStatus } from './redux/mainSlice';
import { setSearchString } from './redux/pokemonSlice';
import { RootState } from './redux/store';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentTheme = useSelector(
        (state: RootState) => state.userReducer.currentTheme
    );
    const searchString = useSelector(
        (state: RootState) => state.pokemonReducer.searchString
    );
    const handleSearch = (e: any) => {
        dispatch(setSearchString(e.target.value));
    };
    const isMobile = window.innerWidth < 786;

    return (
        <AuthenticationHOC>
            <div>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        margin: '20px 30px 0 40px',
                    }}
                >
                    <TextField
                        id="search"
                        label="Search"
                        variant="standard"
                        name="search"
                        value={searchString}
                        onChange={(e) => {
                            handleSearch(e);
                        }}
                    />
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: isMobile ? 'space-between' : 'end',
                            margin: '20px 30px 0 0',
                        }}
                    >
                        <IconButton
                            sx={{ ml: 1 }}
                            onClick={() => dispatch(toggleCurrentMode())}
                            color="inherit"
                        >
                            {currentTheme === 'dark' ? (
                                <Brightness7Icon />
                            ) : (
                                <Brightness4Icon />
                            )}
                        </IconButton>
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
                </Box>
                <PokemonTableContainer />
            </div>
        </AuthenticationHOC>
    );
};

export default App;
