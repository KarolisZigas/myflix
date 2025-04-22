import { useParams } from "react-router-dom";
import { Viewer } from "../../lib/types"
import { useQuery } from "@apollo/client";
import { Movie as MovieType, SearchMovieIdQuery, SearchMovieIdQueryVariables } from "../../generated/graphql";
import { SEARCH_MOVIE_ID } from "../../lib/graphql/queries/Movie";
import { ErrorBanner, PageSkeleton } from "../../lib/components";
import { Layout, Row, Col, Space } from "antd";
import { useState } from "react";
import { StarFilled } from "@ant-design/icons";
import { CommentSection } from "./components";

const { Content } = Layout;

interface Props {
    viewer: Viewer
}

export const Movie = ({ viewer }: Props) => {
    const params = useParams();
    const [movie, setMovie] = useState<MovieType | null>(null);

    const {data, loading, error} = useQuery<SearchMovieIdQuery, SearchMovieIdQueryVariables>(SEARCH_MOVIE_ID, {
        variables: {
            originalId: parseInt(params?.id ?? '0'),
        },
        onCompleted: (data) => {
            setMovie(data.searchMovieId);
        }
    })

    const movieElement = movie ? (
        <div className="flex gap-[25px]">
            <div className="flex max-w-[50%]">
                <img className="w-[100%] aspect-[3/4] object-cover" src={`https://image.tmdb.org/t/p/original/${movie.poster}`} alt="" />
            </div>
            <div>
                <h1>{movie.title}</h1>
                <div className="flex justify-between">
                    <span className="flex gap-[3px]">
                        {movie.rating}
                        <StarFilled className="[&>svg]:fill-yellow-300 [&>svg]:stroke-black"/>
                    </span>
                    <span>{movie.releaseDate}</span>
                </div>
                <p>{movie.description}</p>
                <p>{movie.genres?.map((item) => {
                    return item + ' ';
                })}</p>
            </div>
        </div>
    ) : (
        <ErrorBanner description="We probably don't have this movie saved." />
    )

    if (loading) {
        return (
            <Content>
                <PageSkeleton />
            </Content>
        )
    }

    if (error) {
        return (
            <Content>
                <ErrorBanner description="We probably don't have this movie saved." />
                <PageSkeleton />
            </Content>
        )
    }

    return (
        <Content className="user">
            <Space direction="vertical">
                <Row gutter={12}>
                    <Col xs={24}>
                        {movieElement}
                    </Col>
                </Row>
                <Row gutter={6} className="">
                    <Col xs={24}>
                        <div>
                            <CommentSection movieId={parseInt(params?.id ?? "0")} />
                        </div>
                    </Col>
                </Row>
            </Space>
        </Content>
    )
}