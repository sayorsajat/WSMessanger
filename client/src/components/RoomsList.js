import { Grid, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';

const RoomsList = () => {
    const roomsList = useSelector((state) => state.message.roomsList)

    return (
        <Grid container>
            
        </Grid>
    );
};

export default connect()(RoomsList);