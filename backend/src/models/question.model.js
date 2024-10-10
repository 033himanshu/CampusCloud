import mongoose, {Schema} from "mongoose";

const questionSchema = new Schema({
    question : {
        type : String,
        required: true,
    }, 
    options : {
        type : [String],
        required: true,
    },
    correctOptions : {
        type : [String],
        required: true,
    },
}, {timestamps:true})



export const Question = mongoose.model("Question", questionSchema)