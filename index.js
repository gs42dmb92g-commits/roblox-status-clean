module.exports = async (req, res) => {
  const { code } = req.query;

  try {
    const r = await fetch(
      `https://apis.roblox.com/universes/v1/resolve-share-links?shareLinks=${code}`
    );

    const data = await r.json();

    const placeId = data?.[0]?.rootPlaceId;

    res.json({
      placeId
    });

  } catch (e) {
    res.json({
      error: "failed"
    });
  }
};