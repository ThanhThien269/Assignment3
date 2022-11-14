var express = require('express');
var app=express();
var cors=require('cors');

app.use(cors());
app.listen(9001,function(){
    console.log('server is running...')
})
const {db}=require("./config/admin")

//Api
app.get("/api/courses", async(req,res)=>{
    // res.status(201).json(items)
    const courseRef =db.collection('courses');
    try{
        courseRef.get().then((snapshot)=>{
            const items = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }))
            console.log(items);
            res.status(201).json(items);
        })
    }catch(error){
        res.status(500).json({message:error});
    }
})