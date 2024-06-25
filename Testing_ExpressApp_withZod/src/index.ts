import express =  require('express');
import { z } from 'zod';
export const app = express();
app.use(express.json());

const sumSchema = z.object({
    a: z.number(),
    b: z.number(),
});

app.post('/sum', (req, res) => {
    const parsedResponse = sumSchema.safeParse(req.body);
    if (!parsedResponse.success) {
        res.status(411).json({ message: "Incorrect Inputs"});
    }
    const answer = parsedResponse.data.a + parsedResponse.data.b;
    res.status(200).json({ result: answer });
});

app.get('/sum',(req,res)=>{
    const pparsedResponse = sumSchema.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    });
    if (!pparsedResponse.success) {
        res.status(411).json({ message: "Incorrect Inputs"});
    }
    const answer = pparsedResponse.data.a + pparsedResponse.data.b;
    res.status(200).json({ result: answer });
})
