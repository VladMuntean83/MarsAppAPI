import express from "express";
import axios from "axios";
require("dotenv").config();
import { Rover } from "./Rover";
import {Photo} from "./Photo";

const roverBody = 'https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=';

const roverName = 'curiosity';
const camera = 'fhaz';
const sol = '1000';

console.log(process.env.NASA_KEY);

const roverCameraBody = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos`;
const roverCameraParams = `?sol=${sol}&camera=${camera}&api_key=${process.env.NASA_KEY}`;

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
            const resp = await axios.get(roverBody + process.env.NASA_KEY);
            // res.json(resp.data);

            const roverList: Rover[] = [];
            for (const roverResponse of resp.data["rovers"])
                roverList.push(new Rover(roverResponse));

            res.json({ photos: roverList });

        } catch (e) {
            res.status(500).json({'Something went wrong': e});
        }
    }
);

// Fetch images by rover and camera name
router.get(`/rovers/${roverName}/photos/${camera}`, async (req: any, res: any) =>
    {
        try {
            const resp = await axios.get(roverCameraBody + roverCameraParams);
            // res.json(resp.data);

            const photoList: Photo[] = [];
            for (const photoResponse of resp.data["photos"])
                photoList.push(new Photo(photoResponse));

            res.json({ rovers: photoList });

        } catch (e) {
            res.status(500).json({'Something went wrong': e});
        }
    }
);

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
