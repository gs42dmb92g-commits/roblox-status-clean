const express = require("express");
const app = express();

app.get("/game", async (req, res) => {
  const placeId = req.query.placeId;

  if (!placeId) {
    return res.json({ error: "missing placeId" });
  }

  try {
    // 1. universe çek
    const uniRes = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );

    const uniData = await uniRes.json();
    const universeId = uniData?.universeId;

    if (!universeId) {
      return res.json({
        name: "Invalid PlaceId",
        players: 0
      });
    }

    // 2. game çek
    const gameRes = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );

    const gameData = await gameRes.json();
    const game = gameData?.data?.[0];

    // 3. SAFETY FALLBACK (EN ÖNEMLİ KISIM)
    if (!game || !game.name) {
      return res.json({
        name: "Private/Unavailable Game",
        players: 0
      });
    }

    res.json({
      name: game.name,
      players: game.playing || 0
    });

  } catch (e) {
    res.json({
      name: "API Error",
      players: 0
    });
  }
});

module.exports = app;