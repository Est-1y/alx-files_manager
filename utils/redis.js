import { promisify } from 'util';
import { createClient } from 'redis';

// Representing Redis client
class RedisClient {
  // Creating a new RedisClient instance.
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  // Checking if this client's connection to the Redis server is active.
  isAlive() {
    return this.isClientConnected;
  }

  // Retrieving the value of a given key.
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  // Storing key and its value along with an expiration time.
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  // Removing the value of a given key.
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

// export
export const redisClient = new RedisClient();
export default redisClient;
