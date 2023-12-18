import React from 'react'
import styled from 'styled-components'

const Login = () => {
    const handlClick = ()=>{
      const client_id = "6532af90b79f434a9b4a650811f274cd";
      const redirect_uri = "http://localhost:5173/";
      const api_uri = "https://accounts.spotify.com/authorize";
      const scope = [
        "user-read-private",
        "user-read-email",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-top-read",
      ];
        window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
          " "
        )}&response_type=token&show_dialog=true`;
    }
  return (
    <div className=' flex flex-col items-center justify-center h-screen w-screen bg-green-600 gap-20'>
        <img className=' h-1/5' src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png'/>
        <button className=' p-2 rounded-3xl bg-white decoration-green-600' onClick={handlClick}>Connect Spotify</button>
    </div>
  )
}

const container = styled.div``;

export default Login