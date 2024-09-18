import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
        <Link href="/">
                    <div className={styles.footer__logowrap}>
                        <Image
                            className={styles.footer__logo}
                            src="/images/footer/Logo.png"
                            alt="Logo" width={76} height={32}
                        />
                    </div>
                </Link>
        </div>
        
        <div className={styles.column}>
          <Link href="/employer">Работодателям</Link>
          <Link href="/employers">Личный кабинет</Link>
          <Link href="/chats">Чаты</Link>
          <Link href="/feedback">Обратная связь</Link>
        </div>
        
        <div className={styles.column}>
        <Link href="/download">Скачай приложение</Link>
          <div className={styles.qrCode}>
            <Image src="/images/footer/qr.png" alt="QR-код" width={55} height={55} />
          </div>
        </div>
        
        <div className={styles.column}>
        <a href="tel:+79169999999">+7 (916) 999 99 99</a>
          <a href="mailto:rabota@gmail.com">rabota@gmail.com</a>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <span className={styles.copyright}>&copy; company 2024</span>
        <div className={styles.privacyPolicyWrapper}>
          <Link href="/privacy" className={styles.privacyPolicy}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
