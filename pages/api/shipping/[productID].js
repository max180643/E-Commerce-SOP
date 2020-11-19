export default (req, res) => {
  const {
    query: { productID },
  } = req;

  const data = [
    {
      id: 1,
      available: ['Kerry', 'DHL', 'Best Express'],
    },
    {
      id: 2,
      available: ['Shopee Express', 'Ninja Van'],
    },
  ];

  res.statusCode = 200;
  res.json(data[productID - 1] ? data[productID - 1] : { error: 'No shipping data' });
};
