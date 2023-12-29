import { MongoClient } from "mongodb";

const DATABAUSE_URI = process.env.DATABASE_URL;

let client;
let clientPromise: any;

if (!DATABAUSE_URI) {
  throw new Error("Add Mongo URL to enviornment");
}

client = new MongoClient(DATABAUSE_URI);
clientPromise = client.connect();

export default clientPromise;
