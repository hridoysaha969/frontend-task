/* eslint-disable react/prop-types */
import styles from "../styles/data.module.css";
import { FaLayerGroup } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useState } from "react";
import Modal from "./Modal";

const Data = ({ item }) => {
  const [open, setOpen] = useState(false);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <section className={styles.data}>
      <div className={styles.data_header}>
        <div className={styles.client}>
          <img src="/client.png" alt="Client" />
          <h3>Client Name</h3>
        </div>

        <div className={styles.user}>
          <img src="/user.jpg" alt="User" />
          <h3>Sadik Istiak</h3>
        </div>
      </div>

      <div className={styles.content}>
        <p>
          <FaLayerGroup />
          {truncateText(item.text, 25)}
        </p>
        <div className={styles.pages}>
          <FaClipboardList />
          <span>1/2</span>
        </div>
      </div>

      <div className={styles.data__footer}>
        <div className={styles.contribution}>
          <img src="/con-1.jpg" alt="" />
          <img src="/con-2.jpg" alt="" />
          <span>12+</span>
        </div>
        <div className={styles.tools}>
          <span>
            <FaRegComments />
            15
          </span>
          <span>
            <span onClick={() => setOpen(true)}>
              <GrAttachment />
            </span>
            25
          </span>
          <span>
            <FaRegCalendarDays />
            30-12-2022
          </span>
        </div>
      </div>

      {open && <Modal setOpen={setOpen} />}
    </section>
  );
};

export default Data;
