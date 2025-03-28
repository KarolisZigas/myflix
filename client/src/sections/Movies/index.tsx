import { useQuery, gql } from "@apollo/client";
import { MoviesQuery } from "../../generated/graphql";
import { List, Spin } from 'antd';
import { MovieSkeleton } from './components';

const MOVIES = gql`
    query Movies {
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
    }
`

export const Movies = () => {
    const { data, loading, error, refetch } = useQuery<MoviesQuery>(MOVIES);

    const movies = data ? data.movies : null;

    const moviesList = movies ?
    (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={movies}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
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