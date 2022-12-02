import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterHeadlineThunk, filterProductsThunk, getProsuctsThunk } from '../../store/slices/products.slice';



const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const [categoryList, setCategoryList] = useState([])
    const [inputSearch, setInputSearch] = useState("")

    useEffect(() => {
        dispatch(getProsuctsThunk())

        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategoryList(res.data.data.categories))
    }, []);


    console.log(categoryList)

    return (

        <div>
            <Row>
                {/* CATEGORIAS */}

                <Col lg={3}>
                    <ListGroup>
                        {categoryList.map((categories) => (
                            <ListGroup.Item
                                onClick={() => dispatch(filterProductsThunk(categories.id))}
                                style={{ cursor: "pointer" }}
                                key={categories.id}
                            >
                                {categories.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                </Col>
                {/* NOTICIAS */}
                <Col lg={9}>
                    <h1>Home</h1>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch}
                            onChange={e => setInputSearch(e.target.value)}
                        />
                        <Button variant="outline-secondary"
                            onClick={() => dispatch(filterHeadlineThunk(inputSearch))} >
                            Seach
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {products.map(productsItem => (
                            <Col key={productsItem.id}>
                                <Card style={{ height: 350, background: "white"  }}>
                                    <Link
                                        to={`/products/ ${productsItem.id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src= {productsItem.productImgs[0] }
                                            style={{ height: 200, objectFit: "contain"  }}
                                        />
                                        
                                        <Card.Body >
                                            <Card.Title style={{ color: "black", fontSize: 17  }}> {productsItem.title}</Card.Title>
                                            <Card.Text style={{ color: "black"  }} >Price: ${productsItem.price}</Card.Text>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    )
};

export default Home;