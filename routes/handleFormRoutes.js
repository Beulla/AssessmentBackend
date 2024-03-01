module.exports=app=>{
    const business=require("../controllers/handleForm")
    var router=require("express").Router()
    router.post("/new",business.registration)
    
    app.use("/api/business",router)
}