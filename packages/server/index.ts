import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

const port = process.env.PORT || 300;

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

// 37
