export default (req, res) => {
  const {
    query: { shopID },
  } = req;

  const data = [
    {
      id: 1,
      name: 'Game & Toy Shop',
      image: '/images/shop/1/shop.png',
    },
    {
      id: 2,
      name: 'GMK Shop',
      image: '/images/shop/2/shop.png',
    },
  ];

  res.statusCode = 200;
  res.json(data[shopID - 1] ? data[shopID - 1] : { error: 'No shop data' });
};
