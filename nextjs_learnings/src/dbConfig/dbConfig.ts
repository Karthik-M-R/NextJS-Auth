import mongoose from "mongoose";

export async function connect(){
    try 
    {
      const mongoUri = process.env.MONGO_URI
      if(!mongoUri){
        console.log("MONGO_URI not set; skipping MongoDB connection (development).")
        return
      }

      await mongoose.connect(mongoUri)
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("Connected to MongoDB");
      });

      connection.on("error", (err) => {
        console.log("Error connecting to MongoDB"+err);
      });
    }
    catch(error){
        console.log("Something went wrong while connecting to the database");
        console.log(error)
         
    }
}