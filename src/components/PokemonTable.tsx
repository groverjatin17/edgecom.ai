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
            dispatch(listOfPokemons({ page: currentPage, data: result }));
            setLoading(false);
        }
    };

    useEffect(() => {
        const page: any = allPokemons.find(
            (item) => item.page === Number(currentPage)
        );
        async function fetchData() {
            let response: any = await getAllPokemon(
                `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${
                    currentPage * pageSize
                }`
            );
            await fetchPokemonProfile(response.results);
        }
        if (!page) {
            setLoading(true);
            fetchData();
        }
    }, [currentPage, pageSize]);

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
