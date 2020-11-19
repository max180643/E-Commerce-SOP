export default (req, res) => {
  const {
    query: { productID },
  } = req;

  const data = [
    {
      id: 1,
      name: 'Nintendo Switch™ Joy-Con Controllers',
      description: 'Nintendo Switch™ Joy-Con Controllers สินค้าของแท้ กล่องญี่ปุ่น',
      image: '/images/1/redcyan.jpeg',
      category: {
        id: 1,
        name: 'Gaming',
      },
      brand: {
        id: 1,
        name: 'Nintendo',
      },
      shop: {
        id: 1,
      },
      options: [
        {
          id: 1,
          name: 'แดงฟ้า Neon',
          price: 2490,
          image: '/images/1/RedCyan.jpeg',
          weight: 0.049,
        },
        {
          id: 2,
          name: 'ม่วงส้ม PurpleOrange',
          price: 2500,
          image: '/images/1/PurpleOrange.jpeg',
          weight: 0.049,
        },
        {
          id: 3,
          name: 'เขียวชมพู GreenPink',
          price: 2590,
          image: '/images/1/GreenPink.jpeg',
          weight: 0.049,
        },
      ],
    },
    {
      id: 2,
      name: 'Nintendo Switch V2 (Neon)',
      description: 'เครื่องนอกประกันร้าน สินค้าของแท้',
      image: '/images/2/switch.jpg',
      category: {
        id: 1,
        name: 'Gaming',
      },
      brand: {
        id: 1,
        name: 'Nintendo',
      },
      shop: {
        id: 2,
      },
      options: [
        {
          id: 1,
          name: 'แดงฟ้า Neon',
          price: 10990,
          image: '/images/2/switch.jpg',
          weight: 0.297,
        },
      ],
    },
  ];

  res.statusCode = 200;

  if (productID === 'all') {
    res.json(data);
  } else {
    res.json(data[productID - 1] ? data[productID - 1] : { error: 'No product data' });
  }
};
