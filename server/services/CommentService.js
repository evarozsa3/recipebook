import {
    dbContext
} from "../db/DbContext";
import {
    BadRequest
} from "../utils/Errors";

class CommentService {
    async delete(id) {
        let comment = await dbContext.Comments.findByIdAndDelete(id)
        return comment
    }

    async getById(id) {
        let comment = await dbContext.Comments.findById(id).populate("userId")
        if (!comment) {
            throw new BadRequest("bad id")
        }
        return comment
    }

    async edit(id, body) {
        let comment = await dbContext.Comments.findByIdAndUpdate(id, body, {
            new: true
        })
        return comment
    }

    async create(body) {
        let comment = await dbContext.Comments.create(body)
        return comment
    }


    async getAll() {
        let comments = await dbContext.Comments.find().populate("userId")
        return comments
    }


    async find(query = {}) {
        let comments = await dbContext.Comments.find(query).populate("userId")
        return comments;
    }
    async findById(id) {
        let comment = await dbContext.Comments.findById(id).populate("userId")
        if (!comment) {
            throw new BadRequest("Invalid Id");
        }
        return comment;
    }
}

export const commentService = new CommentService();