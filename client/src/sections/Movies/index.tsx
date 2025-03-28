import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { AvailableMoviesQuery, SearchMoviesQuery } from "../../generated/graphql";
import { List, Spin } from 'antd';
import { MovieSkeleton } from './components';
import { useParams } from "react-router-dom";
import './styles/index.css'

const AVAILABLE_MOVIES = gql`
    query availableMovies {
        availableMovies {
            id
            originalId
            imdbId
            title
            rating
            description
            poster
            releaseDate
            genres
        }
    }
`

const SEARCH_MOVIES = gql`
    query searchMovies($title: String!, $page: Int) {
        searchMovies(title: $title, page: $page) {
            movies {
                id
                originalId
                imdbId
                title
                rating
                description
                poster
                releaseDate
                genres
            }
            totalPages
            totalResults
            page
        }
    }
`

const ImdbButton = ({ imdb, image, text }: { imdb: string | null | undefined; image: string; text?: string }) => {
    if (!imdb) {
        return null;
    }

    return (
        <div style={{width: 50, height: 20}}>
            <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${imdb}`}>
                <img style={{width: '100%', height: '100%'}} src={image} alt={text} />
            </a>
            {text}
        </div>
      );
}

const AddToListButton = ({ id }: { id: string }) => {
    return (
        <div className="add-to-list-button" style={{width: 50}}>
            Add
        </div>
      );
}

export const Movies = () => {
    const [page, setPage] = useState(1);
    const { title } = useParams<{ title: string }>();

    const { data, loading, error } = useQuery<SearchMoviesQuery>(SEARCH_MOVIES, {
        variables: { 
            title,
            page
        }
    });

    const movies = data?.searchMovies.movies || [];
    const totalPages = data?.searchMovies.totalPages || 0;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

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
                        <AddToListButton 
                            id={item.id}
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
        <div className="">
            <Spin spinning={loading}>
                {moviesList}
            </Spin>
        </div>
    )
};