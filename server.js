const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/period', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://bdggame5.com/');

    await page.waitForSelector('.game-id'); // Make sure this selector is correct

    const period = await page.$eval('.game-id', el => el.innerText.trim());

    await browser.close();
    res.send(period);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching period');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});