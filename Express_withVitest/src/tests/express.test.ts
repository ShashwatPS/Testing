import { describe, expect, test, it } from 'vitest';
import request from 'supertest';
import { app } from '../index';

describe("POST /sum",()=>{
    it("Should return the sum of two numbers", async()=>{
        const response = await request(app).post("/sum").send({a:1,b:2});
        expect(response.body.result).toBe(3);
        expect(response.status).toBe(200);
    })

    it("Should return Incorrect Inputes when the inputs are not numbers", async()=>{
        const response = await request(app).post("/sum").send({a:"a",b:"b"});
        expect(response.body.message).toBe("Incorrect Inputs");
        expect(response.status).toBe(411);
    })
})

describe("GET /sum",()=>{
    it("Should return the sum of two numbers", async()=>{
        const response = await request(app).get("/sum").set({
            a:"1",
            b:"2"
        });
        expect(response.body.result).toBe(3);
        expect(response.status).toBe(200);
    })

    it("Should return Incorrect Inputes when the inputs are not numbers", async()=>{
        const response = await request(app).get("/sum").set({
            a:"a",
            b:"b"
        });
        expect(response.body.message).toBe("Incorrect Inputs");
        expect(response.status).toBe(411);
    })
})