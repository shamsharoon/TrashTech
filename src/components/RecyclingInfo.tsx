import { FunctionComponent, memo } from "react";
import styles from "./RecyclingInfo.module.css";

const RecyclingInfo: FunctionComponent = memo(() => {
  return (
    <div className={styles.recyclingInfo}>
      <h1 className={styles.wantToLearnContainer}>
        <p className={styles.wantToLearn}>Want to learn </p>
        <p className={styles.moreAbout}>more about</p>
      </h1>
      <h1 className={styles.recycling}>Recycling?</h1>
      <div className={styles.polygonParent}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/polygon-1.svg"
        />
        <div className={styles.backgroundShape} />
        <img className={styles.mock1Icon} alt="" src="/mock-1@2x.png" />
      </div>
    </div>
  );
});

export default RecyclingInfo;
