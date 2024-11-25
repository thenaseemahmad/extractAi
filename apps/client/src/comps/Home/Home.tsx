import { Button } from '@chrome-buildin-ai-naseem/react-base-comps';
import TopHeader from '../navigation/TopHeader';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  function handleGetStartedBtnClick(){
    console.log("Get started clicked!!");
    navigate("/studio")
  }

  function handleLearnAboutToolBtnClick(){
    console.log("Learn about tool clicked");
  }
  return (
    <>
      <TopHeader />
      <div className={styles.home}>
        <div className={styles.intro}>
          <h1 className={styles.intro_heading}>
            Process Documents | Via genAi
          </h1>
          <h4 className={styles.intro_detail}>
            Extract information from different types of unstructured documents
            such as scanned pdf, scanned images, or natural language plain text.
          </h4>
          <div className={styles.intro_btns}>
            <Button onClick={handleGetStartedBtnClick} title="Get started" type="btn_medium_highlighted" />
            <Button onClick={handleLearnAboutToolBtnClick} title="Learn about extractAi" type="btn_medium_standard" />
          </div>
          <p className={styles.intro_detail_footer}>Build with <span>Tesseract OCR</span>, and <span>Google Chrome Build-in Ai</span></p>
        </div>
      </div>
    </>
  );
}
