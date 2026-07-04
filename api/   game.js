module.exports = async (req, res) => {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: "missing placeId" });
  }

  try {
    const r = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${placeId}`
    );

    const data = await r.json();

    if (!data || !data.data || !data.data[0]) {
      return res.status(404).json({
        error: "game not found"
      });
    }

    const game = data.data[0];

    return res.status(200).json({
      name: game.name,
      players: game.playing || 0
    });

  } catch (e) {
    return res.status(500).json({
      error: "fetch failed",
      detail: String(e)
    });
  }
};