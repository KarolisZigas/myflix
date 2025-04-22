import { IResolvers } from "@graphql-tools/utils";
import { Request } from "express";
import { Database, User } from "../../../lib/types";
import { authorize } from "../../../lib/utils";
import { UserArgs, UserMovieArgs, UserMovieData } from "./types";
import { ObjectId } from "mongodb";

export const userResolvers: IResolvers = {
    Query: {
        user: async (
            _root: undefined, 
            { id }: UserArgs,
            { db, req }: { db: Database, req: Request }
        ): Promise<User> => {
            try {
                const user = await db.users.findOne({
                    _id: id
                })

                if (!user) {
                    throw new Error("User can't be found");
                }

                user.authorized = false;

                const viewer = await authorize(db, req);

                if (viewer && viewer._id === id) {
                    user.authorized = true;
                }

                return user
            } catch (error) {
                throw new Error(`failed to query user: ${error}`);
            }
        }
    },
    User: {
        id: (user: User): string => {
            return user._id;
        },
        savedMovies: async (
            user: User, 
            { limit, page }: UserMovieArgs, 
            { db }: { db: Database }
        ): Promise<UserMovieData | null>  => {
            try {
                if (!user.authorized) {
                    return null;
                }

                const data: UserMovieData = {
                    total: 0,
                    result: []
                }

                if (!user.savedMovies || user.savedMovies.length === 0) {
                    return data;
                }

                const savedMovieIds = user.savedMovies.map(id => new ObjectId(id))

                const query = { _id: { $in: savedMovieIds } };
                data.total = await db.savedMovies.countDocuments(query);

                let cursor = await db.savedMovies.find(query);
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);

                data.result = await cursor.toArray();

                return data;
            
            } catch (error) {
                throw new Error(`Failed to query user bookings: ${error}`)
            }
        },
    }
};