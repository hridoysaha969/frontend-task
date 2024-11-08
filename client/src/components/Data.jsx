/* eslint-disable react/prop-types */
import styles from "../styles/data.module.css";
import { FaLayerGroup } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";

const Data = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [dataFile, setDataFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/files`
        );
        setDataFile(response.data.result);
        // console.log(response);

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            {dataFile && dataFile.length}
          </span>
          <span>
            <FaRegCalendarDays />
            30-12-2022
          </span>
        </div>
      </div>

      {open && (
        <Modal setOpen={setOpen} dataFile={dataFile} dataLoading={loading} />
      )}
    </section>
  );
};

export default Data;
