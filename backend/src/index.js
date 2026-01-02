import dotenv from 'dotenv';
import connectDB from './db/index.js';
import {app} from './app.js'
import mongoose from 'mongoose';

dotenv.config({
    path: './env'
})

connectDB()
   .then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    })
   })
   .catch((err) => {
        console.log("Mongodb connection failed !!!:", err)
   })