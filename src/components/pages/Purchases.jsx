import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavoritesThunk } from "../../store/slices/favorites.slice";


const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorite)

    useEffect(() => {
        dispatch(getFavoritesThunk());
    }, []);

    return (
        <div>
            <h1>Purchase</h1>

            {
                favorites.map(purchase => (
                    <ul key={purchase.id} >
                        {purchase.cart.products.map(product => (
                            <li key={product.id}>
                                <Link  to={`/products/${product.id}`}>
                                <h5><b>Product: </b>{product.title}</h5>
                                <h5><b>Price: </b>${product.price}</h5>
                                <h5><b>Purchase Date: </b >{product.createdAt}</h5>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))
            }

        </div>
    );
};

export default Favorites;
