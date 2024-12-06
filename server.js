// Imports
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// increasing size limit to 10M
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// router
app.use(express.json());
app.use('/', router);

// listening to the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// export
export default app;
