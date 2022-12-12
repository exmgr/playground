const request = require("supertest");
const app = require('../app');
require("dotenv").config();

let createdDeviceID = null;

beforeAll(async () => {
    await app.get("jwt_token")
});

describe("Device creation & deletion", () => {
    it("should create a new device", async () => {
        const data = {
            "name": "test-device-" + Date.now(),
            "label": "test-device-" + Date.now(),
        }
        const res = await request(app).post("/devices").send(data);
        createdDeviceID = res.body.id;
        expect(res.statusCode).toBe(201);
        expect(res.body.id.length).toBeGreaterThan(0);
    });
    it("should delete the newly created device", async () => {
        await request(app)
            .delete(`/devices/${createdDeviceID}`)
            .set("Authorization", `Bearer ${app.get("jwt_token")}`)
            .expect(200);
    });
});
