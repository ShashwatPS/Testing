import {describe, expect, test, it} from '@jest/globals';
import request from "supertest";
import { app } from "../index";

describe("POST /",()=>{
    it("Should return 3 when 1+2",async()=>{
        const response = await request(app).post("/").send({a:1,b:2});
        expect(response.body.result).toBe(3);
        expect(response.status).toBe(200);
    });

    it("Should return -3 when -1-2", async()=>{
        const response = await request(app).post("/").send({a:-1,b:-2});
        expect(response.body.result).toBe(-3);
        expect(response.status).toBe(200);
    })

    it("Should be 0 when 0+0", async()=>{
        const response = await request(app).post("/").send({a:0,b:0});
        expect(response.body.result).toBe(0);
        expect(response.status).toBe(200);
    })
})