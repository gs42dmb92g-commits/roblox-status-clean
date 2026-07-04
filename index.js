module.exports = async (req, res) => {
  const { placeId } = req.query;

  try {
    // 1. universe al
    const u = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );

    const ujson = await u.json();
    const universeId = ujson.universeId;

    // 2. game çek
    const g = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );

    const data = await g.json();
    const game = data?.data?.[0];

    res.json({
      name: game?.name || "unknown",
      players: game?.playing || 0
    });

  } catch (e) {
    res.json({
      name: "error",
      players: 0
    });
  }
};