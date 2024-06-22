import express from 'express';
import mongoose from 'mongoose';
import NotesModel from './models/notesmodule.js';

const app = express();

app.use(express.json());

const port = 2525;
//serverka kici
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
//databaseka kuxirmo
mongoose.connect("mongodb+srv://mohamedamiinabdi12:mohamedamiinabdi12@mytasks.tdo44ij.mongodb.net/Notesdatabase?retryWrites=true&w=majority&appName=Mytasks").then(
    console.log("conntected to the database succesfully")
).catch(
    (e)=>{
        console.log(e)
    }
)

app.post('/post',async(req,res)=>{
    const {title, description} = req.body;
    const newNote = new NotesModel({title,description});
    const note = await newNote.save();
    res.status(201).json(note);
})


app.get('/get', async(req,res)=>{
    const note = await NotesModel.find()
    res.status(200).json(note)
})


app.put('/update/:id', async(req,res)=>{
    const {title, description} = req.body;
    const note = await NotesModel.findById(req.params.id)
    if(note){
        note.title = title,
        note.description = description
        const updatednote = await note.save()
        res.status(200).json(updatednote)
    }
   
})

app.delete('/delete/:id', async(req,res)=>{
    const note = await NotesModel.findByIdAndDelete(req.params.id)
    res.status(200).json({"massage": "successfuly deleted"})
})

