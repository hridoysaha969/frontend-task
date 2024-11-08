/* eslint-disable react/prop-types */
import styles from "../styles/card.module.css";
import Data from "./Data";

const Card = ({ data }) => {
  const ref = ["incomplete", "todo", "doing"];

  return (
    <article className={styles.card}>
      <header className={styles.card__header}>
        <h1
          className={`${styles.card__header_title} ${
            !ref.includes(data.reference) && styles.hide
          } ${
            data.reference === "doing"
              ? styles.orange
              : data.reference === "todo"
              ? styles.sky
              : null
          }`}
        >
          {data.title}
        </h1>
        <span>0</span>
      </header>

      {data.data.map((item, ind) => (
        <Data key={ind} item={item} />
      ))}
    </article>
  );
};

export default Card;
