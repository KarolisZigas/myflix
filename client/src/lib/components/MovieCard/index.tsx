import React from "react"
import { Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Movie, SavedMovie } from "../../../generated/graphql";

interface Props {
    movie: SavedMovie
}

const {Text, Title} = Typography;

export const MovieCard = ({ movie }: Props) => {
    const { title, poster, rating, imdbId, releaseDate, description } = movie.movie

    return (
        <Card 
            hoverable 
            cover={<div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster})` }}/>}
            className="listing-card__cover-img"
        >
            <div className="listing-card__details">
                <div className="listing-card__description">
                    <Title level={4} className="listing-card__price">
                        {title}
                    </Title>
                    <Text strong ellipsis className="listing-card__title">
                        {releaseDate}
                    </Text>
                    <Text strong ellipsis className="listing-card__address">
                        {description}
                    </Text>
                </div>
                <div className="listing-card__dimensions listing-card__dimensions--guests">
                    <UserOutlined />
                    <Text>{rating}</Text>
                </div>
            </div>
        </Card>
    )
}