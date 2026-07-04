export default async function handler(req, res) {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: "missing placeId" });
  }

  const r = await fetch(
    `https://games.roblox.com/v1/games?universeIds=${placeId}`
  );

  const data = await r.json();

  return res.status(200).json({
    name: data?.data?.[0]?.name ?? "unknown",
    players: data?.data?.[0]?.playing ?? 0
  });
}