import { useQuery } from "@apollo/client"
import { GET_COMMENTS } from "../../../../lib/graphql/queries/GetComments"
import { PageSkeleton } from "../../../../lib/components"
import { Content } from "antd/es/layout/layout"
import { Comment } from "../Comment"
import { GetCommentsQuery, GetCommentsQueryVariables } from "../../../../generated/graphql"

interface Props {
    movieId: number
}

export const CommentSection = ({ movieId }: Props) => {

    const { data, loading, error } = useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GET_COMMENTS, {
        variables: { movieId }
    })

    const comments = data?.getComments.result

    console.log(comments);

    if (!comments?.length) {
        return null;
    }

    if (loading) {
        return (
            <Content>
                <PageSkeleton />
            </Content>
        )
    }

    return (
        <div>
            <h3>Here's what other users had to say about this movie:</h3>
            {comments.map((comment) => (
                <Comment 
                    key={comment.id} 
                    savedMovie={{
                        notes: comment.notes ?? '',
                        userId: {
                            avatar: comment.userId?.avatar ?? '',
                            id: comment.userId?.id ?? '',
                            name: comment.userId?.name ?? '',
                        },
                        rating: comment.rating ?? 0
                    }} 
                />
            ))}
        </div>
    )
}