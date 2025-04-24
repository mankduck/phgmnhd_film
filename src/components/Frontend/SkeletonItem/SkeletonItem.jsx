import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonItem = () => (
    <article className="col-md-2 col-sm-4 col-xs-6 thumb grid-item post-38424">
        <div className="halim-item">
            <Skeleton className="lazy img-responsive" style={{ height: '260px' }} />
        </div>

    </article>
)

export default SkeletonItem
