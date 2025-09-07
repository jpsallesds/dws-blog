import { useEffect, useState } from 'react';
import { Dropdown, Header, PostCard } from '@components';
import styles from './Home.module.scss';
import type { Post } from 'src/types/Post';
import type { Category } from 'src/types/Category';
import { getPosts } from '../../services/post';
import { getCategories } from '../../services/category';
import { getAuthors } from '../../services/author';
import { usePosts } from '../../context/postContext';

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<Category[]>([]);
    const { setContextPosts } = usePosts();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsData, categoriesData, authorsData] = await Promise.all([
                    getPosts(),
                    getCategories(),
                    getAuthors(),
                ]);
                setPosts(postsData);
                setContextPosts(postsData)
                setCategories(categoriesData);
                setAuthors(authorsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [setContextPosts]);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.filters}>
                    <Dropdown options={categories} placeholder='Category' />
                    <Dropdown options={authors} placeholder='Author' />
                    <h3>oaudaoidi</h3>
                </div>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
