// imports
import express from 'express';
import router from './routes/index';

const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();
// router
app.use(express.json());
app.use('/', router);

// listen to server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// export
export default app;
