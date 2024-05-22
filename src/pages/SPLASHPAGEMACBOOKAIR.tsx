import { FunctionComponent } from "react";
import Navigation1 from "../components/Navigation1";
import RecyclingInfo from "../components/RecyclingInfo";
import styles from "./SPLASHPAGEMACBOOKAIR.module.css";

const SPLASHPAGEMACBOOKAIR: FunctionComponent = () => {
  return (
    <div className={styles.splashPageMacbookAir}>
      <Navigation1 />
      <div className={styles.content}>
        <div className={styles.intro}>
          <RecyclingInfo />
          <button className={styles.buttonContainer}>
            <div className={styles.buttonContainerChild} />
            <div className={styles.learnMore}>learn more</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SPLASHPAGEMACBOOKAIR;
