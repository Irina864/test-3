'use client';
import styles from './FormAvatar.module.scss';
import { useState } from 'react';

const FormAvatar = ({ accept, nameFile, onImageChange }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const result = event.target.result;
      document.getElementById('uploadedImage').setAttribute('src', result);
      setImageUrl(result);
      onImageChange(result);
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setImageUrl(null);
    document
      .getElementById('uploadedImage')
      .setAttribute('src', '/images/form/add_a_photo.svg');
    document.getElementById('uploadedImage').style.opacity = '1';
    onImageChange(null);
  };

  return (
    <div className={styles.box}>
      <div className={styles.wrap_img}>
        <div
          className={
            imageUrl
              ? `${styles.boxImage} ${styles.upload}`
              : `${styles.boxImage}`
          }
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            className={styles.inputFile}
            type="file"
            id="fileInput"
            name={nameFile}
            accept={accept}
            maxsize={6 * 1024 * 1024}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file.size > 6 * 1024 * 1024) {
                alert('Файл должен быть не более 6МБ');
                return;
              }
              handleImageUpload(e);
            }}
          />
          {imageUrl ? (
            <img
              id="uploadedImage"
              className={styles.image}
              alt="Uploaded"
              src={imageUrl}
            />
          ) : (
            <img
              id="uploadedImage"
              className={styles.imageHidden}
              alt="Uploaded"
              src={imageUrl}
            />
          )}
        </div>
        {imageUrl && (
          <div
            className={`${styles.boxImageReact}`}
            onClick={() => document.getElementById('fileInput').click()}
          ></div>
        )}
      </div>
      {imageUrl ? (
        <button onClick={handleDeleteImage} className={styles.deleteButton}>
          Удалить фото
        </button>
      ) : null}
    </div>
  );
};

export default FormAvatar;
