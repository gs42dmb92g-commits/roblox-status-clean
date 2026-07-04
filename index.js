export default async function handler(req, res) {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: "missing placeId" });
  }

  try {
    const r = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${placeId}`
    );

    const data = await r.json();

    const game = data?.data?.[0];

    return res.status(200).json({
      name: game?.name ?? "unknown",
      players: game?.playing ?? 0
    });

  } catch (e) {
    return res.status(500).json({
      error: "server error"
    });
  }
}