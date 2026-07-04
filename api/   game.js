module.exports = async (req, res) => {
  const { placeId } = req.query;

  try {
    const r = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${placeId}`
    );

    const text = await r.text();

    return res.status(200).send(text);
  } catch (e) {
    return res.status(500).send(String(e));
  }
};