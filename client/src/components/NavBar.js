import React, { useState } from 'react';
import { Button, createTheme, Grid, Link, ThemeProvider } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import { LOGIN_ROUTE } from '../utils/consts';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));

const NavBar = () => {
  const [roomValue, setRoomValue] = useState('')
  const user = true;

  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{flexGrow: 1}}>
              <AppBar position="static">
                  <Toolbar>
                    <Grid container sx={{flexDirection: 'row-reverse'}}>
                      {user ?
                        <Search>
                          <SearchIconWrapper>
                              <SearchIcon />
                          </SearchIconWrapper>
                          <StyledInputBase
                              placeholder="Room id"
                              inputProps={{ 'aria-label': 'search' }}
                              value={roomValue}
                              onChange={e => {
                                setRoomValue(e.target.value)
                                console.log(roomValue)
                              }}
                          />
                        </Search>
                      :
                        <Link
                        to={LOGIN_ROUTE}
                        style={{textDecoration: 'none', color: 'inherit'}}
                        >
                          <Button color='inherit' variant='outlined' onClick={() => console.log('login')}>Login</Button>
                        </Link>
                      }
                    </Grid>
                  </Toolbar>
              </AppBar>
          </Box>
      </ThemeProvider>
  );
};

export default NavBar;