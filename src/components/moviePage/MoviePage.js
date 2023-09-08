import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, selectLanguage } from "../../features/movies/moviesSlise";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { loadMovieData, selectMovieData, resetMovieInfo } from "../../features/moviePage/moviePageSlice";
import { roundVote } from "../../util/helper/voteRound";
import { timeTransform } from "../../util/helper/minToHours";
import { selectGenres } from "../../features/genres/genresSlice";

export const MoviePage = () => {
    const dispatch = useDispatch();
    const {movies} = useSelector(selectMovies);
    const {runtime, actors, trailer} = useSelector(selectMovieData);
    const {id} = useParams();
    const language = useSelector(selectLanguage);
    const genres = useSelector(selectGenres);
    const movie = movies.find(m => m.id === Number(id));
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
        dispatch(resetMovieInfo());
    }

    useEffect(() => {
        dispatch(loadMovieData({id, language}));
    }, [dispatch, id, language]);

    if (!movie) {
        return (
            <Navigate to="/" />
        );
    }

    const {title, genre, vote_average, vote_count, backdrop, poster, overview, release_date} = movie;
    const voteToDisplay = roundVote(vote_average);
    const genresToDisplay = genres.filter(gen => genre.includes(gen.id)).map(gen => gen.name).join(', ');

    return (
        <div className="movie-page-container">
            <div className="movie-page" style={{backgroundImage: `url(${backdrop})`}}>
            </div>
            <div className="movie-page-content">
                <h2>{title}</h2>
                <div className="movie-statistic-box">
                    <div className="movie-vote-box">
                        <i className="pi pi-star-fill"></i>{voteToDisplay} | {vote_count}
                    </div>
                    <div className="extra-statistic-box">
                        <div className="duration-box">
                            <p>{timeTransform(runtime, {hour: 'h', minute: 'm'})}</p>
                        </div>
                        <span>·</span>
                        <div className="genres-box">
                            <p>{genresToDisplay}</p>
                        </div>
                        <span>·</span>
                        <div className="year-box">
                            <p>{release_date}</p>
                        </div>
                    </div>
                </div>
                <div className="trailer-box">
                    <div className="poster-box">
                        <img src={poster} alt="Poster"></img>
                    </div>
                    <iframe  
                        src={`https://www.youtube-nocookie.com/embed/${trailer}`}
                        title="YouTube video player"  
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                    >
                    </iframe>
                </div>
                <div className="overview-box">
                    <p>{overview}</p>
                </div>
                <button onClick={handleBack}>Back</button>
            </div>
        </div>
    );
}