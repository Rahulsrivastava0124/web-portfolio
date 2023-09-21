const express=require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app=express();
const port=3000;

mongoose.connect('mongodb+srv://rahulranjeetusha123mom:sXpBJdnustbe4YmY@portfolio.rqgukiq.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));

  const contactSchema={
    name:String,
    email:String,
    message:String,
    subject:String,
  }

  const Contact=mongoose.model('Contact',contactSchema);

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post('/contact',async (req,res)=>{
  console.log(req.body);
   const contact=new Contact({
    name:req.body.name,
    email:req.body.email,
    message:req.body.message,
    subject:req.body.subject,
  });

  await contact.save((err)=>{
    if(err){console.log(err);}
    else{ console.log("all ok");}
  })

  res.redirect('/');
})

app.listen(port,()=>{
    console.log("Server is running on port 3000");
})