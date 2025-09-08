import { useEffect, useState } from 'react';
import { Button, Dropdown, Header, Loading, PostCard, SortButton } from '@components';
import styles from './Home.module.scss';
import type { Post } from 'src/types/Post';
import type { Category } from 'src/types/Category';
import type { Author } from 'src/types/Author';
import { getPosts } from '../../services/post';
import { getCategories } from '../../services/category';
import { getAuthors } from '../../services/author';
import { usePosts } from '../../context/PostContext';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]);
    const [tempSelectedAuthors, setTempSelectedAuthors] = useState<string[]>([]);
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

    const handleApplyFilters = () => {
        setSelectedCategories(tempSelectedCategories);
        setSelectedAuthors(tempSelectedAuthors);
    };

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
            <Header categories={categories} />
            <div className={styles.container}>
                <aside className={styles.desktopFilter}>
                    <h2 className="h2">DWS blog</h2>
                    <div className={styles.sidebarSection}>
                        <h2 className={styles.sidebarSectionSubtitle}>
                            <FaArrowRightArrowLeft size={18} /> Filters
                        </h2>
                        <h3>Category</h3>
                        <ul className={styles.clickableList}>
                            {categories.map(cat => (
                                <li
                                    key={cat.id}
                                    className={tempSelectedCategories.includes(cat.name) ? styles.selected : ''}
                                    onClick={() =>
                                        setTempSelectedCategories(prev =>
                                            prev.includes(cat.name)
                                                ? prev.filter(c => c !== cat.name)
                                                : [...prev, cat.name]
                                        )
                                    }
                                >
                                    {cat.name}
                                </li>
                            ))}
                        </ul>
                        <h3>Author</h3>
                        <ul className={styles.clickableList}>
                            {authors.map(author => (
                                <li
                                    key={author.id}
                                    className={tempSelectedAuthors.includes(author.name) ? styles.selected : ''}
                                    onClick={() =>
                                        setTempSelectedAuthors(prev =>
                                            prev.includes(author.name)
                                                ? prev.filter(a => a !== author.name)
                                                : [...prev, author.name]
                                        )
                                    }
                                >
                                    {author.name}
                                </li>
                            ))}
                        </ul>
                        <Button label="Apply filters" variant="primary" onClick={handleApplyFilters} />
                    </div>
                </aside>
                <main className={styles.mainContent}>
                    <div className={styles.filter}>
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
                    <div className={styles.desktopSort}>
                        <strong>Sort by:</strong> <SortButton />
                    </div>
                    {isLoading ? <Loading /> : <div className={styles.posts}>
                        {filteredPosts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                    }
                </main>
            </div>
        </>
    );
};


export default Home;
