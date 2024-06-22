import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
    {
        title:{
            type: String,
            require: [true, 'titile is required']
        },
        description:{
            type: String,
            require: [true, 'descripe is required']
        }
    }
)

const NotesModel = mongoose.model('notes',notesSchema)

export default NotesModel;