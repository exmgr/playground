const assert = require("assert");
const request = require("supertest");
const app = require('../app');
require("dotenv").config();

let createdDeviceID = null;

beforeAll(async () => {
    // wait for jwt token to be generated.
    await app.get("jwt_token")

    // create a device.
    const data = {
        "name": "test-device-" + Date.now(),
        "label": "test-device-" + Date.now(),
    }
    const res = await request(app).post("/devices").send(data);
    createdDeviceID = res.body.id;
});

afterAll(async () => {
    // delete the previously created device.
    await request(app)
        .delete(`/devices/${createdDeviceID}`)
        .set("Authorization", `Bearer ${app.get("jwt_token")}`)
        .expect(200);
});


let sampleTelemetryData = [{
    "ts": 1670608860310,
    "values": {
        "temperature": 20,
        "humidity": 50,
        "pressure": 1,
        "wind_speed": 10,
        "wind_gust": 0.5,
        "wind_direction": 100
    }
}, {
    "ts": 1670609860310,
    "values": {
        "temperature": 10,
        "humidity": 25,
        "pressure": 0.5,
        "wind_speed": 5,
        "wind_gust": 0.25,
        "wind_direction": 50
    }
}];

describe("Upload/Download telemetries", () => {
    it("should upload device telemetries", async () => {
        const res = await request(app).post("/telemetries/" + createdDeviceID).send(sampleTelemetryData);
        expect(res.statusCode).toBe(201);
    });
    it("should download telemetries for the device", async () => {
        const res = await request(app).get("/telemetries/" + createdDeviceID);
        expect(res.statusCode).toBe(200);
        assert(res.body, {
            "temperature": [
                {
                    "ts": 1670610660310,
                    "value": "30"
                }
            ],
            "humidity": [
                {
                    "ts": 1670610660310,
                    "value": "75"
                }
            ],
            "pressure": [
                {
                    "ts": 1670610660310,
                    "value": "1.5"
                }
            ],
            "wind_speed": [
                {
                    "ts": 1670610660310,
                    "value": "15"
                }
            ],
            "wind_gust": [
                {
                    "ts": 1670610660310,
                    "value": "0.75"
                }
            ],
            "wind_direction": [
                {
                    "ts": 1670610660310,
                    "value": "150"
                }
            ]
        });
    });
});


