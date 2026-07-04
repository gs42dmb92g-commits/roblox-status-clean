export default async function handler(req, res) {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: "missing placeId" });
  }

  try {
    // 1. placeId → universeId
    const uni = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );

    const uniData = await uni.json();
    const universeId = uniData?.universeId;

    if (!universeId) {
      return res.json({ name: "no universe", players: 0 });
    }

    // 2. universe → game data
    const game = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );

    const data = await game.json();
    const g = data?.data?.[0];

    res.json({
      name: g?.name || "unknown",
      players: g?.playing || 0
    });

  } catch (e) {
    res.json({ name: "error", players: 0 });
  }
}