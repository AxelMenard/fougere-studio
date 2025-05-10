"use client"
import Image from "next/image";
import styles from "./page.module.scss";
import { getImageProps } from 'next/image'
import { useEffect, useState } from "react";

  const getBackgroundImage = (srcSet = '') => {
    console.log(srcSet);
    
  const imageSet = srcSet
      .split(', ')
      .map((str) => {
        const [url, dpi] = str.split(' ')
        return `url("${url}") ${dpi}`
      })
      .join(', ')
    return `image-set(${imageSet})`
  }

  interface backgroundImages {
    url: string;
    width: number;
    height: number;
}

export default function Home() {
  const backgroundImages = [
    { url: "/Images/monika-grzebinoga.jpg", width: 400, height: 1200},
    { url: "/Images/pexels-anna-pou.jpg", width: 400, height: 1200},
    { url: "/Images/pexels-enginakyurt.jpg", width: 400, height: 1200},
    { url: "/Images/pexels-karolina-grabowska.jpg", width: 400, height: 1200},
    { url: "/Images/pexels-kseniachernaya.jpg", width: 400, height: 1200},
    { url: "/Images/pexels-olof-nyman.jpg", width: 400, height: 1200},
    { url: "/Images/saher-suthriwala.jpg", width: 400, height: 1200},
  ]

  
    const shuffleArray = (array: backgroundImages[]): backgroundImages[] => {
      const shuffled = [...array];
      for (let index = shuffled.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
      }
      return shuffled;
    };

    const limit = backgroundImages.length;
    const interval = 5000;
    const [shuffledItems, setShuffledItems] = useState<backgroundImages[]>(() => shuffleArray(backgroundImages));
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [fade, setFade] = useState<boolean>(true);

      useEffect(() => {
        if (backgroundImages.length <= 1) return;

        const timer = setInterval(() => {
          setFade(false);

           setTimeout(() => {
            setCurrentIndex((prevIndex) => {
              const nextIndex = prevIndex + 1;
              if (nextIndex >= shuffledItems.length) {
                const reshuffled = shuffleArray(backgroundImages);
                setShuffledItems(reshuffled);
                return 0;
              }
              return nextIndex;
            });
            setFade(true);
          }, 400);
        }, interval);

        return () => clearInterval(timer);
      }, [backgroundImages, interval, shuffledItems]);

  // const {
  //   props: { srcSet },
  // } = getImageProps({ alt: '', height: backgroundImages[currentIndex].height, width: backgroundImages[currentIndex].width, src: backgroundImages[currentIndex].url })
  // const backgroundImage = getBackgroundImage(srcSet)
  const style = { 
            height: '100vh', 
            width: '100vw', 
            opacity: fade ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
            zIndex: -1,
            position: 'absolute',
            top: 0,
            objectFit: 'cover'
          }
 
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.home}  key={currentIndex} >
          <Image
            src={backgroundImages[currentIndex].url}
            style={style}
            alt="Fougere"
            width={backgroundImages[currentIndex].width}
            height={backgroundImages[currentIndex].height}
            priority
          />
          <Image
            src="/logo.svg"
            alt="Fougere logo"
            width={200}
            height={75}
            priority
          />
          <p className={styles.home__title} >Studio créatif au service de votre passion</p>
          <a href="#" className={styles.home__scroll__item} >
            Découvrir
            <Image
            src="/arrow.svg"
            alt="Arrow button to scroll content"
            width={16}
            height={48}
            priority
          />
          </a>
        </div>

      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
