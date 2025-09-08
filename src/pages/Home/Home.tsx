import { useEffect, useState } from 'react';
import { Dropdown, Header, Loading, PostCard, SortButton } from '@components';
import styles from './Home.module.scss';
import type { Post } from 'src/types/Post';
import type { Category } from 'src/types/Category';
import type { Author } from 'src/types/Author';
import { getPosts } from '../../services/post';
import { getCategories } from '../../services/category';
import { getAuthors } from '../../services/author';
import { usePosts } from '../../context/PostContext';

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setContextPosts } = usePosts();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [postsData, categoriesData, authorsData] = await Promise.all([
                    getPosts(),
                    getCategories(),
                    getAuthors(),
                ]);
                setPosts(postsData);
                setContextPosts(postsData);
                setCategories(categoriesData);
                setAuthors(authorsData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [setContextPosts]);

    const filteredPosts = posts.filter(post => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            post.categories.some(cat => selectedCategories.includes(cat.name));
        const matchesAuthor =
            selectedAuthors.length === 0 || selectedAuthors.includes(post.author.name);
        return matchesCategory && matchesAuthor;
    });

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.filters}>
                    <Dropdown
                        options={categories}
                        placeholder="Category"
                        selected={selectedCategories}
                        setSelected={setSelectedCategories}
                    />
                    <Dropdown
                        options={authors}
                        placeholder="Author"
                        selected={selectedAuthors}
                        setSelected={setSelectedAuthors}
                    />
                    <SortButton /> {/*this is not working because all the posts have the exactly same createdAt date so i wont be able to test the logic*/}
                </div>
                {isLoading ? <Loading /> : <div className={styles.posts}>
                        {filteredPosts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                }
            </div>
        </>
    );
};

export default Home;
