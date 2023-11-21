import { useDispatch, useSelector } from 'react-redux';
import { Fragment} from 'react';
import { setCurrentPage } from '../redux/pokemonSlice';
import { RootState } from '../redux/store';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { Box, IconButton } from '@mui/material';
export default function Pagination() {
    const dispatch = useDispatch();
    const currentPage = useSelector(
        (state: RootState) => state.pokemonReducer.currentPage
    );
    return (
        <Fragment>
            <Box
                component={'div'}
                sx={{
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        if (currentPage)
                            dispatch(setCurrentPage(currentPage - 1));
                    }}
                    sx={{
                        backgroundColor: 'lightgrey',
                        margin: 2,
                    }}
                    disabled={currentPage === 1}
                >
                    <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                    sx={{
                        backgroundColor: 'lightgrey',
                    }}
                >
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        </Fragment>
    );
}
