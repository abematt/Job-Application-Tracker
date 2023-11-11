import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import Job from "../../app/models/Job";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const jobs = await Job.find({});

        res.status(200).json({ success: true, data: jobs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const job = await Job.create(req.body);

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