import React from "react";

const Filter = ({ param, setParam, category, country, handleReset }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setParam((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="breadcrumb-area breadcrumb-modify-padding bg-black">
            <div className="container">
                <div className="in-breadcrumb">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 contact-inner black">
                            <select name="country" className="form-control" value={param.country} onChange={handleChange}>
                                <option value="">Quốc Gia</option>
                                {country.map((c) => (
                                    <option key={c.id} value={c.slug}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-3 col-md-3 contact-inner black">
                            <select name="category" className="form-control" value={param.category} onChange={handleChange}>
                                <option value="">Thể Loại</option>
                                {category.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-3 col-md-3 contact-inner black">
                            <select name="year" className="form-control" value={param.year} onChange={handleChange}>
                                <option value="">Năm Sản Xuất</option>
                                {/* Thêm danh sách năm nếu có */}
                            </select>
                        </div>
                        <div className="col-lg-3 col-md-3 black">
                            <button className="btn btn-danger bg-danger" onClick={handleReset}>
                                Xóa tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
