import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      minlength: 10,
      maxlength: 60,
      required: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{3,4})?$/,
        "Please fill a valid email address",
      ],
    },
    token: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 50,
      trim: true,
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

const User = mongoose.model("User", userSchema);
export {User};
