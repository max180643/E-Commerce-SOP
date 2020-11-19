import Head from 'next/head';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    axios.get('/api/product/all').then((res) => {
      setProduct(res.data);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Home | E-Commerce</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Form className="mt-2">
        <Form.Row className="align-items-center">
          <Col xs={7} md={6} lg={5} className="ml-auto">
            <Form.Label htmlFor="searchInput" srOnly>
              Search
            </Form.Label>
            <Form.Control id="searchInput" placeholder="ค้นหาสินค้า" />
          </Col>
          <Col xs="auto" md="auto" lg="auto" className="mr-auto">
            <Button><FontAwesomeIcon icon={faSearch} style={{ height: '1em' }} /></Button>
          </Col>
        </Form.Row>
      </Form>

      <Col>
        <Row>
          <h4 className="mt-2">รายการสินค้า</h4>
        </Row>
        <Row>
          {Product.map(
            (data) => {
              const optionData = data.options;
              const minPrice = Math.min(...optionData.map((el) => el.price));
              const maxPrice = Math.max(...optionData.map((el) => el.price));
              return (
                <ItemCard
                  key={data.id}
                  ID={data.id}
                  Name={data.name}
                  Price={{ min: minPrice, max: maxPrice }}
                  Picture={data.image}
                />
              );
            },
          )}
        </Row>
      </Col>

    </div>
  );
}
