export default (req, res) => {
  const {
    query: { productID },
  } = req;

  const data = [
    {
      reviews: [
        {
          id: 1,
          rank: 5,
          content: 'ดีมากครับ',
          photo: '/review/1/review.jpg',
          product_id: 1,
          username: 'user1',
        },
        {
          id: 2,
          rank: 4,
          content: 'สีสวยมาก ถูกใจเลย',
          photo: '/review/1/review.jpg',
          product_id: 1,
          username: 'user2',
        },
        {
          id: 3,
          rank: 1,
          content: 'กล่องขาด เหมือนโดนแกะ',
          photo: '/review/1/review.jpg',
          product_id: 1,
          username: 'user3',
        },
      ],
    },
  ];

  res.statusCode = 200;
  res.json(data[productID - 1] ? data[productID - 1] : { error: 'No review data' });
};
