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

  let dateObj;
  
  if (!date) {
    dateObj = new Date();
  } else {
    // Check if it's a Unix timestamp (numeric string)
    if (/^\d+$/.test(date)) {
      dateObj = new Date(parseInt(date));
    } else {
      dateObj = new Date(date);
    }
  }

  if (isNaN(dateObj.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});