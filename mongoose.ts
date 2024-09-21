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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
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

const tourTest = new Tour({
  name: "Explore Bravos",
  price: 372,
  ratings: 5.0
})

tourTest.save().then(doc => {
  console.log(doc)
}).catch(err => console.error(err))

const DBConnections = {
  connectDB,
  connectDBLocal
}

export default DBConnections
