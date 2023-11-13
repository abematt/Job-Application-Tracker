import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";
import  mongoosePaginate  from "mongoose-paginate-v2";

export interface Job extends mongoose.Document { 
    companyName: string
    jobPosition: string
    dateApplied: string
    status: string
    responseDate: string
    daysSince: number
    notes: string
}

const jobSchema = new Schema({
    companyName: {type: String},
    jobPosition: {type: String},
    dateApplied: {type: String},
    status: {type: String},
    responseDate: {type: String},
    daysSince: {type: Number},
    notes: {type: String},
});

jobSchema.plugin(mongoosePaginate);

export default mongoose.models.joblist || mongoose.model("joblist", jobSchema)