const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sendMail = require('./services/mailService');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', { status: null });
});

app.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await sendMail(to, subject, message);
    res.render('index', { status: 'Email sent successfully!' });
  } catch (error) {
    res.render('index', { status: 'Failed to send email. ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
