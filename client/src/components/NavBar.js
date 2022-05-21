import React from 'react';
import { Button, createTheme, Grid, Link, ThemeProvider } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { LOGIN_ROUTE } from '../utils/consts';
import { connect, useDispatch, useSelector } from 'react-redux';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})


const NavBar = () => {
  
  const dispatch = useDispatch()

  const isAuth = useSelector((state) => {
    return state.user.isAuthenticated
  })

  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{flexGrow: 1}}>
              <AppBar position="static">
                  <Toolbar>
                    <Grid container sx={{flexDirection: 'row-reverse'}}>
                      {isAuth ?
                        <Link
                          style={{textDecoration: 'none', color: 'inherit'}}
                        >
                          <Button color='inherit' variant='standard'>Log out</Button>
                        </Link>
                      :
                        <Link
                          to={LOGIN_ROUTE}
                          style={{textDecoration: 'none', color: 'inherit'}}
                        >
                          <Button color='inherit' variant='standard'>Login</Button>
                        </Link>
                      }
                    </Grid>
                  </Toolbar>
              </AppBar>
          </Box>
      </ThemeProvider>
  );
};

export default connect(null, null)(NavBar);