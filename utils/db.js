// import
import { MongoClient } from 'mongodb';

// class DBClient
class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // connecting to server
    this.client.connect((err) => {
      if (err) {
        console.error(`MongoDB client not connected to the server: ${err}`);
      }
    });
    this.db = this.client.db(`${database}`);
  }

  // check connection status
  isAlive() {
    return this.client.isConnected();
  }

  // nb users
  async nbUsers() {
    const users = this.db.collection('users');
    const usersNum = await users.countDocuments();
    return usersNum;
}

  async nbFiles() {
    const files = this.db.collection('files');
    const filesNum = await files.countDocuments();
    return filesNum;
  }
}

// export db
const dbClient = new DBClient();
export default dbClient;
