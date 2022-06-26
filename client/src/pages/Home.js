import { Button, CircularProgress, Container, FormControl, Grid, Input, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loadMessages, loadRooms, sendMessage } from '../http/messageAPI';
import { addNewMessage, setMessageList, setRoomId, setRoomsList } from '../redux/action-creators/message';
import { joinRoom } from '../http/messageAPI';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import io from 'socket.io-client';
import MessageImg from '../components/MessageImg';

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
    const dispatch = useDispatch()
    const [currentMessage, setCurrentMessage] = useState('')
    const [roomId, setRoomId] = useState('1')
    const [file, setFile] = useState(null)
    

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
      const formData = new FormData()
      formData.append('userName', userName)
      formData.append('content', currentMessage)
      formData.append('roomId', roomId)
      formData.append('img', file)

      sendMessage(formData).then(data => {
        loadMessages(roomId).then(data => {
          dispatch(setMessageList(data))
          socket.emit('send_message', {id: Date.now().toString(36) + Math.random().toString(36).substr(2), message: currentMessage, room: roomId, userName: userName, img: file});
        }).then(() => {
          setFile(null)
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
      });

      socket.on('receive_message', data => {
        dispatch(addNewMessage({id: data.id, content: data.message, roomId: data.room, userName: data.userName}));
      })
    }, [dispatch, socket])

    if (messageList === null) {
      return (
        <CircularProgress />
      )
    }

    return (
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
                          loadMessages(room.roomId).then(data => {
                            dispatch(setMessageList(data))
                          })
                          
                          socket.emit('join_room', room.roomId)
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
                      {/* <MessageImg key={message.id+1} img={message.img} /> */}
                      {message.img?
                        <img src={'http://localhost:5000/' + message.img} />
                        :
                        null
                      }
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid item style={{marginTop: '20px'}}>
                <form onSubmit={(e) => handleMessageSubmit(e)}>
                  <Container style={{width: '90vw'}}>
                    <div style={{width: '50vw', display: 'flex', float: 'right'}}>
                      <FormControl variant='standard'>
                        <Input fullWidth
                          type='file'
                          onChange={(e) => {
                            let imageObject = e.target.files[0]
                            setFile(imageObject)
                          }}
                        />
                      </FormControl>
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
            </Grid>
        </Container>
    )
    
}

const mapStateToProps = (state) => {
  return {
    roomsList: state.message.roomsList,
    messageList: state.message.messageList
  }
}

export default connect(mapStateToProps, null)(Home);