import mongoose from "mongoose";

const timeLogSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: Date,

    duration: {
      type: Number, // seconds
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Timelog", timeLogSchema);
