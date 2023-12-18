import { useEffect, useState } from 'react'
import './App.css'
import Spotify from './components/Spotify'

import { useStateProvider } from './utils/StateProvider'
import { reducerCases } from './utils/Constants'

import Login from './components/Login'

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);
  return <div>{token ? <Spotify />: <Login />}</div>;
}

export default App
