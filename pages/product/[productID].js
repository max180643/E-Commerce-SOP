import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Col, Row, Image, Card, Button, Badge, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import axios from 'axios';

const product = () => {
  const router = useRouter();
  const { productID } = router.query;
  const [Product, setProduct] = useState(undefined);
  const [Shipping, setShipping] = useState(undefined);
  const [Shop, setShop] = useState(undefined);
  const [Price, setPrice] = useState(undefined);
  const [ItemImage, setItemImage] = useState(undefined);
  const [Review, setReview] = useState(undefined);

  const optionHandle = (id) => {
    setPrice(`฿${Product.options[id - 1].price}`);
    setItemImage(Product.options[id - 1].image);
  };

  useEffect(() => {
    if (productID !== undefined) {
      const productData = axios.get(`/api/product/${productID}`);
      const shippingData = axios.get(`/api/shipping/${productID}`);
      const reviewData = axios.get(`/api/review/${productID}`);

      axios.all([productData, shippingData, reviewData]).then(axios.spread((...responses) => {
        const productResponse = responses[0].data;
        const shippingResponse = responses[1].data;
        const reviewResponse = responses[2].data;

        setProduct(productResponse);
        setShipping(shippingResponse);
        setReview(reviewResponse);
        return productResponse;
      })).then((data) => {
        try {
          axios.get(`/api/shop/${data.shop.id}`).then((res) => {
            setShop(res.data);
          });
        } catch (error) {
          router.push('/');
        }
      });
    }
  }, [productID]);

  if (Product !== undefined && Shop !== undefined) {
    const optionData = Product.options;
    const minPrice = Math.min(...optionData.map((el) => el.price));
    const maxPrice = Math.max(...optionData.map((el) => el.price));
    return (
      <div>
        <Head>
          <title>Product | E-Commerce</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <Row className="mt-3">
          <Col lg={3}>
            <Card>
              <Image src={ItemImage || Product.image} rounded fluid />
            </Card>
          </Col>
          <Col lg={9}>
            <h3 className="mt-2">{Product.name}</h3>
            <div className="px-2 py-2">
              {Price ? <h3>{Price}</h3> : <h3>{minPrice !== maxPrice ? `฿${minPrice} - ${maxPrice}` : `฿${minPrice}`}</h3>}

              <p className="text-secondary mb-1">การจัดส่ง</p>
              <h6>
                {Shipping.available.map((item) => (
                  <Badge variant="secondary" className="ml-1">{item}</Badge>
                ))}
              </h6>
              <p className="text-secondary mb-1">ตัวเลือก</p>
              <ToggleButtonGroup type="radio" name="options">
                {Product.options.map((item) => (
                  <ToggleButton variant="outline-info" value={item.id} className="mx-1" size="sm" style={{ borderRadius: '0.25rem' }} onClick={() => optionHandle(item.id)}>{item.name}</ToggleButton>
                ))}
              </ToggleButtonGroup>
              <div className="mt-2">
                <Button variant="outline-success" className="mx-1">เพิ่มไปยังรถเข็น</Button>
                <Button variant="danger" className="mx-1">ซื้อสินค้า</Button>
              </div>
            </div>
          </Col>
        </Row>
        <hr className="mt-1 mb-3" />
        <Row>
          <Col lg={2}>
            <Image src={Shop.image} roundedCircle fluid />
          </Col>
          <Col lg={10}>
            <div>
              <p className="mb-2 text-secondary">
                รายละเอียดร้าน
              </p>
              <h4>
                {`ร้าน ${Shop.shopName}`}
              </h4>
              <p className="mb-2">
                {`รหัสร้านค้า: ${Shop.sales_id}`}
              </p>
              <Button variant="outline-warning">ดูร้านค้า</Button>
            </div>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col>
            <h5 className="text-secondary">รายละเอียดสินค้า</h5>
            <p className="mb-2">{Product.description}</p>
            <p className="mb-2">
              แบรนด์สินค้า:
              {' '}
              {Product.brand.name}
            </p>
            <p className="mb-2">
              ประเภทสินค้า:
              {' '}
              {Product.category.name}
            </p>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col lg={12}>
            <h5 className="text-secondary">รีวิว</h5>
          </Col>
          {Review.error === 'No review data' && <Col><h6>ยังไม่มีรีวิว</h6></Col>}
          {Review.reviews && Review.reviews.map((item) => (
            <Col lg={12}>
              <p>{`ผู้ใช้: ${item.username}`}</p>
              <p>{`คะแนน: ${item.rank}`}</p>
              <p>{`ความคิดเห็น: ${item.content}`}</p>
              <hr />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
  return (<div />);
};

export default product;
