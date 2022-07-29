import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DeatailPage() {

  const {movieId} = useParams();
  const [movie,setMovie] = useState({});

  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(
        `/movie/${movieId}`
      )
      console.log(request);
      setMovie(request.data)
    }
    fetchData();
  
  },[movieId]);

  if(!movie) return (<div>상세영화정보가 없습니다.</div>) 
  return (
    <section className='banner'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}>
      <div className='banner_contents'>
        <h1 className='banner_movietitle'>
          {movie.title || movie.name || movie.orginal_name}
        </h1>
        <h1 className="banner_description">
          {!movie.overview ? "줄거리 정보 없음" : movie.overview}
        </h1>
      </div>
    </section>
  )
}
