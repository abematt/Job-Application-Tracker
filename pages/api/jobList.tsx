import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import Job from "../../app/models/Job";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  console.log(method)
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const jobs = await Job.find({}).sort({ daysSince : 1 });

        res.status(200).json({ success: true, data: jobs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log("here")
        console.log(req.body)
        const job = await Job.create(req.body);
        
        console.log("i got here")

        res.status(201).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}