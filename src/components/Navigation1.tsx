import { FunctionComponent, memo } from "react";
import styles from "./Navigation1.module.css";

const Navigation1: FunctionComponent = memo(() => {
  return (
    <header className={styles.navigation}>
      <div className={styles.navigationChild} />
      <img
        className={styles.image1Icon}
        loading="lazy"
        alt=""
        src="/image-1@2x.png"
      />
      <div className={styles.menuButtons}>
        <div className={styles.aboutUs}>ABOUT US</div>
      </div>
      <div className={styles.menuButtons1}>
        <div className={styles.ourTeam}>OUR TEAM</div>
      </div>
      <div className={styles.menuButtons2}>
        <div className={styles.features}>FEATURES</div>
      </div>
      <div className={styles.menuButtons3}>
        <div className={styles.partners}>PARTNERS</div>
      </div>
      <div className={styles.menuButtons4}>
        <div className={styles.contact}>CONTACT</div>
      </div>
    </header>
  );
});

export default Navigation1;
