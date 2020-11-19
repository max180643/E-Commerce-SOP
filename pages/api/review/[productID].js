export default (req, res) => {
  const {
    query: { productID },
  } = req;

  const data = [
    {
      id: 1,
      reviews: [
        {
          user: 'user1',
          rate: 5,
          comment: 'ดีมากครับ',
          option: 'ม่วงส้ม PurpleOrange',
        },
        {
          user: 'user2',
          rate: 4,
          comment: 'สีสวยมาก ถูกใจเลย',
          option: 'เขียวชมพู GreenPink',
        },
        {
          user: 'user3',
          rate: 1,
          comment: 'กล่องขาด เหมือนโดนแกะ',
          option: 'แดงฟ้า Neon',
        },
      ],
    },
  ];

  res.statusCode = 200;
  res.json(data[productID - 1] ? data[productID - 1] : { error: 'No review data' });
};
