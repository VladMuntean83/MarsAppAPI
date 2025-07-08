import express from "express";
import axios from "axios";

const NASA_KEY = "26LavwLhD6YneXtJKDW1IhKx8ncitgYLebCyF7zY";
const rover_body = 'https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=';

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

// Send hello for debug
router.get('/test', (req: any, res: any) => res.send('Hello Vlad !'));

// Fetch rover data from NASA API
router.get('/rovers', async (req: any, res: any) =>
    {
        try {
            const resp = await axios.get(rover_body + NASA_KEY);
            res.json(resp.data);
        } catch (e) {
            res.status(500).json({'Something went wrong': e});
        }
    }
);

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
