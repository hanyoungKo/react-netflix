import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./SearchPage.css";
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
  //console.log(useLocation());
  const [searchResults, setSearchReaults] = useState([]);
  const navigate =  useNavigate();

  const useQuery =()=>{
    return new URLSearchParams(useLocation().search);
  }
  
  let query = useQuery();
  
  
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm,500);

  useEffect(()=>{
    if(debouncedSearchTerm){
      fetchSearchMovie(debouncedSearchTerm);
    }
  },[debouncedSearchTerm]);

  
  const fetchSearchMovie = async ()=>{
    try{
      const requests = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
        //console.log(requests);
        setSearchReaults(requests.data.results);
      } 
     catch(error){
     
    }
  } 

  const renderSearchResults = ()=>{
    return searchResults.length >0 ?(
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl =
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return(
              <div className='movie' key={movie.id}>
                <div onClick={()=>navigate(`/${movie.id}`)} className='movie_colmn-poster'>
                  <img
                    src={movieImageUrl} alt="movie"
                    className='movie_poster'
                    />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
    <section className='no-results'>
      <div>
          <p>찾고자 하는 검색어 "{debouncedSearchTerm}" 에 맞는 영화가 없습니다.</p>
      </div>
    </section> 
    )

  }
  
  return renderSearchResults();


}
