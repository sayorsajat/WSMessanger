import { Button, CircularProgress, Container, FormControl, Grid, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loadMessages, loadRooms } from '../http/messageAPI';
import { setMessageList, setRoomsList } from '../redux/action-creators/message';
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

const Home = ({roomsList, messageList}) => {
    const [roomValue, setRoomValue] = useState('')
    const userId = useSelector((state) => state.user.user.id)
    const {roomId} = useSelector((state) => state.message)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [firstLoading, setFirstLoading] = useState(true)

    const handleSubmit = e => {
      e.preventDefault()
      joinRoom(userId, roomValue)
      loadRooms(userId).then(data => {
        dispatch(setRoomsList(data))
        // setRoomsStateList(data)
      })
      setRoomValue('')
    }    

    useEffect(() => {
      loadRooms(userId).then(data => {
        dispatch(setRoomsList(data))
      })
      loadMessages(roomId).then(data => {
        dispatch(setMessageList(data))
        setFirstLoading(false)
      });
      
    }, [dispatch, userId, roomId])

    return !firstLoading ? (
        <Container>
            <Grid container style={{marginTop: '10px'}}>
                <Grid item md={8} container sx={{flexDirection: 'row-reverse'}}>
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
                    <Button type='submit' color='inherit' variant='text'>join</Button>
                  </form>
                </Grid>
            </Grid>
            <Grid container>
              <Grid item style={{display: 'flex'}}>
                <Grid item xs={2} style={{width: '200px'}}>
                  <List dense
                    style={{display: 'block', maxWidth: '250px'}}
                    sx={{width: '100%', maxWidth: 180, bgcolor: 'Background.paper'}}
                    component="nav"
                  >
                    {roomsList.map(room =>
                      <ListItemButton style={{width: '120px'}} key={room.id}>
                          <ListItemText key={room.id} primary={`${room.roomId}`} />
                      </ListItemButton>
                    )}
                  </List>
                </Grid>
                <Grid item style={{marginLeft: '15px', marginTop: '12px'}}>
                  {messageList.map(message =>
                    <Grid item md={12} key={message.id} style={{width: '70vw', maxHeight: '100px'}}>
                      <Grid item style={{height: '30px', minHeight: '20px', maxHeight: '100px'}} key={message.id}>{message.userName}: {message.content}</Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
                
            </Grid>
        </Container>
    )
    :
    (
      <CircularProgress />
    )
};

const mapStateToProps = (state) => {
  return {
    roomsList: state.message.roomsList,
    messageList: state.message.messageList
  }
}

export default connect(mapStateToProps, null)(Home);