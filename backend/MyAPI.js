var express = require('express');
var app=express();
var cors=require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
                docId: doc.id,
                ...doc.data()
            }))
            console.log(items);
            res.status(201).json(items);
        })
    }catch(error){
        res.status(500).json({message:error});
    }
})

app.get("/api/:keyword", async(req,res)=>{
    const courseRef =db.collection('courses');
    try {
        courseRef.get().then((snapshot) => {
            const data = snapshot.docs.map((value) => (
                {
                    id: value.id,
                    ...value.data(),
                }
            ));
            let key = req.params.keyword
            const newData = data.filter((item) => {
                const itemData = item.name
                    ? item.name.toLowerCase()
                    : ''.toLowerCase();
                const textData = key.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            res.status(200).json(newData);
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

app.get("/item/:name",async(req,res)=>{
    const name=req.body.name
    await db.collection("courses").get(name)
    .then((snapshot)=>{
        const items = snapshot.docs.map((doc)=>({
            docId: doc.id,
            ...doc.data()
        }))
        console.log(items);
        res.status(201).json(items);
    })
    
   
})

app.post("/item", async (req, res) => {
    const{name,price,img,cateID} =req.body;
    
    try{
        const body=db.collection('courses').doc();
        
        const item={
            pdid: Math.round(Math.random() * 10+1).toString() ,
            name:name,
            price:price,
            img:img,
            cateID:parseInt(cateID)
        }
        console.log('add',item)
       
        body.set(item);

        res.status(200).send({
            message:'successful',
            data:item
        })
    }catch(error){
        res.status(500).json({message:error });
    }
  
  });
  app.put("/update/:docId", async (req, res) => {
    const{name,price,img,cateID} =req.body;
    
    try{
        const docId=req.params.docId
        const body=db.collection('courses').doc(docId)
        
        const item={
            name:name,
            price:price,
            img:img,
            cateID:parseInt(cateID)
        }
        console.log('update',item)
       
        body.update(item);

        res.status(200).send({
            message:'successful',
            data:item
        })
    }catch(error){
        res.status(500).json({message:error });
    }
  
  });
  app.delete("/del/:docId", async (req, res) => {

    
    try{
        const docId=req.params.docId
        db.collection('courses').doc(docId).delete()
        res.status(200).send({
            message:'successful',
            
        })
    }catch(error){
        res.status(500).json({message:error });
    }
  
  });
  app.delete("/api/deleteAll/:name",async(req,res)=>{
    const params = req.params.name
    let querySnapshot=db.collection(params).get()
    .then((res)=>{
        res.forEach((element)=>{
            element.ref.delete();
        })
    })
    res.send(querySnapshot)
  })