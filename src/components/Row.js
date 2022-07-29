import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";
import MovieModal from './MovieModal/index';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Row({ isLargeRow, title, fetchUrl, id }) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});


    useEffect(() => {
        fetchMovieData();
    });

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);

    }
    const handleClickMovieInfo = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }
    return (
        <section className='row'>
            <h2>
                {title}
            </h2>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                // navigation : arrow 버튼 사용여부
                pagination={{ clickable: true }}
                //Pagination : page버튼 보이게 할지
                loop={true}
                breakpoints={{
                    1378:{
                        slidesPerView:6,
                        slidesPerGroup:6,
                    },
                    998:{
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625:{
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0:{
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    }
                }}
                
                
            >
                <div id={id} className="row_posters">
                    {movies.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <img
                            
                            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                            onClick={() => { handleClickMovieInfo(movie) }}
                        />
                    </SwiperSlide>
                    ))}
                </div>

                {modalOpen && (
                    <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
                )}
            </Swiper>
        </section>
    )
}
