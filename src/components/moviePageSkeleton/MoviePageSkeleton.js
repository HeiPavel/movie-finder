import React from "react";
import {Skeleton} from 'primereact/skeleton';

export const MoviePageSkeleton = () => {

    const actor = (key) => {
        return (
            <div key={key} className="actor-skeleton">
                <Skeleton shape="circle" width="" height="" className="actor-skeleton-photo"></Skeleton>
                <Skeleton width="" height="" className="actor-skeleton-name" />
            </div>
        );
    }

    return (
        <>
            <Skeleton width="" height="" className="title-skeleton" />
            <Skeleton width="" height="" className="statistic-skeleton" />
            <div className="media-box-skeleton">
                <Skeleton width="" height="" className="poster-skeleton" />
                <Skeleton width="" height="" className="trailer-skeleton" />
            </div>
            <Skeleton width="" height="" className="overview-skeleton" />
            <div className="actors-label-skeleton-box">
                <Skeleton width="" height="" className="actors-label-skeleton" />
            </div>
            <div className="actors-box-skeleton">
                {new Array(12).fill(1).map((_, index) => (actor(index)))}
            </div>
        </>
    );
}