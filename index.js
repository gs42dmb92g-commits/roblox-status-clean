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
    const game = data?.data?.[0];

    res.json({
      name: game?.name || "Unknown",
      players: game?.playing || 0
    });

  } catch (err) {
    res.json({
      name: "Error",
      players: 0
    });
  }
});

module.exports = app;