import { Container, FormControl, Grid, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomsList from '../components/RoomsList';
import { loadMessages, loadRooms } from '../http/messageAPI';
import { setRoomsList } from '../redux/action-creators/message';
import { joinRoom } from '../http/messageAPI';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

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

const Home = () => {
    const [roomValue, setRoomValue] = useState('')
    const userId = useSelector((state) => state.user.user.id)
    const {roomId} = useSelector((state) => state.message)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [roomsStateList, setRoomsStateList] = useState([])

    const handleSubmit = e => {
      e.preventDefault()
      joinRoom(userId, roomValue)
      loadRooms(userId).then(data => dispatch(setRoomsList(data)))
      setRoomValue('')
    }

    useEffect(() => {
        loadRooms(userId).then(data => {
          dispatch(setRoomsList(data))
          setRoomsStateList(data)
        })
        loadMessages(roomId).then(data => setMessages(data));
    }, [roomId])

    return (
        <Container>
            <Grid style={{marginTop: '10px'}}>
                <Grid item container sx={{flexDirection: 'row-reverse'}}>
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          type='text'
                          placeholder="Room id"
                          inputProps={{ 'aria-label': 'search' }}
                          value={roomValue}
                          onChange={e => {
                              setRoomValue(e.target.value)
                              console.log(roomValue)
                          }}
                        />
                      </Search>
                    </FormControl>
                  </form>
                </Grid>
                <Grid item style={{display: 'flex', width: '200px'}}>
                  <List container="true"
                    style={{display: 'flex'}}
                    sx={{width: '100%', maxWidth: 180, bgcolor: 'Background.paper'}}
                    component="nav"
                  >
                    {roomsStateList.map(room =>
                      <ListItemButton key={room.id}>
                          <ListItemText key={room.id} primary={`${room.id}`} />
                      </ListItemButton>
                    )}
                  </List>
                </Grid>
                <Grid item container style={{}}>

                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;