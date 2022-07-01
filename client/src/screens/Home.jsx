import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from "../redux/actions/ProductsActions"
import ListItem from '../components/ListItem';
import axios from "axios"

const Home = () => {
    const [category, setCategory] = useState([])
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")
    const [selectCategory, setSelectCategory] = useState()
    const products = useSelector((state) => state)
    const [pageNumber, setPageNumber] = useState(0);

    const dispatch = useDispatch()

    // hamma mahsulotsali olish
    const getData = async () => {
        const res = await axios.get(`http://localhost:3001/api/product?category=${!selectCategory ? "" : selectCategory}&limit=3&offset=${pageNumber}`)
        dispatch(setProducts(res.data.products))
        setData(res.data.products)
        console.log(res.data)
    }
    console.log(selectCategory)
    // categoriyalarni olish
    const getCategory = async () => {
        const res = await axios.get("http://localhost:3001/api/category")
        setCategory(res.data)
    }

    const getDatabyCategory = async (cate) => {
        const res = await axios.get(`http://localhost:3001/api/product?category=${!selectCategory ? "" : selectCategory}&limit=3&offset=${pageNumber}`)
        console.log(res.data)
        setData(res.data.products)
    }

    // search
    const search = async (cate) => {
        const res = await axios.get(`http://localhost:3001/api/product?name=${query}&category=${!selectCategory ? "" : selectCategory}&limit=3&offset=${pageNumber}`)
        console.log(res.data)
        setData(res.data.products)
    }

    useEffect(() => {
        getData()
        getCategory()
    }, [pageNumber])

    // pagination for
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 3));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(pageNumber + 3));
    };
    console.log(pageNumber)
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4 my-2">
                    <div className="d-flex">
                        <input onChange={e => setQuery(e.target.value)} value={query} type="text" name="" id="" className='form-control' />
                        <button className='btn shadow-none btn-primary mx-4' onClick={search}>ok</button>
                    </div>

                </div>
                <div className="col-md-8 my-2">
                    <div style={{
                        marginLeft: 0,
                    }}>
                        <button className='cursor-pointer btn shadow-none btn-dark' onClick={() => {
                            getDatabyCategory("")
                            search("")
                            setSelectCategory("")
                        }}>
                            all
                        </button>
                        {
                            category.map((cate, inde) => {
                                inde = inde + 1
                                return (
                                    <button style={{
                                        display: "block !important"
                                    }} className='cursor-pointer mx-1 btn shadow-none btn-dark my-1' onClick={async () => {
                                        getDatabyCategory(cate)
                                        search(cate)
                                        setSelectCategory(cate)
                                    }} key={inde}>{cate}</button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <ListItem data={data} />
            <div className='d-flex justify-content-center'>
                <button className='btn shadow-none btn-outline-primary ' onClick={gotoPrevious}>Previous</button>
                <button className='btn shadow-none btn-outline-primary mx-1' onClick={gotoNext}>Next</button>
            </div>

        </div>
    );
};

export default Home;