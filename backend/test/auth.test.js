const authService = require("../src/services/auth.service");
require("dotenv").config();

describe("Authentication", () => {
    it("Should login & receive a jwt token", async () => {
        const token = await authService.login();
        expect(token).not.toBeNull();
        const pattern = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gi.test(token)
        expect(pattern).toBe(true);
    });
});
