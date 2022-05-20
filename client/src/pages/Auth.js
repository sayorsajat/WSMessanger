import { Button, Container, FormControl, Grid, IconButton, Input, InputLabel, Link, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    return (
        <Container>
            <Grid container
                style={{height: window.innerHeight - 50}}
                alignItems="center"
                justifyContent="center"
            >
                <Grid container
                    style={{width: '40vw'}}
                    alignItems="center"
                    direction="column"
                >
                    <FormControl fullWidth variant='standard'>
                        <InputLabel>nickname</InputLabel>
                        <Input fullWidth
                            type='text'
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value)
                                console.log(userName)
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth variant='standard'>
                        <InputLabel>password</InputLabel>
                        <Input fullWidth
                            type='text'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                console.log(userName)
                            }}
                        />
                    </FormControl>
                        { isLogin ?
                            <Grid style={{marginTop: '15px', justifyContent: 'space-between'}} container>
                                <Grid item style={{marginTop: '6px'}}>
                                    <span>Don't have account yet? <Link color="inherit" style={{fontSize: '1rem', marginBottom: '2px'}} component={"button"} onClick={() => {navigate(REGISTRATION_ROUTE)}}>How dare you!</Link></span>
                                </Grid>
                                <Grid item>
                                    <Button color='inherit' variant='text'>log in</Button>
                                </Grid>
                            </Grid>
                        :
                            <Grid style={{marginTop: '15px', justifyContent: 'space-between'}} container>
                                <Grid item style={{marginTop: '6px'}}>
                                    <span>Already have account? <Link color="inherit" style={{fontSize: '1rem', marginBottom: '2px'}} component={"button"} onClick={() => {navigate(LOGIN_ROUTE)}}>God bless you!</Link></span>
                                </Grid>
                                <Grid item>
                                    <Button color='inherit' variant='text'>registrate</Button>
                                </Grid>
                            </Grid>
                        }
                </Grid>
            </Grid>
        </Container>
    );
};

export default Auth;