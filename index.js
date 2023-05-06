//importation des bibliotheque
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Note = require("./note")

//initiation du serveur et du base de donnee
mongoose.connect("mongodb+srv://tochire:test1234@cluster0.ybdgd.mongodb.net/test")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//creation de note
app.post("/create",async(req,res)=>{
    const note = new Note({userId:req.body.userId,content:req.body.content,title:req.body.title})
    await note.save()
    res.status(200).send()
})
//dele note
app.post("/delete",async(req,res)=>{
     await Note.deleteOne({title:req.body.title})
    res.status(200).send()
})
//update note
app.post("/update",async(req,res)=>{
    const note = await Note.findOne({title:req.body.title})
    note.title = req.body.title
    note.content = req.body.content
    await note.save()
    res.status(200).send()
})
//retrieve notes
app.get("/Notes",async(req,res) =>{
    const notes = await Note.find({userId:req.body.userId})
    res.send(notes)
})


app.listen(4000)
