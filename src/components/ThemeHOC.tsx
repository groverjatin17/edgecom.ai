import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function ThemeHOC({ children }: { children: ReactNode }) {
    const currentTheme = useSelector(
        (state: RootState) => state.userReducer.currentTheme
    );

    const theme = createTheme({
        palette: {
            mode: currentTheme,
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </>
    );
}
