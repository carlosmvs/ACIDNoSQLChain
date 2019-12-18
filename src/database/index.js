import mongoose from 'mongoose'

class Database {
  constructor(){
    this.mongo()
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    )
  }
}

export default new Database()