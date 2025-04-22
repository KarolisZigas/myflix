import { MovieCard } from "../../../../lib/components";
import { List, Typography } from "antd";
import { SavedMovie, User } from "../../../../generated/graphql";

interface Props {
    userMovies: {
        total: number;
        result: {
            id: string;
            movieId: string;
            savedAt: string;
            notes?: string | null;
            rating?: number | null;
            userId?: {
                id: string;
            } | null;
            movie: any;
        }[];
    };
    moviesPage: number;
    limit: number;
    setMoviesPage: (page: number) => void;
}

const { Title } = Typography;

export const UserMoviesList = ({ 
    userMovies, 
    moviesPage, 
    limit, 
    setMoviesPage 
}: Props) => {
    const total = userMovies ? userMovies.total : null;
    const result = userMovies ? userMovies.result as SavedMovie[] : null;

    const userMoviesList = userMovies ? (
        <List
            grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                xl: 4
            }}
            dataSource={result ? result : undefined}
            locale={{ emptyText: "User doesn't have any saved movies yet!" }}
            pagination={{
                position: "top",
                current: moviesPage,
                total: total ? total : undefined,
                defaultPageSize: limit,
                hideOnSinglePage: true,
                showLessItems: true,
                onChange: (page: number) => setMoviesPage(page)
            }}
            renderItem={(movie) => (
                <List.Item>
                    <MovieCard 
                        movie={movie} 
                    />
                </List.Item>
            )}
        />
    ) : null;

    const userMoviesElement = userMoviesList ? (
        <div className="user-listings pt-0">
            <Title level={4} className="user-listings__title mt-0" >
                Movies
            </Title>
            {userMoviesList}
        </div>
    ) : null;

    return userMoviesElement;
}