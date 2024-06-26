import express from 'express';
import { z } from 'zod';
import { db } from "./db"
import {parse} from "ts-jest";

export const app = express();
app.use(express.json());

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async (req, res) => {
  const parsedResponse = sumInput.safeParse(req.body);
  if(!parsedResponse.success){
    return res.status(411).json({ message: "Invalid Inputs" });
  }
  const answer = parsedResponse.data.a + parsedResponse.data.b;
  await db.sum.create({
      data:{
          a: parsedResponse.data.a,
          b: parsedResponse.data.b,
          result: answer
      }
  })
return res.status(200).json({ answer });
});

app.get("/sum", (req,res)=>{
    const parsedResponse = sumInput.safeParse({
        a: Number(req.headers['a']),
        b: Number(req.headers['b'])
    });
    if(!parsedResponse.success){
        return res.status(411).json({ message: "Invalid Inputs" });
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;
    return res.status(200).json({ answer });
})
