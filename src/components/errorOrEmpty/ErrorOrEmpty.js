import React from "react";

export const ErrorOrEmpty = ({message}) => {
    return (
        <p className="text-message">{message}</p>
    );
}