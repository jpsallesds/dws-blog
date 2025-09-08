import { Button, Header, Loading, PostCard } from "@components";
import { getPostById } from "../../services/post";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "src/types/Post";
import { FaArrowLeft } from "react-icons/fa6";
import styles from './Post.module.scss'
import { formatDate } from "../../utils/formatDate";
import { usePosts } from "../../context/PostContext";

const PostPage = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post>();
    const navigate = useNavigate();
    const { latestPosts } = usePosts();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(String(id));
                setPost(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <div><Loading /></div>

    return (
        <>
            <Header />
            <div className={styles.container}>

                <div className={styles.button}>
                    <Button label="Back" variant="secondary" icon={<FaArrowLeft />} onClick={() => navigate(-1)} />
                </div>
                <h2 className={`${styles.postTitle} h2`}> {post.title}</h2>
                <div className={styles.profileDetails}>
                    <img className={styles.profilePicture} src={post.author.profilePicture} alt={`Profile picture of ${post.author.name}`} />
                    <div className={styles.authorAndDate}>
                        <p>Written by: <strong>{post.author.name}</strong></p>
                        <span className="caption">{formatDate(post.createdAt)}</span>
                    </div>
                </div>
                <img className={styles.image} src={post.thumbnail_url} alt="Post image" />
                <p className="small">{post.content}</p>

                <div className={styles.latestArticles}>
                    <h3 className={styles.latestArticlesTitle}>Last articles</h3>
                    <div className={styles.latestArticlesPosts}>
                        {latestPosts
                            .filter(latestPost => latestPost.id !== post.id)
                            .slice(0, 3)
                            .map(latestPost => (
                                <PostCard
                                    key={latestPost.id}
                                    post={latestPost}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPage;
