import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, selectLanguage } from "../../features/movies/moviesSlise";
import { useParams, useNavigate } from "react-router-dom";
import { loadMovieData, selectMovieData, resetMovieInfo } from "../../features/moviePage/moviePageSlice";
import { roundVote } from "../../util/helper/voteRound";
import { timeTransform } from "../../util/helper/minToHours";
import { selectGenres } from "../../features/genres/genresSlice";
import {Button} from 'primereact/button';
import { Actor } from "../actor/Actor";
import { selectContent } from "../../features/content/contentSlice";
import { MoviePageSkeleton } from "../moviePageSkeleton/MoviePageSkeleton";
import {ErrorOrEmpty} from "../errorOrEmpty/ErrorOrEmpty";

export const MoviePage = () => {
    const dispatch = useDispatch();
    const {movies} = useSelector(selectMovies);
    const {runtime, actors, trailer, isLoading, isError} = useSelector(selectMovieData);
    const {id} = useParams();
    const language = useSelector(selectLanguage);
    const content = useSelector(selectContent);
    const genres = useSelector(selectGenres);
    const movie = movies.find(m => m.id === Number(id));
    const navigate = useNavigate();
    const {title, genre, vote_average, vote_count, backdrop, poster, overview, release_date} = movie;
    const voteToDisplay = roundVote(vote_average);
    const genresToDisplay = genres.filter(gen => genre.includes(gen.id)).map(gen => gen.name).join(', ');
    const actorsToDisplay = actors.map(actor => {
        let newName = '';
        const words = actor.name.split(' ');
        if (words.length < 3) {
            newName = words.join('\n');
        } else {
            if (words[0].length + words[1].length >= words[1].length + words[2].length) {
                words.forEach(word => !newName ? newName += word + '\n' : newName += ' ' + word);
            } else {
                words.forEach((word, i) => i === 2 ? newName += '\n' + word : newName += word + ' ');
            }
        }
        return {
            name: newName,
            id: actor.id,
            photo: actor.photo
        }
    });

    const handleBack = () => {
        navigate('/');
        dispatch(resetMovieInfo());
    }

    useEffect(() => {
        dispatch(loadMovieData({id, language}));
    }, [dispatch, id, language]);

    const loadedMovieContent = () => {
        return (
            <>
                <h2>{title}</h2>
                <div className="movie-statistic-box">
                    <div className="extra-statistic-box">
                        <div className="movie-vote-box">
                            <i className="pi pi-star-fill"></i>{voteToDisplay} | {vote_count}
                        </div>
                        <span>·</span>
                        <div className="duration-box">
                            <p>{timeTransform(runtime, content[language].time)}</p>
                        </div>
                        <span>·</span>
                        <div className="year-box">
                            <p>{release_date ? release_date : content[language].noReleaseDateMessage}</p>
                        </div>
                    </div>
                    <div className="genres-box">
                        <p>{genresToDisplay}</p>
                    </div>
                </div>
                <div className="media-box">
                    <div className="poster-box">
                        <img src={poster} alt="Poster"></img>
                    </div>
                    <div className="trailer-box">
                        {isError ? <ErrorOrEmpty message={content[language].moviePageError} /> : 
                            !trailer ? <ErrorOrEmpty message={content[language].noTrailerMessage} /> : 
                            <iframe  
                                src={`https://www.youtube-nocookie.com/embed/${trailer}`}
                                title="YouTube video player"  
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                            >
                            </iframe>
                        }
                    </div>
                </div>
                <div className="overview-box">
                    <p>{overview}</p>
                </div>
                <div className="movie-actors">
                    <p className="actors-title">{content[language].actors}</p>
                    <div className="actors-box">
                        {isError ? <ErrorOrEmpty message={content[language].moviePageError} /> :
                         actorsToDisplay.map(actor => (<Actor 
                                                key={actor.id}
                                                photo={actor.photo}
                                                name={actor.name}
                        />))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="movie-page-container">
            <div className="movie-page" style={{backgroundImage: backdrop ? `url(${backdrop})` : 'none'}}>
            </div>
            <div className="movie-page-content">
                {isLoading ? <MoviePageSkeleton/> : loadedMovieContent()}
            </div>
            <div className="back-button-container">
                <Button icon="pi pi-arrow-left" label={content[language].backButton} onClick={handleBack} />
            </div>
        </div>
    );
}