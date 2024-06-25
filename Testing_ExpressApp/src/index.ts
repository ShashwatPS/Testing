import express from 'express';

export const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const sum = a+b;
    res.status(200).json({ result: sum });
});

