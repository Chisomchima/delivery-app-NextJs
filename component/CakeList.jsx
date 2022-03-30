import styles from "../styles/CakeList.module.css";
import CakeCard from "./CakeCard";

const CakeList = ( {cakeList} ) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST CAKE IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {cakeList.map((cake) => (
          <CakeCard key={cake._id} cake={cake} />
        ))}
      </div>
    </div>
  );
};

export default CakeList;
