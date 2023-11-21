import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon, fetchPokemons } from '../utils/pokemonFormatter';
import { Fragment, useEffect, useState } from 'react';
import { listOfPokemons } from '../redux/pokemonSlice';
import { PokemonType } from '../types/PokemonType';
import Table from './Table';
import { RootState } from '../redux/store';
import { Box } from '@mui/material';
import Pagination from './Pagination';

export default function PokemonTableContainer() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const currentPage = useSelector(
        (state: RootState) => state.pokemonReducer.currentPage
    );

    const pageSize = useSelector(
        (state: RootState) => state.pokemonReducer.pageSize
    );
    const allPokemons = useSelector(
        (state: RootState) => state.pokemonReducer.allPokemons
    );

    const fetchPokemonProfile = async (data: PokemonType[]) => {
        let result: any = await Promise.all(
            data.map(async (pokemon: PokemonType) => {
                let pokemonRecord = await fetchPokemons(pokemon);
                return pokemonRecord;
            })
        );

        if (result) {
            dispatch(listOfPokemons(result));
            setLoading(false);
        }
    };

    const calculateTotalPages = allPokemons.length / pageSize;
    async function fetchData() {
        let response: any = await getAllPokemon(
            `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${
                (currentPage - 1) * pageSize
            }`
        );

        await fetchPokemonProfile(response.results);
    }

    useEffect(() => {
        if (currentPage > calculateTotalPages) {
            setLoading(true);

            fetchData();
        }
    }, [currentPage]);

    return (
        <Fragment>
            <Box
                sx={{
                    padding: '20px',
                    margin: '20px',
                }}
            >
                <Table loading={loading} />
            </Box>
            <Pagination />
        </Fragment>
    );
}
