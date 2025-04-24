import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonItemSmall = () => (
    <article className="item post-37176">
        <a href="">
            <div className="item-link">
                <Skeleton className="lazy post-thumb" />
            </div>
            {/* <Skeleton className="title" /> */}
        </a>
        {/* <Skeleton className='viewsCount' /> */}

    </article>
)

export default SkeletonItemSmall
