import chalk from 'chalk';
import Stripe from 'stripe';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getAUser = async (req, res) => {
  try {
    console.log('red.headers.id', req.headers.id);
    const data = await userModel.find({ _id: req.headers.id });
    res.status(200).send({ success: true, msg: 'success', data });
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message));
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.status(200).send({ success: true, msg: 'success', data });
  } catch (error) {
    console.log(chalk.bgRed.bold(error?.message));
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};

export const createPayment = async (req, res) => {
  try {
    console.log('payload', req?.body);
    const price = await stripe.prices.create({
      currency: 'usd',
      unit_amount: req?.body?.amount * 100,
      recurring: {
        interval: 'month'
      },
      product_data: {
        name: `${req?.body?.title} Plan`
      }
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env?.SERVER_URL}/user/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env?.APP_URL}/panel/plans`,
      client_reference_id: req?.headers?.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price?.id,
          quantity: 1
        }
      ],
      mode: 'subscription'
    });

    res.status(200).send({ success: true, msg: 'success', data: { url: session?.url } });
  } catch (error) {
    console.log(chalk.bgRed.bold(error));
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const payload = {
      id: session?.id,
      plan: session?.amount_total / 100,
      date: new Date(),
      status: session?.payment_status,
      invoice: session?.invoice
    };
    console.log('payload', payload);
    console.log('id', session?.client_reference_id);
    await userModel.updateOne(
      { _id: session?.client_reference_id },
      { $set: { payment: payload } }
    );
    res.redirect(`${process.env.APP_URL}/panel/home`);
  } catch (error) {
    console.log(chalk.bgRed.bold(error));
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};

export const updateDownload = async (req, res) => {
  try {
    console.log(' req?.headers?.id', req?.headers?.id);
    const data = await userModel.updateOne(
      { _id: req?.headers?.id },
      { $inc: { download: 1 } }
    );
    if (data?.modifiedCount > 0) {
      res.status(200).send({ success: true, msg: 'success', data: {} });
    } else {
      res.status(200).send({ success: false, msg: 'success', data: {} });
    }
  } catch (error) {
    console.log(chalk.bgRed.bold(error));
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};
