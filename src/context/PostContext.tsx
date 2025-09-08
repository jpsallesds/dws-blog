import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Post } from "src/types/Post";

type PostsContextType = {
  posts: Post[];
  latestPosts: Post[];
  setContextPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setContextPosts] = useState<Post[]>(() => {
    const stored = localStorage.getItem("posts");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <PostsContext.Provider value={{ posts, latestPosts, setContextPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts deve ser usado dentro de um PostsProvider");
  }
  return context;
};
