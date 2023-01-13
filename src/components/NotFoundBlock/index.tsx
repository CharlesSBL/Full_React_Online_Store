import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span role="img" aria-label="sad face">
        😞
      </span>
      <h1>Nothing Found </h1>
      <p className={styles.description}>Can't find the page</p>
    </div>
  );
};

export default NotFoundBlock;
