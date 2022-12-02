import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createCartThunk } from '../../store/slices/cart.slice';
import { getProsuctsThunk } from '../../store/slices/products.slice';

const ProductsDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getProsuctsThunk())   
    }, []);

    const productsList = useSelector(state => state.products)


    const product = productsList.find(productsItem => productsItem.id === Number(id))
    const relateProduct = productsList.filter(
        (productItem) =>
            productItem?.category.id === product?.category.id &&
            productItem.id !== product.id
    )

    const [quantity, setQuantity] = useState("")

    // console.log(relateProduct)
    const addproduct = () => {
        const productcart = {
            id: product.id,
            quantity: quantity
        }
        
        dispatch(createCartThunk(productcart))
    }

    return (
        <div>
            <h2>{product?.title}</h2>
            
            <input type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)} />
            <button onClick={addproduct}>Add to products</button>

            {/* DESCRIPCION DE NOTICIA */}

            <Row >
                <Col lg={9} >
                    <img src={product?.productImgs[0]} alt="" className="img-fluid" />
                    <p>{product?.description}</p>
                    <p>Price: $<b>{product?.price}</b></p>
                </Col>

                {/* NOTICIA RELACINADA */}

                <Col xs={3} md={3} lg={3} className="g-4" >
                    <h5>Related Products:</h5>
                    <ListGroup variant="flush"  >
                        {relateProduct.map(productItem => (
                            <ListGroup.Item  style={{ background: 'white' }} key={productItem.id}>
                                <Link key={productItem.id} to={`/products/${productItem.id}`} style={{ background: 'white', color:'black'}}>
                                    {productItem.title}
                                    <img src={productItem?.productImgs[0]} alt="" className="img-fluid" />
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