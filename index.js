import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const rapidapiURL1 = "https://youtube138.p.rapidapi.com/channel/details/";
const rapidapiURL2 = "https://youtube138.p.rapidapi.com/video/details/";
const youtubeURL = "https://www.youtube.com/@";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  if (req.body.option === "channelInfo") {
    res.redirect("/channel-scraper");
  } else {
    res.redirect("/video-scraper");
  }
});

app.get("/channel-scraper", (req, res) => {
  res.render("channel.ejs");
});

app.post("/channel-scraper", async (req, res) => {
  var channel = req.body.cname;
  var response = await axios.get(rapidapiURL1, {
    params: {
      id: youtubeURL + channel,
      h1: "en",
      g1: "US",
    },
    headers: {
      "X-RapidAPI-Key": "300bd0dde6mshac26486321139dap106030jsna29950716ce2",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  });
  var result = response.data;
  res.render("channel.ejs", { data: result });
});

app.post("/video-scraper", async (req, res) => {
  var video = req.body.vname;
  var response = await axios.get(rapidapiURL2, {
    params: {
      id: video,
      h1: "en",
      g1: "US",
    },
    headers: {
      "X-RapidAPI-Key": "300bd0dde6mshac26486321139dap106030jsna29950716ce2",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  });
  var result = response.data;
  console.log(result);
  res.render("video.ejs", { data: result });
});

app.get("/video-scraper", (req, res) => {
  res.render("video.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
