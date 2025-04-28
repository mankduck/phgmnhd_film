import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { toast } from 'react-toastify'
import apiService from '@api/apiBackend'

const Comment = (slug) => {
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [listComment, setListComment] = useState([])

    const getListComment = async () => {
        try {
            const response = await apiService.get(`/comment/${slug.slug}`)
            setListComment(response)
        } catch (error) {
            toast.error('Đã có lỗi xảy ra, mã lỗi: ' + error)
            console.error('Có lỗi xảy ra:', error)
        }
    }

    useEffect(() => {
        getListComment()

    }, [slug.slug], listComment)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const userData = {
            slug: slug.slug,
            name: name,
            comment: comment
        }

        try {
            const response = await apiService.post('/comment/store', userData)
            toast.success('Bình luận của bạn đã được gửi thành công!')
            setName('')
            setComment('')
            getListComment()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error('Đã có lỗi xảy ra, mã lỗi: ' + error)
            console.error('Có lỗi xảy ra:', error)
        }
    }

    return (
        <>
            <div className="title-block mt10">
                <div className="row box-comment mb10">
                    <form onSubmit={handleSubmit} action="">
                        <h4>Để bình luận tại đây:</h4>
                        <label htmlFor="">Tên hiển thị</label>
                        <input
                            className="form-control mb10"
                            type="text"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="">Bình luận của bạn</label>
                        <textarea
                            name=""
                            className="form-control mb10"
                            rows={5}
                            value={comment}
                            required
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button type="submit" className="btn btn-danger">Gửi bình luận</button>
                    </form>
                </div>
            </div>
            {loading ? (

                <Loader />
            ) : (
                <>
                    <div className="clearfix"></div>
                    <div className="title-block mt10">
                        {
                            listComment.map((item, index) => (
                                <div key={index} className="row box-comment mb10">
                                    <label htmlFor="">{item.name}</label>
                                    <p>{item.comment}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="clearfix"></div>
                </>
            )}
        </>
    )
}

export default Comment