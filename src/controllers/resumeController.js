import chalk from 'chalk';
import mongoose from 'mongoose';
import resumeModel from '../models/resumeModel.js';

export const createResume = async (req, res) => {
  try {
    const body = req.body;
    console.log('req.file', req.file);
    console.log('req.image', req.image);
    const userId = new mongoose.Types.ObjectId(req.headers.id);
    const payload = {
      ...body,
      about: {
        full_name: body?.full_name,
        title: body?.title,
        description: body?.description,
        image: req?.file?.filename
      }
    };
    const data = await resumeModel.create({ ...payload, user_id: userId });

    res.status(200).send({ success: true, msg: 'success', data });
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message), error);
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};
export const updateResume = async (req, res) => {
  try {
    const body = req.body;
    const resumeId = new mongoose.Types.ObjectId(body?._id);
    const isExist = await resumeModel.findOne({ _id: resumeId });
    if (isExist?.about) {
      const userId = new mongoose.Types.ObjectId(req.headers.id);
      const payload = {
        ...body,
        about: {
          full_name: body?.full_name,
          title: body?.title,
          description: body?.description,
          image: body?.image ?? req?.file?.filename
        },
        user_id: userId
      };
      delete payload?._id;
      const data = await resumeModel.updateOne({ _id: resumeId }, { $set: payload });
      if (data?.modifiedCount === 1) {
        res.status(200).send({ success: true, msg: 'resume update successful' });
      } else {
        res.status(200).send({ success: true, msg: 'no record updated' });
      }
    } else {
      res.status(404).send({ success: false, msg: 'no resume found with given id' });
    }
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message), error);
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};
export const getAllResume = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.headers.id);
    const data = await resumeModel.find({ user_id: userId });
    res.status(200).send({ success: false, msg: 'success', data });
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message), error);
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};
export const getResume = async (req, res) => {
  try {
    const data = await resumeModel.find({ user_id: req.headers.id });

    res.status(200).send({ success: false, msg: 'success', data });
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message), error);
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};
