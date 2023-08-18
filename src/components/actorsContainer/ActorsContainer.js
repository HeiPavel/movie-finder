import React from "react";
import { useSelector } from "react-redux";
import { selectPerson } from "../../features/person/personSlice";
import { Actor } from "../actor/Actor";

export const ActorsContainer = () => {
    const {actors} = useSelector(selectPerson);
    return (
        <div className="actors-container">
            <div className="inner-container">
                {actors.map(actor => (<Actor 
                                        name={actor.name}
                                        key={actor.id}
                                        photo={actor.photo}
                />))}
            </div>
        </div>
    );
}