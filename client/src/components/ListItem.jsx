import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";


const ListItem = ({data}) => {
    return (
        <div className="row">
            {data.map((item) => {
                return (
                    <div className="col-md-3" key={item.id}>
                        <div class="card my-2 shadow">
                            <img src={item.thumbnail} style={{
                                width: "100%",
                                aspectRatio: "16/9"
                            }} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{item.title}</h5>
                                <p class="card-text text-line-2">{item.description}</p>
                                <Link to={`/item/${item.id}`} className='btn shadow-none btn-dark'>more</Link>
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
    );
};

export default ListItem;