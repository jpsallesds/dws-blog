import { useState } from "react";
import styles from "./SortButton.module.scss";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const SortButton = () => {
  const [isNewestFirst, setIsNewestFirst] = useState(true);

  const handleToggle = () => {
    setIsNewestFirst(prev => !prev);
  };

  return (
    <button onClick={handleToggle} className={styles.sortButton}>
      {isNewestFirst ? "Newest first" : "Oldest first"} <FaArrowRightArrowLeft className={styles.icon} />
    </button>
  );
};

export default SortButton;
