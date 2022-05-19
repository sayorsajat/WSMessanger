import React from 'react';
import { Box, createTheme, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

const NavBar = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{flexGrow: 1}}>
            
            </Box>
        </ThemeProvider>
    );
};

export default NavBar;