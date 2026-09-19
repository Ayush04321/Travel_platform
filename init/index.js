// const mongoose=require("mongoose");
// const intiData=require("./data.js");
// const Listing=require("../models/listing.js");


// //DB CONNECTIVITY
// main()
// .then(()=>{
// console.log("database connnected");
// })
// .catch(err => console.log(err));
// async function main() {
//     const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
//   await mongoose.connect(MONGO_URL);
// }

// const initDB=async()=>{
//     // await Listing.deleteMany({});
//     // intiData.data=intiData.data.map((obj)=>({...obj,owner:"69e348f11aa156fb3e7b20d6"}))
//     await Listing.insertMany(intiData.data);
//     console.log("data initially saved ");
// }


// initDB();



const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL; 

main()
    .then(() => {
        console.log("Connected to Atlas successfully!");
        initDB();
    })
    .catch(err => console.log("Connection Error:", err));

async function main() {
    if (!dbUrl) {
        throw new Error("ATLASDB_URL is missing in your .env file!");
    }
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "69ef99a72052d8699cd103bc", // Your existing User ID
        geometry: {
            type: "Point",
            coordinates: [77.2090, 28.6139] // Default coordinates for map[cite: 11]
        }
    }));

    await Listing.insertMany(initData.data);
    console.log("All sample listings uploaded successfully!");
    mongoose.connection.close();
};