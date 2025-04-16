import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DeleteMovieMutation, DeleteMovieMutationVariables, SaveMovieMutation, SaveMovieMutationVariables, SearchMoviesQuery } from "../../generated/graphql";
import { List, Spin } from 'antd';
import { MovieSkeleton } from './components';
import { useParams } from "react-router-dom";
import './styles/index.css'
import { Viewer } from "../../lib/types";
import { displayErrorMessage, displaySuccessNotification } from "../../lib/utils";
import { SEARCH_MOVIES } from "../../lib/graphql/queries/Movie";
import { SAVE_MOVIE } from "../../lib/graphql/mutations/SaveMovie";
import { DELETE_MOVIE } from "../../lib/graphql/mutations/DeleteMovie";
import { ImdbButton, AddButton } from "./components";
import { Input, Layout, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import { USER } from "../../lib/graphql/queries";

const { Search } = Input;
const { Content } = Layout;

interface Props {
    viewer: Viewer
}

export const Movies = ({ viewer }: Props) => {
    const navigate = useNavigate();
    const { title } = useParams<{ title: string }>();
    const [page, setPage] = useState(1);
    const [saveMovie, 
        {
            loading: saveMovieLoading
        }
    ] = useMutation<SaveMovieMutation, SaveMovieMutationVariables>(SAVE_MOVIE, {
        onCompleted: () => {
            displaySuccessNotification('Movie added to your list!');
        },
        onError: (error) => {
            displayErrorMessage(error.message);
        },
        refetchQueries: [
            {
                query: USER,
                variables: { 
                    id: viewer.id ?? "",
                    moviesPage: 1,
                    limit: 4
                }
            }
        ]
    });

    const [
        deleteMovie,
        { loading: deleteMovieLoading}
    ] = useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(DELETE_MOVIE, {
        onCompleted: () => {
            displaySuccessNotification('Movie removed from your list!');
        },
        onError: (error) => {
            displayErrorMessage(error.message);
        },
        refetchQueries: [
            {
                query: USER,
                variables: {
                    id: viewer.id ?? "",
                    moviesPage: 1,
                    limit: 4
                }
            }
        ]
    })

    const { data, loading, error } = useQuery<SearchMoviesQuery>(SEARCH_MOVIES, {
        variables: { 
            title,
            page,
            viewerId: viewer.id
        },
        onError: (error) => {
            displayErrorMessage(error.message);
        },
        skip: !title
    });

    let movies, totalPages, handlePageChange;

    if (title) {
        movies = data?.searchMovies.movies || [];
        totalPages = data?.searchMovies.totalPages || 0;
    }

    handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSearch = (input: string) => {
        navigate(`/movies/${input}`);
    }

    const moviesList = movies ?
    (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                current: page,
                onChange: handlePageChange,
                total: (totalPages || 1) * 20, // MovieDB returns 20 results per page
                pageSize: 20,
                showSizeChanger: false
            }}
            dataSource={movies}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <AddButton 
                            onSaveMovie={() => {
                                saveMovie({
                                    variables: {
                                        movie: {
                                            id: item.id,
                                            title: item.title,
                                            originalId: item.originalId,
                                            imdbId: item.imdbId || '',
                                            description: item.description || '',
                                            rating: item.rating || null,
                                            genres: item.genres?.filter((genre): genre is number => genre !== null) || null,
                                            releaseDate: item.releaseDate || '',
                                            poster: item.poster || ''
                                        },
                                        userId: viewer.id ?? ''
                                    }
                                })
                            }}
                            onDeleteMovie={() => {
                                deleteMovie({
                                    variables: {
                                        movieId: item.originalId,
                                        userId: viewer.id ?? ''
                                    }
                                })
                            }}
                            isSaved={item.isSaved}
                        />,
                        <ImdbButton 
                            imdb={item.imdbId}
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1150px-IMDB_Logo_2016.svg.png"
                            key="imdb" 
                        />
                      ]}
                    extra={
                        <img
                            width={272}
                            alt="Movie Poster"
                            src={`https://image.tmdb.org/t/p/original/${item.poster}`}
                        />
                    }
                >
                    <List.Item.Meta
                        title={item.title}
                        description={item.description}
                    >
                    {item.releaseDate}
                    </List.Item.Meta>

                </List.Item>
            )}
        ></List>
    ) : null

    if (loading) {
        return (
            <div className="listings">
                <MovieSkeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div className="listings">
                <MovieSkeleton error/>
            </div>
        )
    }

    return (
        <Content className="">
            <Row gutter={12} justify="space-between" className="mt-[20px]">
                {!title && (
                    <Col xs={24} className="justify-center flex">
                        <h1>Search for a movie</h1>
                    </Col>
                )}
                <Col xs={24} className="justify-center flex">
                    <Search onSearch={handleSearch} className="max-w-[50%] mx-auto" defaultValue={title} placeholder="Type a title" enterButton/>
                </Col>
            </Row>
            <Spin spinning={loading || saveMovieLoading || deleteMovieLoading}>
                {moviesList}
            </Spin>
        </Content>
    )
};