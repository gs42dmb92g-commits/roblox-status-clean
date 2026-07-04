const express = require("express");
const app = express();

app.get("/game", async (req, res) => {
  const placeId = req.query.placeId;

  if (!placeId) {
    return res.json({ error: "missing placeId" });
  }

  try {
    // 1. placeId → universeId çevir
    const uniRes = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );

    const uniData = await uniRes.json();
    const universeId = uniData.universeId;

    // 2. oyun bilgisi çek
    const gameRes = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );

    const gameData = await gameRes.json();
    const game = gameData.data?.[0];

    res.json({
      name: game?.name || "Unknown",
      players: game?.playing || 0
    });

  } catch (e) {
    res.json({
      name: "Error",
      players: 0
    });
  }
});

module.exports = app;