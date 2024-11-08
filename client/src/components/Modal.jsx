/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/modal.module.css";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const Modal = ({ setOpen, dataFile, dataLoading }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const selectFile = event.target.files[0];
    if (selectFile) {
      setFile(selectFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded");
      console.log(response.data);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.log(error.message);
      alert("failed to file upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal__container}>
      <span className={styles.close} onClick={() => setOpen(false)}>
        <FaTimes />
      </span>
      <div className={styles.modal__form_wrapper}>
        <h2 className={styles.modal__title}>
          {showAddForm ? "Upload File" : "All Files"}
        </h2>

        {!showAddForm && (
          <div className={styles.flie__list}>
            {!loading &&
              dataFile &&
              dataFile.map((item, ind) => (
                <p key={ind}>
                  {ind + 1} . <a href={item.url}>{item.fileName}</a>
                </p>
              ))}
          </div>
        )}
        {showAddForm && (
          <div>
            <input
              type="file"
              id="file"
              className={styles.input__file}
              onChange={handleChange}
            />

            <label htmlFor="file" className={styles.upload__label}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M5 20h14v-2H5v2zm7-18l-7 7h4v6h6v-6h4l-7-7z" />
              </svg>
              Upload File
            </label>

            {file && <p className={styles.selectedFile}>File : {file.name}</p>}
          </div>
        )}

        {!showAddForm && (
          <button
            className={styles.add__btn}
            onClick={() => setShowAddForm(true)}
            disabled={dataLoading}
          >
            Add File
          </button>
        )}
        {showAddForm && (
          <div className={styles.btn__wrap}>
            <button
              className={`${styles.add__btn} ${styles.upload__btn}`}
              onClick={handleUpload}
              disabled={loading}
            >
              Upload
            </button>
            <button
              className={`${styles.add__btn} ${styles.cancel__btn}`}
              onClick={() => setShowAddForm(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
