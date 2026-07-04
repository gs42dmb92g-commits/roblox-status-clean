const express = require("express");
const app = express();

app.get("/game", async (req, res) => {
  const placeId = req.query.placeId;

  if (!placeId) {
    return res.json({ error: "missing placeId" });
  }

  try {
    const response = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${placeId}`
    );

    const data = await response.json();

    console.log(data); // DEBUG (Vercel loglarda görürsün)

    const game = data?.data?.[0];

    if (!game) {
      return res.json({
        name: "No Data Found",
        players: 0
      });
    }

    res.json({
      name: game.name,
      players: game.playing
    });

  } catch (e) {
    res.json({
      name: "API Error",
      players: 0
    });
  }
});

module.exports = app;