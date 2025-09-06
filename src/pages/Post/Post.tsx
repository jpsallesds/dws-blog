import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams<{ id: string }>(); 

  return (
    <div>
        <h2>{}</h2>
    </div>
  );
};

export default PostPage;
