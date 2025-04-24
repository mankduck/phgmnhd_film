import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonItemCol3 = () => (
    <article className="col-md-3 col-sm-3 col-xs-6 thumb grid-item post-27021">
        <div className="halim-item">
            <Skeleton className="lazy img-responsive" style={{ height: '260px' }} />
        </div>

    </article>
)

export default SkeletonItemCol3
