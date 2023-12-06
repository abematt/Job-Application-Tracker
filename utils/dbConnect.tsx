import mongoose from 'mongoose';

let MONGODB_URI = process.env.DATABASE_URL;

if(MONGODB_URI===undefined) {
    throw new Error('Define the MongoDB connection details in environmental variable')
}



let cached = global.mongoose

if(!cached) {   
    cached = global.mongoose = { conn:null, promise:null }
}

async function dbConnect() {
    if(cached.conn) {
        return cached.conn
        
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands:false,
        }

        cached.promise = mongoose.connect(MONGODB_URI = MONGODB_URI as string, opts).then((mongoose) => {
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