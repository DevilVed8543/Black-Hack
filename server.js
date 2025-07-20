const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const app = express();
app.use(cors());

app.get("/api/period", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto("https://bdggame5.com", { waitUntil: "domcontentloaded" });

    // Adjust selector according to actual DOM
    const period = await page.evaluate(() => {
      const el = document.querySelector(".lottery .game .period");
      return el ? el.innerText.trim() : "Not found";
    });

    await browser.close();
    res.json({ period });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching period" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
