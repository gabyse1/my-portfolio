import { connect } from 'mongoose';

(async () => {
  try {
    const db = await connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/myPortfolioDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected to', db.connection.name);
  } catch (error) {
    console.log('Can not connect to the database. ', error);
  }
})();