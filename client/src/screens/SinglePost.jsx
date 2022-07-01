import React from 'react';
import axios from "axios"
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from '../redux/actions/ProductsActions';
import { useState } from 'react';

const SinglePost = () => {
    const [dataImages, setDataImages] = useState([])
    const product = useSelector((state) => state.product)
    const pathId = window.location.pathname.split("/")[2]
    console.log(pathId)
    const dispatch = useDispatch()

    const getDataById = async () => {
        const res = await axios.get(`http://localhost:3001/api/product/${pathId}`)
        console.log(res.data)
        setDataImages(res.data.images)
        dispatch(selectedProduct(res.data))
    }

    useEffect(() => {
        getDataById()
    }, [pathId])

    console.log(product)
    return (
        <div>
            <div className="container">
                <div className="row my-4">
                    <div className="col-md-6">
                        <img className='w-100' src={product.thumbnail} alt="" />
                        <div className="row">
                            {
                                dataImages.map((image, key) => {
                                    key = key + 1
                                    return (
                                        <div className="col-md-3" key={key}>
                                            <div style={{
                                                borderRadius:"5px",
                                                border:"1px solid #333",
                                                padding:"5px",
                                                marginTop:"3px"
                                            }}>
                                                <img className='w-100' style={{
                                                    aspectRatio:"1/1"
                                                }} src={image} alt="" />
                                            </div>
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <p>
                                <span className='font-weight-700'>Brand : </span> {product.brand}
                            </p>
                            <p>
                                <span className='font-weight-700'>Title : </span> {product.title}
                            </p>
                            <p>
                                <span className='font-weight-700'>Category : </span> {product.category}
                            </p>
                            <p>
                                <span className='font-weight-700'>Description : </span> {product.description}
                            </p>
                            <p>
                                <span className='font-weight-700'>Discount Percantage : </span> {product.discountPercentage}
                            </p>
                            <p>
                                <span className='font-weight-700'>Price : </span> {product.price}
                            </p>
                            <p>
                                <span className='font-weight-700'>Rating : </span> {product.rating}
                            </p>
                            <p>
                                <span className='font-weight-700'>Stock : </span> {product.stock}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;