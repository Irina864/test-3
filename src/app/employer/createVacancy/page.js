// "use client";
// import Nav from "@/components/Nav/Nav";
// import ProgressBarV from "@/components/VacancyForm/ProgressBar/ProgressBarV";
// import VacancyForm from "@/components/VacancyForm/VacancyForm";
// import styles from "./page.module.scss";

// export default function CreateVacancy() {
//   return (
//     <main className={styles.main}>
//       <nav className={styles.nav}>
//         <Nav page="Создание вакансии" />
//       </nav>
//       <div className={styles.container}>
//         <aside>
//           <div className={styles.sidebarContainer}>
//             <ProgressBarV />
//           </div>
//         </aside>
//         <VacancyForm />
//       </div>
//     </main>
//   );
// }
// "use client";

"use client";

import Nav from "@/components/Nav/Nav";
import ProgressBarV from "@/components/VacancyForm/ProgressBar/ProgressBarV";
import VacancyForm from "@/components/VacancyForm/VacancyForm";
import { useEffect, useState } from "react";

import ModalCompanyInfo from "@/components/modals/ModalCompanyInfo";
import ModalFillCompanyInfo from "@/components/modals/ModalFillCompanyInfo";
import styles from "./page.module.scss";

const CreateVacancyPage = () => {
  const [isCompanyInfoOpen, setCompanyInfoOpen] = useState(true);
  const [isFillInfoOpen, setFillInfoOpen] = useState(false);

  const handleCompanyInfoClose = () => {
    setCompanyInfoOpen(false);
    setFillInfoOpen(true);
  };

  const handleFillInfoClose = () => {
    setFillInfoOpen(false);
  };

  useEffect(() => {
    setCompanyInfoOpen(true);
  }, []);

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Nav page="Создание вакансии" />
      </nav>
      <div className={styles.container}>
        <aside>
          <div className={styles.sidebarContainer}>
            <ProgressBarV />
          </div>
        </aside>
        <VacancyForm />
      </div>

      {/* Модальные окна */}
      <ModalCompanyInfo
        open={isCompanyInfoOpen}
        handleClose={() => setCompanyInfoOpen(false)}
        handleNext={handleCompanyInfoClose}
      />
      <ModalFillCompanyInfo
        open={isFillInfoOpen}
        handleClose={() => setFillInfoOpen(false)}
        handleNext={handleFillInfoClose}
      />
    </main>
  );
};

export default CreateVacancyPage;
