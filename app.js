const express=require("express");
const cors=require("cors");
const app=express();
const corsOptions={
    origin:"http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port=process.env.PORT||8080;
app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`);
})
require("./routes/handleFormRoutes")(app)