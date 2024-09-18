"use client";
import Link from "next/link";
import { useState } from "react";
import usePreventScroll from "../../hooks/usePreventScroll";
import FormAddress from "../UI/Form/FormAddress/FormAddress";
import styles from "./ModalFillCompanyInfo.module.scss";

const ModalFillCompanyInfo = ({ open, handleNext }) => {
  usePreventScroll(open);

  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({
    taxNumber: "",
    email: "",
    phone: "",
    companyName: "",
    companyAddress: "",
    website: "",
    description: "",
  });

  const handleFieldChange = (field, setState) => (e) => {
    setState(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {
      taxNumber: !/^\d{10,12}$/.test(taxNumber)
        ? "Неправильный налоговый номер (10-12 цифр)"
        : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Неправильный формат email"
        : "",
      phone: !/^\d{10,}$/.test(phone)
        ? "Номер телефона должен содержать только цифры и минимум 10 цифр"
        : "",
      companyName: !companyName ? "Это поле обязательно" : "",
      companyAddress: !companyAddress ? "Это поле обязательно" : "",
      website: !website ? "Это поле обязательно" : "",
      description:
        description.length < 50 ? "Введите не менее 50 символов" : "",
    };

    setErrors(newErrors);

    return Object.values(newErrors).some((error) => error !== "");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (validateForm()) {
      return;
    }

    handleNext();
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form
          onSubmit={handleFormSubmit}
          className={styles.formModal}
          noValidate
        >
          <div className={styles.formContainer}>
            <div className={styles.formFields}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Название компании</label>
                <input
                  className={`${styles.formInput} ${
                    showErrors && errors.companyName ? styles.errorBorder : ""
                  }`}
                  value={companyName}
                  onChange={handleFieldChange("companyName", setCompanyName)}
                  required
                />
                {showErrors && errors.companyName && (
                  <div className={styles.errorMessage}>
                    <img
                      src="/images/modals/error.svg"
                      alt="Error icon"
                      className={styles.errorIcon}
                    />
                    <span className={styles.errorText}>
                      {errors.companyName}
                    </span>
                  </div>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Налоговый номер компании
                </label>
                <input
                  className={`${styles.formInput} ${
                    showErrors && errors.taxNumber ? styles.errorBorder : ""
                  }`}
                  value={taxNumber}
                  onChange={handleFieldChange("taxNumber", setTaxNumber)}
                  required
                />
                {showErrors && errors.taxNumber && (
                  <div className={styles.errorMessage}>
                    <img
                      src="/images/modals/error.svg"
                      alt="Error icon"
                      className={styles.errorIcon}
                    />
                    <span className={styles.errorText}>{errors.taxNumber}</span>
                  </div>
                )}
              </div>
              <div className={styles.addressForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Адрес компании</label>

                  <FormAddress
                    id="companyAddress"
                    onChange={setCompanyAddress}
                    showLabel={false}
                    className={`${
                      showErrors && errors.companyAddress
                        ? styles.errorBorder
                        : ""
                    }`}
                  />
                </div>

                {showErrors && errors.companyAddress && (
                  <div
                    className={`${styles.addressCompany} ${styles.errorMessage}`}
                  >
                    <img
                      src="/images/modals/error.svg"
                      alt="Error icon"
                      className={styles.errorIcon}
                    />
                    <span className={styles.errorText}>
                      {errors.companyAddress}
                    </span>
                  </div>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Сайт компании</label>
                <input
                  className={`${styles.formInput} ${
                    showErrors && errors.website ? styles.errorBorder : ""
                  }`}
                  value={website}
                  onChange={handleFieldChange("website", setWebsite)}
                  required
                />
                {showErrors && errors.website && (
                  <div className={styles.errorMessage}>
                    <img
                      src="/images/modals/error.svg"
                      alt="Error icon"
                      className={styles.errorIcon}
                    />
                    <span className={styles.errorText}>{errors.website}</span>
                  </div>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                  className={`${styles.formInput} ${
                    showErrors && errors.email ? styles.errorBorder : ""
                  }`}
                  type="email"
                  value={email}
                  onChange={handleFieldChange("email", setEmail)}
                  required
                />
                {showErrors && errors.email && (
                  <div className={styles.errorMessage}>
                    <img
                      src="/images/modals/error.svg"
                      alt="Error icon"
                      className={styles.errorIcon}
                    />
                    <span className={styles.errorText}>{errors.email}</span>
                  </div>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Номер телефона</label>
                <input
                  className={`${styles.formInput} ${
                    showErrors && errors.phone ? styles.errorBorder : ""
                  }`}
                  value={phone}
                  onChange={handleFieldChange("phone", setPhone)}
                  required
                />
                {showErrors && errors.phone && (
                  <div className={styles.errorMessage}>
                    <img
                      src="/images/modals/error.svg"
                      alt="Error icon"
                      className={styles.errorIcon}
                    />
                    <span className={styles.errorText}>{errors.phone}</span>
                  </div>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Описание компании</label>
                <textarea
                  className={`${styles.formInputDescription} ${
                    description.length < 50 ? styles.errorBorder : ""
                  }`}
                  rows={8}
                  value={description}
                  onChange={handleDescriptionChange}
                  // required
                />
                {description.length < 50 && (
                  <p className={styles.errorText}>
                    Введите не менее 50 символов
                  </p>
                )}
              </div>
            </div>
            <div className={styles.logoContainer}>
              <label htmlFor="logo-upload" className={styles.formIcon}>
                <img
                  src="/images/modals/camera.svg"
                  alt="Добавить фото"
                  width={45}
                  height={45}
                />
                <input
                  id="logo-upload"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
              <p className={styles.formLabel}>{logo ? logo.name : "Логотип"}</p>
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href="/" passHref>
              <button type="button" className={styles.backButton}>
                Назад
              </button>
            </Link>
            <button type="submit" className={styles.nextButton}>
              Далее
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFillCompanyInfo;
