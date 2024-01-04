import { setInterval } from 'timers';
import userModel from '../models/userModel.js';

const cronJob = () => {
  // OTP RESET
  const otpReset = async () => {
    console.log('OTP RESET RUN');
    const minsAgo = new Date(Date.now() - 1000 * 60 * 10);
    await userModel.updateMany({ createdAt: { $lte: minsAgo } }, { $unset: { otp: 1 } });
  };

  setInterval(() => {
    otpReset();
  }, 1000 * 60 * 20);
};
export default cronJob;
