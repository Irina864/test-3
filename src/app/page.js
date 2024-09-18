'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import NavForDev from '@/components/_NavForDev/NavForDev';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
    const mode = useSelector(({ mode }) => mode);
    const router = useRouter();
    // useEffect(() => {
    //     mode ? router.push('/vacancies') : router.push('/resumes');
    // }, []);
    return (
        <main className={styles.main}>
            <NavForDev />
        </main>
    );
}
