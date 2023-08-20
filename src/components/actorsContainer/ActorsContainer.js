import React from "react";
import { useSelector } from "react-redux";
import { selectActors, selectSelectedActors } from "../../features/searchActors/searchActorsSlice";
import { Actor } from "../actor/Actor";

export const ActorsContainer = React.memo(() => {
    const actors = useSelector(selectActors);
    const selectedActors = useSelector(selectSelectedActors);
    return (
        <div className="actors-container">
            <div className="inner-container">
                {selectedActors.map(actor => (<Actor 
                                        name={actor.name}
                                        key={actor.id}
                                        photo={actor.photo}
                                        isRemoved={true}
                                        actor={actor}
                />))}
                {actors.map(actor => (<Actor 
                                        name={actor.name}
                                        key={actor.id}
                                        photo={actor.photo}
                                        isRemoved={false}
                                        actor={actor}
                />))}
            </div>
        </div>
    );
}) 