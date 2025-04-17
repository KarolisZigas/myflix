import React from "react";
import { MovieCard } from "../../../../lib/components";
import { List, Typography } from "antd";
import { SavedMovie, User } from "../../../../generated/graphql";

interface Props {
    userMovies: User['savedMovies'];
    moviesPage: number;
    limit: number;
    setMoviesPage: (page: number) => void;
}

const { Paragraph, Title } = Typography;

export const UserMovies = ({ 
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
                    <MovieCard movie={movie} />
                </List.Item>
            )}
        />
    ) : null;

    const userMoviesElement = userMoviesList ? (
        <div className="user-listings">
            <Title level={4} className="user-listings__title" >
                Movies
            </Title>
            <Paragraph className="user-listings__description">
                Saved movies
            </Paragraph>
            {userMoviesList}
        </div>
    ) : null;

    return userMoviesElement;
}