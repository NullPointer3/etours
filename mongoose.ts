import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1); 
  }
};

const connectDBLocal = (): Promise<void> => { 
  return mongoose.connect(process.env.DATABASE_LOCAL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then((conn) => console.log(`MongoDB connected: ${conn.connection.host}`))
  .catch(err => console.error(`Error: ${err}`))
}

const DBConnections = {
  connectDB,
  connectDBLocal
}

export default DBConnections
