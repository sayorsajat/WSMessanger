import { Button, Container, FormControl, Grid, Input, InputLabel, Link } from '@mui/material';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { setUser, setIsAuthenticated } from '../redux/action-creators/user'

const Auth = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(userName, password)
            } else {
                data = await registration(userName, password);
            }
            const dataa = {...data}
            dispatch(setUser(dataa));
            dispatch(setIsAuthenticated());
            navigate(HOME_ROUTE);
        } catch (error) {
            alert(error.response.data.message)
        }
    }

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
                    <form onSubmit={e => e.preventDefault()}>
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
                                    <span>Don't have account yet? <Link color="inherit" style={{fontSize: '1rem', marginBottom: '2px'}} component={"button"} type="button" onClick={() => {navigate(REGISTRATION_ROUTE)}}>How dare you!</Link></span>
                                </Grid>
                                <Grid item>
                                    <Button type='submit' color='inherit' variant='text' onClick={handleSubmit}>log in</Button>
                                </Grid>
                            </Grid>
                        :
                            <Grid style={{marginTop: '15px', justifyContent: 'space-between'}} container>
                                <Grid item style={{marginTop: '6px'}}>
                                    <span>Already have account? <Link color="inherit" style={{fontSize: '1rem', marginBottom: '2px'}} component={"button"} type="button" onClick={() => {navigate(LOGIN_ROUTE)}}>God bless you!</Link></span>
                                </Grid>
                                <Grid item>
                                    <Button type='submit' color='inherit' variant='text' onClick={handleSubmit}>registrate</Button>
                                </Grid>
                            </Grid>
                        }
                    </form>
                    
                </Grid>
            </Grid>
        </Container>
    );
};

export default connect(null, null)(Auth);