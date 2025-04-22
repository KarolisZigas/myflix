import React, { useState } from "react"
import { Card, Dropdown, Space, Typography } from "antd";
import { PlusCircleOutlined, EllipsisOutlined, LinkOutlined, StarFilled, MinusCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { DeleteMovieMutation, DeleteMovieMutationVariables, SavedMovie, SaveMovieMutation, SaveMovieMutationVariables } from "../../../generated/graphql";
import { useMutation } from "@apollo/client";
import { DELETE_MOVIE } from "../../graphql/mutations/DeleteMovie";
import { Link, useParams } from "react-router-dom";
import { Spin } from 'antd';
import { SAVE_MOVIE } from "../../graphql/mutations/SaveMovie";
import { displaySuccessNotification } from "../../utils";
import { MenuProps } from "antd";
import { DetailsModal } from "./components";

interface Props {
    movie: SavedMovie
}

const { Text, Title } = Typography;
const { Meta } = Card;

export const MovieCard = ({ movie }: Props) => {
    const params = useParams();
    const [savedMovie, setSavedMovie] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

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
                <div onClick={handleModalOpen} className="flex gap-[6px]">
                    Leave a note
                </div>
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
            <span className="cursor-pointer">
                <Space>
                    <EllipsisOutlined key="ellipsis"/>
                </Space>
            </span>
        </Dropdown>
    );

    return (
        <Spin spinning={deleteMovieLoading || loading}>
            <Card
                classNames={{
                    header: 'my-card',
                    title: 'my-card'
                }}
                extra={ratingElement}
                title={
                    <Link to={`/movie/${movie.movie.originalId}`} >
                        {title}
                    </Link>
                }
                style={{ width: 300 }}
                cover={
                    <Link to={`/movie/${movie.movie.originalId}`} >
                        <img 
                            alt={`${poster}`}
                            src={`https://image.tmdb.org/t/p/original/${poster}`}
                        />
                    </Link>
                }
                actions={[
                    saveElement,
                    <Link to={`/movie/${movie.movie.originalId}`}>
                        <LinkOutlined key="edit"/>
                    </Link>,
                    dropdownElement
                ]}
            >
                <Meta
                    description={description}
                />
            </Card>
            <DetailsModal
                open={isModalOpen}
                onClose={handleModalClose}
                movie={movie}
            />
        </Spin>
    )
}