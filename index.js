
const express = require("express");
const app = express();

app.get("/game", async (req, res) => {
  const placeId = req.query.placeId;

  if (!placeId) {
    return res.json({ error: "missing placeId" });
  }

  try {
    const r = await fetch(
      `https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`
    );

    const data = await r.json();

    const game = data?.[0];

    res.json({
      name: game?.name || "unknown",
      players: game?.playing || 0
    });

  } catch (e) {
    res.json({ name: "error", players: 0 });
  }
});

module.exports = app;