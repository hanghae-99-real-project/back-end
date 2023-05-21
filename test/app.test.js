const request = require("supertest");
const app = require("./app");

describe("App", () => {
    it("should listen on the specified port", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toContain("running http://localhost:3000");
    });

});