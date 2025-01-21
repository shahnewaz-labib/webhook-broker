import express from 'express';

const app = express();

app.use(express.json());

let counter = 0;

app.post('/', (req, res) => {
  const randomFailure = Math.random() < 0.5;

  if (randomFailure) {
    console.log(500);
    res.status(500).json({ message: 'Internal Server Error' });
  } else {
    counter++;
    console.log(200);
    console.log(`Success Count: ${counter}`);
    res.status(200).json({ message: 'Success', payload: req.body });
  }
});

app.listen(3333, () => {
  console.log(`Mock server running on http://localhost:3333`);
});

app.listen(4444, () => {
  console.log(`Mock server running on http://localhost:4444`);
});
