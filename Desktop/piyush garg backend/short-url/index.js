const express=require('express');
const {connectToMongoDB}=require('./connect');
const urlRoute=require('./routes/url');
const URL=require('./models/url');
const PORT=8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDB connected"))
const app=express();

app.use(express.json());
app.use("/url",urlRoute);

app.get('/:shortID', async (req,res)=>{
    const shortId=req.params.shortID;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{timestamp:Date.now()},
        }
    })
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT: ${PORT}`);
})