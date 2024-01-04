import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const security = (app) => {
  //* ******* rate limiter: 300 req per 10 min ********* */
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false
  });
  app.use(limiter);

  //* ********* http security headers ************
  app.use(helmet());

  // data sanitization against NoSQL query injection
  app.use(mongoSanitize());
  // data sanitization against XSS
};
export default security;
