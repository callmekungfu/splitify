import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setupAuthRedirectHandler } from './firebase/auth/redirect';
import { listMyParticipants } from './firebase/store/participants';
import { auth } from './firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

setupAuthRedirectHandler();

onAuthStateChanged(auth, (user) => {
  console.log('test');

  if (user) {
    console.log(user);
    listMyParticipants(user.uid);
  }
});

auth.currentUser?.reload();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
