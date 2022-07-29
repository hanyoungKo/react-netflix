import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import requests from '../api/requests';
import "./Banner.css";
import styled from 'styled-components';

export default function Banner() {
 
  const [movie,setMovie] = useState([]);
  const [isClickedPlay,setIsClickPlay] = useState(false);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async()=>{

    //현재 상영중인 영화 정보를 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    //console.log(request);
    
    //여러 영화중 하나의 영화가져오기 
    const movieId = request.data.results[
      Math.floor(Math.random()* request.data.results.length)
    ].id;

    // 특정영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)

    const {data: movieDetail} = await axios.get(`movie/${movieId}}`,{
      params: {append_to_response:"videos"} 
      // 받아오는 response 에 videos 값을 담아달라
    });
    //console.log(movieDetail);
    setMovie(movieDetail);

   
  }
  if(!isClickedPlay){
    return (
      <header
      className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
    >
      <div className='banner_contents'>
        <h1 className='banner_movietitle'>
        {movie.title || movie.name || movie.orginal_name}
        </h1>
        <div className='banner_buttons'>
          {movie.videos && movie.videos.results.length>0 && 
           <button className='banner_button paly' onClick={()=>{setIsClickPlay(true)}}>Play</button>
          }
          <button className='banner_button info'>More Information</button>
        </div>
        <h1 className="banner_description">
         {movie.overview}
        </h1>
      </div>
      <div className='banner_fadeBottom'></div>
    </header>
)
  }else{
    return(
    <Container>
      <HomeContainer>
        <Iframe
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
          ?controls=0&autoplay=1&loop=1&mute=1
          &playlist=${movie.videos.results[0].key}`}
          title=""
          frameborder="0"
          allow="autoplay: fullscreen"
        >
        </Iframe>
      </HomeContainer>
    </Container>
    )
  }
}

// styled 

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

`;

const HomeContainer = styled.div`
  width:100%;
  height:100%;
`;

const Iframe = styled.iframe`
  width:100%;
  height:100%;
  z-index:-1;
  opacity: 0.8;
  border:none;

  &::after{
    content:"";
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
  }
`
