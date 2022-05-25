import { Button, CircularProgress, Container, FormControl, Grid, Input, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loadMessages, loadRooms, sendMessage } from '../http/messageAPI';
import { setMessageList, setRoomId, setRoomsList } from '../redux/action-creators/message';
import { joinRoom } from '../http/messageAPI';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import io from 'socket.io-client';

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

const socket = io.connect('http://localhost:5000')
const Home = ({roomsList, messageList}) => {
    const [roomValue, setRoomValue] = useState('')
    const userId = useSelector((state) => state.user.user.id)
    const userName = useSelector((state) => state.user.user.userName)
    const messageReduxList = useSelector((state) => state.message.messageList)
    const dispatch = useDispatch()
    const [firstLoading, setFirstLoading] = useState(true)
    const [currentMessage, setCurrentMessage] = useState('')
    const [received, setReceived] = useState('')
    const [roomId, setRoomId] = useState('1')

    const handleSubmit = e => {
      e.preventDefault()
      joinRoom(userId, roomValue).then(() => {
        loadRooms(userId).then(data => {
          dispatch(setRoomsList(data))
        })
        setRoomValue('')
      })
    }

    const handleMessageSubmit = e => {
      e.preventDefault()
      sendMessage(userName, currentMessage, roomId).then(data => {
        loadMessages(roomId).then(data => {
          dispatch(setMessageList(data))
          socket.emit('send_message', {message: currentMessage, room: roomId});
        })
        setCurrentMessage('')
      })
    }

    
    useEffect(() => {
      loadRooms(userId).then(data => {
        dispatch(setRoomsList(data))
      })
      loadMessages(roomId).then(data => {
        dispatch(setMessageList(data))
        setFirstLoading(false)
      });

      socket.on('receive_message', data => {
        loadMessages(roomId).then(data => {
          dispatch(setMessageList(data))
        });
      })
    }, [dispatch, roomId, socket])

    const mapRoomsList = () => roomsList.map(room =>
      <ListItemButton onClick={() => {
          dispatch(setRoomId(room.roomId))
          socket.emit('join_room', roomId)
        }} style={{width: '120px'}} key={room.id}>
          <ListItemText key={room.id} primary={`${room.roomId}`} />
      </ListItemButton>
    )

    const mapMessageList = () => messageList.map(message =>
      <div sx={{overflow: 'auto'}} key={message.id} style={{display: 'block', width: '70vw', marginTop: '5px', clear: 'both'}}>
        <div style={{wordWrap: 'break-word'}} key={message.id}>{message.userName}: {message.content}</div>
      </div>
    );

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
                      <ListItemButton onClick={() => {
                          setRoomId(room.roomId);
                          socket.emit('join_room', roomId)
                        }} style={{width: '120px'}} key={room.id}>
                          <ListItemText key={room.id} primary={`${room.roomId}`} />
                      </ListItemButton>
                    )}
                  </List>
                </Grid>
                <Grid item style={{marginTop: '12px'}}>
                  {messageList.map(message =>
                    <div sx={{overflow: 'auto'}} key={message.id} style={{display: 'block', width: '70vw', marginTop: '5px', clear: 'both'}}>
                      <div style={{wordWrap: 'break-word'}} key={message.id}>{message.userName}: {message.content}</div>
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid item style={{marginTop: '20px'}}>
                <form onSubmit={handleMessageSubmit}>
                  <Container style={{width: '90vw'}}>
                    <div style={{width: '50vw', display: 'flex', float: 'right'}}>
                      <FormControl fullWidth variant='standard'>
                        <Input fullWidth
                            type='text'
                            placeholder="Message..."
                            inputProps={{'aria-label': 'message'}}
                            value={currentMessage}
                            onChange={e => {
                              setCurrentMessage(e.target.value)
                              console.log(currentMessage)
                            }}
                        />
                      </FormControl>
                      <Button style={{marginTop: '15px', marginBottom: '40px'}} type='submit' color='inherit' variant='text'>Send</Button>
                    </div>
                  </Container>
                </form>
              </Grid>
              received: {received}
            </Grid>
        </Container>
    )
    :
    (
      <CircularProgress />
    )
}

const mapStateToProps = (state) => {
  return {
    roomsList: state.message.roomsList,
    messageList: state.message.messageList
  }
}

export default connect(mapStateToProps, null)(Home);