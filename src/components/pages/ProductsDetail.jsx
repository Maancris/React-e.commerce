import React, { useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProsuctsThunk } from '../../store/slices/products.slice';

const ProductsDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const productsList = useSelector(state => state.products)

    const product = productsList.find(productsItem => productsItem.id === Number(id))

    useEffect(() => {
        dispatch(getProsuctsThunk())

    }, []);




    const relateProduct = productsList.filter(productsItem =>
        productsItem.category.id === product.category.id)

    console.log(relateProduct)

    return (
        <div>
            <h2>{product?.title}</h2>

            {/* DESCRIPCION DE NOTICIA */}

            <Row>
                <Col lg={9}>
                    <img src={product?.productImgs[0]} alt="" className="img-fluid" />
                </Col>

                {/* NOTICIA RELACINADA */}

                <Col lg={3}>
                    <h3>Related Products:</h3>
                    <ListGroup variant="flush">
                    {relateProduct.map(produItiem => (
                            <ListGroup.Item key={produItiem.id}>
                                <Link to={`/products/${produItiem.id}`}>
                                    
                                    {produItiem.title}
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

            </Row>


        </div>


    );
};

export default ProductsDetail;