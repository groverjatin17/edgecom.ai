import { Fragment, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Ability, PokemonApiResponse } from '../types/PokemonType';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import { Button } from '@mui/material';
import AbilitySelect from '../components/AbilitySelect';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationHOC from '../components/AuthenticationHOC';
import NavBar from '../components/NavBar';
import { addPokemon } from '../redux/pokemonSlice';
import { RootState } from '../redux/store';

const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};
interface Pokemon {
    name: string;
    weight: number;
    abilities: Ability[];
}
export default function AddPokemon() {
    const [navigateToHome, setNavigateToHome] = useState<boolean>(false);
    const dispatch = useDispatch();
    const allPokemons = useSelector(
        (state: RootState) => state.pokemonReducer.allPokemons
    );
    const [pokemon, setPokemon] = useState<Pokemon>({
        name: '',
        weight: 0,
        abilities: [
            { ability: { name: '', url: '' }, isHidden: false, slot: 0 },
        ],
    });

    const handleChange = (e: any) => {
        let tempPokemon: Pokemon = { ...pokemon };
        if (e.target.name === 'name') {
            tempPokemon.name = e.target.value;
        } else if (e.target.name === 'weight') {
            tempPokemon.weight = e.target.value;
        }
        setPokemon(tempPokemon);
    };
    const handleSubmit = () => {
        const tempList: PokemonApiResponse[] = JSON.parse(
            JSON.stringify(allPokemons)
        );
        const tempPokemon: PokemonApiResponse = { ...tempList[0] };
        tempPokemon.name = pokemon.name;
        tempPokemon.weight = pokemon.weight;
        tempPokemon.abilities = pokemon.abilities;
        tempPokemon.id = Math.floor(Math.random() * 10000);
        dispatch(addPokemon(tempPokemon));
        setNavigateToHome(true);
    };
    const handleSelected = (values: string[]) => {
        let tempPokemon: Pokemon = { ...pokemon };
        const formatAbilities = values.map((item) => {
            return {
                ability: {
                    name: item,
                    url: 'https://pokeapi.co/api/v2/ability/',
                },
                isHidden: false,
                slot: 1,
            };
        });
        tempPokemon.abilities = formatAbilities;
        setPokemon({ ...pokemon, abilities: formatAbilities });
    };
    return (
        <Fragment>
            {navigateToHome && <Navigate to="/" replace={true} />}
            <Box
                component="div"
                sx={{
                    height: '100vh',
                }}
            >
                <NavBar />
                <Box
                    component="div"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        ...flex,
                        height: '50%',
                    }}
                >
                    <Box sx={{ ...flex }}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={pokemon?.name}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <TextField
                            id="weight"
                            name="weight"
                            label="Weight"
                            type="text"
                            variant="standard"
                            value={pokemon?.weight}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <AbilitySelect
                            abilities={[]}
                            handleSelected={handleSelected}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            marginTop: '20px',
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
}
