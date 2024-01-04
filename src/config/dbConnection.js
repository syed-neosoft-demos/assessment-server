import chalk from 'chalk';
import { connect } from 'mongoose';

export const dbConnection = async () => {
  try {
    const con = await connect(process.env.MONGO_URI);

    console.log(chalk.bgGreen.bold('DB Connection Successful'));
    console.log(chalk.bgGreen.bold('DB Host:', con?.connection?.host));
    console.log(chalk.bgGreen.bold('DB Name:', con?.connection?.name));
  } catch (error) {
    console.log(chalk.bgRed.bold(error));
    process.exit(0);
  }
};
