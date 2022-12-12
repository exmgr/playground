const csvBatch = require('csv-batch');
const axios = require('axios');
const fs = require('fs');
const dotenv = require("dotenv")

dotenv.config()

async function main() {
    const deviceID = await registerDevice();
    await processCSV(deviceID)
}

async function processCSV(deviceID) {
    const fileStream = fs.createReadStream("./data.csv");
    await csvBatch(fileStream, {
        batch: true,
        batchSize: 500,
        batchExecution: batch => sendResults(deviceID, batch)
    }).then(results => {
        console.log(`Processed ${results.totalRecords}`);
    });
}

async function sendResults(deviceID, rows) {
    const telData = []
    for (const row of rows) {
        let dev = {
            "ts": row.timestamp,
            "values": {
                "temperature": row.temperature,
                "humidity": row.humidity,
                "pressure": row.pressure,
                "wind_speed": row.wind_speed,
                "wind_gust": row.wind_gust,
                "wind_direction": row.wind_direction
            }
        }
        telData.push(dev)
    }

    //send data to api
    await uploadTelemetryData(deviceID, telData)
}

async function registerDevice() {
    const data = JSON.stringify({
        "name": "ghal-" + Date.now(),
        "label": "ghal-" + Date.now(),
    });
    const port = process.env.PORT || 3000;

    const config = {
        method: 'post',
        url: `${process.env.WXM_BACKEND_URL}:${process.env.WXM_BACKEND_PORT}/devices`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios(config)
        .then(function (response) {
            // grab the device id.
            return response.data.id;
        })
        .catch(function (error) {
            console.log(error);
        });

}

async function uploadTelemetryData(deviceID, data) {
    const config = {
        method: 'post',
        url: `${process.env.WXM_BACKEND_URL}:${process.env.WXM_BACKEND_PORT}/telemetries/` + deviceID,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    return await axios(config)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
}

main().then(() => console.log("process completed!"));
