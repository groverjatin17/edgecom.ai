import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Ability, PokemonApiResponse } from '../types/PokemonType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Avatar, Chip, Skeleton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import DeletePokemon from '../pages/DeletePokemon';
import Button from '@mui/material/Button';
import { Box, styled } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import _ from 'lodash';
import { sortPokemons } from '../redux/pokemonSlice';
import { sliceData } from '../utils/pokemonFormatter';

const fetchAbilities = (abilities: Ability[]) => {
    return abilities.map((item: Ability) => (
        <Chip
            label={item.ability.name}
            variant="outlined"
            key={item.ability.name}
        />
    ));
};

const TableHeaderCell = styled(TableCell)({
    color: 'black',
    fontWeight: 'bold',
    background: 'lightgrey',
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
});

const Cell = styled(TableCell)({
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    textAlign: 'center',
    textTransform: 'capitalize',
});

export default function PokemonTable({ loading }: { loading: boolean }) {
    const { currentPage, allPokemons, pageSize, searchString } = useSelector(

        (state: RootState) => state.pokemonReducer
    );

    const dispatch = useDispatch();
    const [deletePokemon, setDeletePokemon] = React.useState(0);
    const [sortingOrder, setSortingOrder] = React.useState('asc');
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const sortIt = () => {
        const isAsc = sortingOrder === 'asc';
        const tempPokemons: PokemonApiResponse[] = JSON.parse(
            JSON.stringify(allPokemons)
        );

        const sortedPokemons = isAsc
            ? tempPokemons?.sort((a, b) => a.weight - b.weight)
            : tempPokemons?.sort((a, b) => b.weight - a.weight);

        dispatch(sortPokemons(sortedPokemons));
        setSortingOrder(isAsc ? 'desc' : 'asc');
    };

    let formatedPokemons = allPokemons?.filter((item) =>
    item?.name?.includes(searchString)
    );

    return (
        <React.Fragment>
            <DeletePokemon
                open={open}
                handleClose={handleClose}
                deletePokemon={deletePokemon}
            />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell align="center">
                                Pokemon
                            </TableHeaderCell>
                            <TableHeaderCell align="center">
                                Name
                            </TableHeaderCell>
                            <TableHeaderCell
                                align="center"
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                Weight{' '}
                                <Box
                                    component="span"
                                    onClick={sortIt}
                                    sx={{ display: 'flex' }}
                                >
                                    {sortingOrder === 'asc' ? (
                                        <ArrowUpwardIcon />
                                    ) : (
                                        <ArrowDownwardIcon />
                                    )}
                                </Box>
                            </TableHeaderCell>
                            <TableHeaderCell>Abilities</TableHeaderCell>
                            <TableHeaderCell align="center">
                                Edit
                            </TableHeaderCell>
                            <TableHeaderCell align="center">
                                Delete
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading
                            ? Array.from({ length: pageSize }, (x, i) => i).map(
                                  (row) => (
                                      <TableRow
                                          key={row}
                                          sx={{ width: '100%' }}
                                      >
                                          {Array.from(
                                              { length: 7 },
                                              (x, i) => i
                                          ).map((column) => (
                                              <Cell
                                                  component="th"
                                                  scope="row"
                                                  key={column}
                                              >
                                                  <Skeleton
                                                      variant="rectangular"
                                                      width="100%"
                                                      height={60}
                                                  />
                                              </Cell>
                                          ))}
                                      </TableRow>
                                  )
                              )
                            : sliceData(
                                  formatedPokemons,
                                  currentPage,
                                  pageSize
                              )?.map((row: PokemonApiResponse) => (
                                  <TableRow key={row.id}>
                                      <Cell component="th" scope="row">
                                          {row.id}
                                      </Cell>
                                      <Cell component="th" scope="row">
                                          <Avatar
                                              alt={row.name}
                                              src={
                                                  row.sprites.other.dream_world
                                                      .front_default
                                              }
                                          />
                                      </Cell>
                                      <Cell component="th" scope="row">
                                          {row.name}
                                      </Cell>
                                      <Cell align="right">{row.weight}</Cell>
                                      <Cell align="right">
                                          <Stack direction="row" spacing={1}>
                                              {fetchAbilities(row.abilities)}
                                          </Stack>
                                      </Cell>
                                      <Cell align="right">
                                          <Link to={`editPokemon/${row.id}`}>
                                              <Button variant="contained">
                                                  Edit
                                              </Button>
                                          </Link>
                                      </Cell>
                                      <Cell align="right">
                                          <Button
                                              variant="contained"
                                              onClick={() => {
                                                  handleOpen();
                                                  setDeletePokemon(row.id);
                                              }}
                                          >
                                              Delete
                                          </Button>
                                      </Cell>
                                  </TableRow>
                              ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}
