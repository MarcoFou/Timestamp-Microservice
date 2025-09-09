// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  // caso: parámetro ausente -> fecha actual
  if (date === undefined) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // si es sólo dígitos, tratar como timestamp en ms
  const isNumeric = /^\d+$/.test(date);

  const parsedDate = isNumeric ? new Date(Number(date)) : new Date(date);

  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
