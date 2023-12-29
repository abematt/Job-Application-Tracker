import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("Jobs");

    const jobs = await db.collection("jobtracker").find({}).toArray();

    res.json(jobs);
  } catch (err) {
    console.error(err);
  }
}
