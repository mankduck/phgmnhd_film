import React from "react"
import './footer.css'

const Footer = () => {
    return (
        <>

            <footer id="footer" className="clearfix">
                <div className="container footer-columns">
                    <div className="row container">
                        <div className="widget about col-xs-12 col-sm-12 col-md-12 text-center">
                            Liên hệ QC:<a href="https://t.me/PhimCuContactBot" target="_blank">Liên hệ với chúng tôi tại đây!</a>
                            <br></br><br></br>
                            Website phim 18+ mới với những bộ phim được cập nhật không ngừng, đa dạng thể loại tại <a href="https://buomto.top/" target="_blank" rel="noopener noreferrer"><span className="text-danger">BUOMTO</span>.top</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer