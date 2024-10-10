import mongoose, {Schema} from "mongoose";

const materialSchema = new Schema({
    classRef : {
        required: true,
        type : Schema.Types.ObjectId,
        ref : "Class",
    },
    file : {
        type : String,
    },
    questions : {
        type : [Schema.Types.ObjectId],
        ref : "Question",
    },
    materialType : {
        type : String,
        enum : ["test", "material"],
        required: true,
    },
    info : {
        type : String,
        required : true,
    },
}, {timestamps:true})



export const Material = mongoose.model("Material", materialSchema)