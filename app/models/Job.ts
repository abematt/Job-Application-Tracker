import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

export interface Job extends mongoose.Document { 
    companyName: string
    jobPosition: string
    dateApplied: Date
    status: string
    responseDate: string
    daysSince: number
    notes: string
}

const jobSchema = new Schema({
    companyName: {type: String},
    jobPosition: {type: String},
    dateApplied: {type: Date},
    status: {type: String},
    responseDate: {type: String},
    daysSince: {type: Number},
    notes: {type: String},
});

export default mongoose.models.joblist || mongoose.model("joblist", jobSchema)