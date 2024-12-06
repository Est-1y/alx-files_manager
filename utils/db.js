import mongodb from 'mongodb';
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

// Representing a MongoDB client
class DBClient {
  // Creating a new DBClient instance.
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  // Checking if this client's connection to the MongoDB server is active
  isAlive() {
    return this.client.isConnected();
  }

  // Retrieving the number of users in the db
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Retrieving the number of files in the db
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  // Retrieving a reference to the users
  async usersCollection() {
    return this.client.db().collection('users');
  }

  // Retrieving a reference to the files
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

// export
export const dbClient = new DBClient();
export default dbClient;
