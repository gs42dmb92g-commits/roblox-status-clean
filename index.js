module.exports = async (req, res) => {
  const { placeId } = req.query;

  try {
    const u = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );

    const ujson = await u.json();
    const universeId = ujson?.universeId;

    const g = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );

    const data = await g.json();
    const game = data?.data?.[0];

    res.json({
      name: game?.name,
      players: game?.playing
    });

  } catch (e) {
    res.json({
      name: "error",
      players: 0
    });
  }
};