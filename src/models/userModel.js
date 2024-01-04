import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true
    },
    username: {
      type: String,
      unique: true,
      require: true
    },
    number: {
      type: String
    },
    password: {
      type: String,
      select: false
    },
    is_active: {
      type: Boolean,
      default: false
    },
    otp: {
      type: Number,
      default: Math.floor(Math.random() * 10000)
    },
    payment: {
      date: {
        type: String
      },
      plan: {
        type: String
      },
      id: {
        type: String
      },
      status: {
        type: String
      },
      invoice: {
        type: String
      }
    },
    download: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const userModel = model('user', userSchema);
export default userModel;
