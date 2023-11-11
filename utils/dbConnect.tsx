import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL;

if(!MONGODB_URI) {
    throw new Error('Define the MongoDB connection details in environmental variable')
}

let cached = global.mongoose

if(!cached) {   
    cached = global.mongoose = { conn:null, promise:null }
}

async function dbConnect() {
    if(cached.conn) {
        console.log(cached.conn)
        console.log("hi")
        return cached.conn
        
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands:false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log(mongoose)
            return mongoose
        })
    }
    try{
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
   
}

export default dbConnect