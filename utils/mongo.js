/* This is a database connection function*/
import mongoose from 'mongoose'

function dbConnect() {
  if(mongoose.connections[0].readyState){
    console.log('Already connected.')
    return;
  }
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }, err => {
      if(err) throw err;
      console.log('Connected to mongodb.')
  })
  }
export default dbConnect

//mongoose.set("strictQuery", false);