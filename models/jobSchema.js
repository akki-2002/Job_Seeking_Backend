import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title."],
    minLength: [3, "Job Title must contain at least 3 Characters!"],
    maxLength: [30, "Job Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide job decription."],
    minLength: [10, "Job Description must contain at least 10 Characters!"],
    maxLength: [500, "Job Description cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a Job category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a Job country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a Job city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide exact location."],
    minLength: [10, "Location must contian at least 10 characters!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed Salary must contain at least 4 digits"],
    maxLength: [9, "Fixed Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary From must contain at least 4 digits"],
    maxLength: [9, "Salary From cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary To must contain at least 4 digits"],
    maxLength: [9, "Salary To cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);