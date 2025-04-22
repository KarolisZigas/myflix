import { Request } from "express";
import { Database, User } from "../types";

export const authorize = async (
    db: Database, 
    req: Request
): Promise<User | null> => {
    const token = req.get("X-CSRF-TOKEN");
    
    if (!token || !req.signedCookies.viewer) {
        return null;
    }

    const viewer = await db.users.findOne({
        _id: req.signedCookies.viewer
    });

    if ((!viewer || viewer.token !== token) && viewer?.token_last !== token) {
        return null;
    }

    return viewer;
}