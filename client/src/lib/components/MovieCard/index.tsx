import React, { useState } from "react"
import { Card, Dropdown, Space, Typography } from "antd";
import { UserOutlined, EditOutlined, PlusCircleOutlined, EllipsisOutlined, LinkOutlined, StarFilled, MinusCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { DeleteMovieMutation, DeleteMovieMutationVariables, Movie, SavedMovie, SaveMovieMutation, SaveMovieMutationVariables } from "../../../generated/graphql";
import { useMutation } from "@apollo/client";
import { DELETE_MOVIE } from "../../graphql/mutations/DeleteMovie";
import { useParams } from "react-router-dom";
import { Spin } from 'antd';
import { SAVE_MOVIE } from "../../graphql/mutations/SaveMovie";
import { displaySuccessNotification } from "../../utils";
import { MenuProps } from "antd";

interface Props {
    movie: SavedMovie
}

const { Text, Title } = Typography;
const { Meta } = Card;

export const MovieCard = ({ movie }: Props) => {
    const params = useParams();
    const [savedMovie, setSavedMovie] = useState(true);
    const { title, poster, id, originalId, genres, rating, imdbId, releaseDate, description, isSaved } = movie.movie

    const [deleteMovie,
        {
            loading: deleteMovieLoading, 
            error: deleteMovieError,
        }
    ] = useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(DELETE_MOVIE, {
        variables: {
            movieId: originalId,
            userId: params.id ?? ''
        },
        onCompleted: () => {
            displaySuccessNotification('Movie deleted from the list!')
        }
    })

    const [
        saveMovie, 
        {
            loading,
            error
        }
    ] = useMutation<SaveMovieMutation, SaveMovieMutationVariables>(SAVE_MOVIE, {
        variables: {
            movie: {
                id: id,
                title,
                originalId,
                imdbId,
                description,
                rating,
                genres,
                releaseDate,
                poster
            },
            userId: params.id ?? ''
        },
        onCompleted: () => {
            displaySuccessNotification('Movie saved to the list!')
        }
    })

    const handleRemove = () => {
        deleteMovie();
        setSavedMovie(false);
    }

    const handleAdd = () => {
        saveMovie();
        setSavedMovie(true);
    }

    const ratingElement = rating ? (
        <div className="flex gap-[6px]">
            <span>{rating.toFixed(1)}</span>
            <StarFilled className="[&>svg]:fill-yellow-300 [&>svg]:stroke-black"/>
        </div>
    ) : null

    const saveElement = savedMovie ? (
        <MinusCircleOutlined 
            className="remove-item [&>svg]:fill-red-600"
            onClick={handleRemove} 
            key="remove"
        />
    ) : (
        <PlusCircleOutlined
            className="add-item [&>svg]:fill-green-600"
            onClick={handleAdd} 
            key='add'
        />
    )

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a className="flex gap-[6px]" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${imdbId}`}>
                    Imdb 
                    <ArrowRightOutlined />
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a className="flex gap-[6px]" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${imdbId}`}>
                    Leave a note
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a className="flex gap-[6px]" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${imdbId}`}>
                    Discussion
                </a>
            ),
        }
    ]

    const dropdownElement = (
        <Dropdown menu={{ items }}>
            <a href="/" onClick={(e) => e.preventDefault()}>
                <Space>
                    <EllipsisOutlined key="ellipsis"/>
                </Space>
            </a>
        </Dropdown>
    );

    return (
        // <Card 
        //     hoverable 
        //     cover={<div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster})` }}/>}
        //     className="listing-card__cover-img"
        // >
        //     <div className="listing-card__details">
        //         <div className="listing-card__description">
        //             <Title level={4} className="listing-card__price">
        //                 {title}
        //             </Title>
        //             <Text strong ellipsis className="listing-card__title">
        //                 {releaseDate}
        //             </Text>
        //             <Text strong ellipsis className="listing-card__address">
        //                 {description}
        //             </Text>
        //         </div>
        //         <div className="listing-card__dimensions listing-card__dimensions--guests">
        //             <UserOutlined />
        //             <Text>{rating}</Text>
        //         </div>
        //     </div>
        // </Card>
        <Spin spinning={deleteMovieLoading || loading}>
            <Card
                classNames={{
                    header: 'my-card',
                    title: 'my-card'
                }}
                extra={ratingElement}
                title={title}
                style={{ width: 300 }}
                cover={
                    <img 
                        alt={`${poster}`}
                        src={`https://image.tmdb.org/t/p/original/${poster}`}
                    />
                }
                actions={[
                    saveElement,
                    <LinkOutlined key="edit"/>,
                    dropdownElement
                ]}
            >
                <Meta
                    description={description}
                />
            </Card>
        </Spin>
    )
}