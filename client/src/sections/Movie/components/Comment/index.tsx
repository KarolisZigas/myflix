import { StarFilled } from "@ant-design/icons"
import { SavedMovie } from "../../../../generated/graphql"
import { Link } from "react-router-dom"

interface Props {
    savedMovie: {
        notes: string,
        rating: number,
        userId: {
            avatar: string,
            name: string,
            id: string,
        },
    }
}

export const Comment = ({ savedMovie }: Props) => {
    return (
        <div className="max-w-[35%] relative bg-gray-500 rounded-[6px] flex border-[1px] p-[20px] pt-[36px] border-b-gray-700">
            <h3 className="text-white">{savedMovie.notes}</h3>
            <div className="absolute gap-[4px] flex top-[16px] right-[20px] rounded-[4px] text-white p-[4px] bg-gray-600">
                {savedMovie.rating}
                <StarFilled className="[&>svg]:fill-yellow-400" />
            </div>
            <Link to={`/user/${savedMovie.userId.id}`}>
                <div className="absolute left-[16px] top-[16px]">
                    <img className="w-[22px] h-[22px] rounded-[4px] overflow-hidden" src={savedMovie.userId.avatar} alt={`${savedMovie.userId.id} user's avatar`} />
                </div>
            </Link>
            {/* <p>{savedMovie.userId}</p> */}
        </div>
    )
}