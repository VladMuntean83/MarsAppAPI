import * as fs from 'fs';
import * as axios from 'axios';
import cron from 'node-cron';

const fetchPhotos = async () => {
    try {
        const resp = await axios.get('http://localhost:8000/rovers/curiosity/photos/fhaz');
        const myData: Object = resp.data;
        const now = new Date();

        const jsonToSend = {
            timestamp: now.toISOString(),
            photos: myData["photos"]
        };

        fs.writeFileSync('photoLogs.json', JSON.stringify(jsonToSend, null, 2));

        console.log("Wrote to file!");
    } catch (err) {
        console.error(err);
    }
};

// Run a request and write to file every 30 minutes
cron.schedule('*/30 * * * *', () => fetchPhotos);
