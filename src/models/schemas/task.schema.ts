import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      minlength: 10,
      maxlength: 60,
      required: true,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    enable: {
      type: Boolean,
      default: true,
      minlength: 3,
      maxlength: 4,
    },
    deleted: {
      type: Boolean,
      default: false,
      minlength: 3,
      maxlength: 4,
    },
  },
  {collation: {locale: "en_US", strength: 1}}
);

const Task = mongoose.model("Task", taskSchema);
export {Task};
