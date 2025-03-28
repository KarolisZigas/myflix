import React from "react";
import { Skeleton, Alert, Divider } from "antd";
import './styles/index.css'

interface Props {
    error?: boolean
}

export const MovieSkeleton = ({ error = false }: Props) => {

    const errorAlert = error ? (
        <Alert 
            type="error"
            message="Something unexpected happened. Please try again"
            className="movie-skeleton__alert"
        />
    ) : null;

    return (
        <div className="movie-skeleton">
            {errorAlert}
            {[1, 2, 3].map((key) => (
                <div key={key} className="movie-skeleton__item_outer">
                    <div className="movie-skeleton__item">
                        <div className="movie-skeleton__content">
                            <Skeleton active paragraph={{ rows: 3 }} />
                        </div>
                        <div className="movie-skeleton__image">
                            <Skeleton.Image active={true} />
                        </div>
                    </div>
                    <Divider />
                </div>
            ))}
        </div>
    )
}