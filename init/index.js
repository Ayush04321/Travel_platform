const mongoose=require("mongoose");
const intiData=require("./data.js");
const Listing=require("../models/Listing.js");


//DB CONNECTIVITY
main()
.then(()=>{
console.log("database connnected");
})
.catch(err => console.log(err));
async function main() {
    const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
  await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    intiData.data=intiData.data.map((obj)=>({...obj,owner:"69e348f11aa156fb3e7b20d6"}))
    await Listing.insertMany(intiData.data);
    console.log("data initially saved ");
}

initDB();
