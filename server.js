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

  let d;
  if (!date) {
    d = new Date();
  } else if (/^\d+$/.test(date)) {
    d = new Date(Number(date));
  } else {
    d = new Date(date);
  }

  if (d.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: d.getTime(),
    utc: d.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
