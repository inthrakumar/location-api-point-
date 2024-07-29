import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('CORS configuration is set up!');
});

app.post('/api/ip-info', async (req, res) => {
  try {
    const { ip } = req.body;
    const response = await axios.get(
      `https://api.ip2location.io/?key=${process.env.LOCATION_API}&ip=${ip}&format=json`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
