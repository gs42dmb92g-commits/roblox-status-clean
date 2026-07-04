const express = require("express");
const app = express();

app.get("/game", async (req, res) => {
  const universeId = req.query.universeId;

  if (!universeId) {
    return res.json({ error: "missing universeId" });
  }

  try {
    const response = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );

    const data = await response.json();
    const game = data.data?.[0];

    if (!game) {
      return res.json({
        name: "Not Found",
        players: 0
      });
    }

    res.json({
      name: game.name,
      players: game.playing
    });

  } catch (e) {
    res.json({
      name: "Error",
      players: 0
    });
  }
});

module.exports = app;
