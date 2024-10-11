import mongoose, {Schema} from "mongoose";

const quizSchema = new Schema({
    material : {
        required: true,
        type : Schema.Types.ObjectId,
        ref : "Material",
    },
    student : {
        required: true, 
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    answers : {
        type : [String],
    },
    score : {
        type : Number,
        default : 0,
    },
}, {timestamps:true})



export const Quiz = mongoose.model("Quiz", quizSchema)