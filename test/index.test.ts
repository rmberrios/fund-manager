
import request from "supertest";
import app from "../src/app";

describe('index base URL', () => {
	it('should return a 200 status code', async () => {
		const response = await request(app)
			.get('/');

		expect(response.statusCode).toBe(200);
	});
});