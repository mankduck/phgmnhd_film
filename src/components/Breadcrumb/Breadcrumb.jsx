import React from "react";

const Breadcrumb = ({ name }) => {
    return (
        <div className="breadcrumb-area breadcrumb-modify-padding bg-black-2">
            <div className="container">
                <div className="in-breadcrumb">
                    <div className="row">
                        <div className="col">
                            <div className="breadcrumb-style-2 center">
                                <h2>{name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb