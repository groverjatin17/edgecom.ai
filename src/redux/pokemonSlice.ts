import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonApiResponse } from '../types/PokemonType';
import _ from 'lodash';

interface PokemonState {
    currentPage: number;
    pageSize: number;
    searchString: string;
    allPokemons: PokemonApiResponse[];
}

const initialPokemonState: PokemonState = {
    currentPage: 1,
    pageSize: 5,
    searchString: '',
    allPokemons: [],
};

export const pokemonSlice = createSlice({
    name: 'pokemonReducer',
    initialState: initialPokemonState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
        setSearchString: (state, action: PayloadAction<string>) => {
            state.searchString = action.payload;
        },
        listOfPokemons: (
            state,
            action: PayloadAction<PokemonApiResponse[]>
        ) => {
            const tempData = JSON.parse(JSON.stringify(state.allPokemons));
            state.allPokemons = [...tempData, ...action.payload];
        },
        editPokemon: (state, action: PayloadAction<PokemonApiResponse>) => {
            const tempList = state.allPokemons.map(
                (pokemon: PokemonApiResponse) => {
                    if (pokemon.id === action.payload.id) {
                        return action.payload;
                    }
                    return pokemon;
                }
            );

            state.allPokemons = tempList;
        },
        addPokemon: (state, action: PayloadAction<PokemonApiResponse>) => {
            const tempList = state.allPokemons.map(
                (pokemon: PokemonApiResponse) => {
                    if (pokemon.id === action.payload.id) {
                        return action.payload;
                    }
                    return pokemon;
                }
            );

            tempList.unshift(action.payload);
            state.allPokemons = tempList;
        },
        deletePokemonAction: (state, action: PayloadAction<number>) => {
            const tempList: PokemonApiResponse[] = JSON.parse(
                JSON.stringify(state.allPokemons)
            );

            const indexFound = state.allPokemons.findIndex(
                (pokemon: PokemonApiResponse) => pokemon.id === action.payload
            );

            tempList.splice(indexFound, 1);

            state.allPokemons = tempList;
        },
        sortPokemons: (state, action: PayloadAction<PokemonApiResponse[]>) => {
            state.allPokemons = [...action.payload];
        },
    },
});

export const {
    setCurrentPage,
    setPageSize,
    setSearchString,
    editPokemon,
    deletePokemonAction,
    listOfPokemons,
    addPokemon,
    sortPokemons,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
