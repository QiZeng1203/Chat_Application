import './App.css';
import { useState, useEffect } from 'react';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchGetMessages,
  fetchAddMessages,
} from './services';

import LoginForm from './LoginForm';
import Messages from './Messages';
import AddMessageForm from './AddMessageForm';
import Users from './Users';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';

function App() {

  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING);
  const [ isMessagesPending, setIsMessagesPending ] = useState(false);
  const [ messages, setMessages ] = useState({});
  const [ users, setUsers ] = useState([]);

  function onLogin(username) {
    setIsMessagesPending(true);
    fetchLogin(username)
    .then((data) => {
      setError('');
      setUsers(data.users);
      setMessages(data.messages);
      setIsMessagesPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR')
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setMessages({});
    fetchLogout() 
    .catch( (err) => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onAddMessage(text) {
    setIsMessagesPending(true);
    fetchAddMessages(text)
    .then((messages) => {
      setError('');
      setIsMessagesPending(false);
      setMessages(messages);
    })
    .catch(err => {
      setError(err?.error || 'ERROR'); 
      setIsMessagesPending(false);
    });
  }

  function checkSession() {
    fetchSession()
    .then( session => { 
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); 
      return fetchGetMessages();
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err); 
    })
    .then((data) => {
      setUsers(data.users);
      setMessages(data.messages);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    })
  }

  function refresh() {
    if(loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      fetchGetMessages()
      .then( (data) => {
        setUsers(data.users);
        setMessages(data.messages);
      })
      .catch((err) => {
        return;
      })
    }
  }

  useEffect( () => {
    setTimeout(refresh, 1000);
  });


  useEffect(
    () => {
      checkSession();
    },
    [] 
  );


  return (
    <div className="app">
      <main className="">
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <h2>Hello, {username}</h2>
            <Controls onLogout={onLogout}/>
            <h3>Active Users:</h3>
            <Users users={users} />
            <h3>Chat History:</h3>
            <Messages
              isMessagesPending={isMessagesPending}
              messages={messages}
              username={username}
            />
            <AddMessageForm onAddMessage={onAddMessage}/>
          </div>
        )}
        { error && <Status error={error}/> }
      </main>
      
    </div>
  );
}

export default App;