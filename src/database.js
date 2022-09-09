import dotenv from 'dotenv';
import { connect } from 'mongoose';

if (process.env.NODE_ENV !== 'production') dotenv.config();

(async () => {
  try {
    const db = await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected to', db.connection.name);
  } catch (error) {
    console.log('Can not connect to the database. ', error);
  }
})();

// 'mongodb://localhost:27017/myPortfolioDB'