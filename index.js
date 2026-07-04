export default async function handler(req, res) {
  const { placeId } = req.query;

  if (!placeId) return res.json({ name: "missing", players: 0 });

  try {
    const r = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${placeId}`
    );

    const d = await r.json();
    const g = d?.data?.[0];

    return res.json({
      name: g?.name || "unknown",
      players: g?.playing || 0
    });

  } catch (e) {
    return res.json({ name: "error", players: 0 });
  }
}