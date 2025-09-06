import type { Post } from "src/types/Post";
import styles from './PostCard.module.scss';
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

interface PostCardProps {
    post: Post
}


const PostCard = ({ post }: PostCardProps) => {

    return (
        <Link to={`/post/${post.id}`} className={styles.postCard}>
            <div>
                <img src={`${post.thumbnail_url}`} alt="" className={styles.image} />
            </div>
            <div className={styles.content}>
                <div className={styles.dateAndAuthor}>
                    <span className="caption">{formatDate(post.createdAt)}</span>
                    <span className="caption">•</span>
                    <span className="caption">{post.author.name.split(' ').slice(1)}</span>

                </div>
                <div className={styles.text}>
                    <h3 className="h3">{post.title}</h3>
                    <p className={`small ${styles.ellipsis}`} >{post.content}</p>
                </div>
                <div className={styles.categories}>
                    {post.categories.map(category => (
                        <span className={`caption ${styles.category}`} key={category.id}>
                            {category.name}
                        </span>
                    )
                    )}
                </div>
            </div>

        </Link>
    );
}

export default PostCard;