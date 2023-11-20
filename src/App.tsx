import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthenticationHOC from './components/AuthenticationHOC';
import PokemonTableContainer from './components/PokemonTable';
import { toggleUserStatus } from './redux/mainSlice';
import { setSearchString } from './redux/pokemonSlice';
import { RootState } from './redux/store';

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
