const mongoose=require("mongoose")

async function getData(){
    try{
        await mongoose.connect("mongodb://localhost:27017/appsinvo")
        console.log("Database connected");
    }
    catch(error){
        console.log("error",error);
    }
}
getData()