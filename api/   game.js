module.exports = async (req, res) => {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: "missing placeId" });
  }

  try {
    // 1. universe bul
    const u = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );

    const ujson = await u.json();
    const universeId = ujson?.universeId;

    if (!universeId) {
      return res.status(404).json({ error: "universe not found" });
    }

    // 2. game çek
    const g = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );

    const data = await g.json();
    const game = data?.data?.[0];

    return res.status(200).json({
      name: game?.name || "unknown",
      players: game?.playing || 0
    });

  } catch (e) {
    return res.status(500).json({
      error: "server crash",
      detail: String(e)
    });
  }
};