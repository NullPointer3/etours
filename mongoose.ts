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
    process.exit(1); // Exit the process if the connection fails
  }
};

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name']
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  ratings: {
    type: Number,
    default: 4
  }
})

const Tour = mongoose.model('Tour', tourSchema)

export default connectDB;
