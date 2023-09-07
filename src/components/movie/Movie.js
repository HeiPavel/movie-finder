import React from "react";
import { useSelector } from "react-redux";
import { selectGenres } from "../../features/genres/genresSlice";
import { Link } from "react-router-dom";
import { roundVote } from "../../util/helper/voteRound";

export const Movie = ({movie}) => {
    const {title, poster, genre, vote_average, vote_count} = movie;
    const genres = useSelector(selectGenres);
    const genresToDisplay = genres.filter(el => genre.includes(el.id)).slice(0,2).map(el => el.name).join(' ');
    const voteToDisplay = roundVote(vote_average);

    return (
        <Link to={`/movie/${movie.id}`}>
            <figure className="movie-card">
                <img src={poster} alt={`title: ${title}`}></img>
                <figcaption className="movie-description">
                    <p className="title">{title}</p>
                    <div className="statistic-box">
                        <p className="vote-box"><i className="pi pi-star-fill"></i>{voteToDisplay}|{vote_count}</p>
                        <p className="genres-box">{genresToDisplay}</p>
                    </div>
                </figcaption>
            </figure>
        </Link>
    );
}