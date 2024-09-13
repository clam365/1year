'use client'
import styles from './page.module.css'
import { useRef, useEffect } from 'react';

export default function Index() {
  const steps = useRef(0);
  const currentIndex = useRef(0);
  const nbOfImages = useRef(0);
  const maxNumberOfImages = 16;
  const refs = useRef([]);

  const manageMouseMove = (e) => {
    const { clientX, clientY, movementX, movementY } = e;

    steps.current += Math.abs(movementX) + Math.abs(movementY);

    if (steps.current >= currentIndex.current * 150) {
      moveImage(clientX, clientY);

      if (nbOfImages.current === maxNumberOfImages) {
        removeImage();
      }
    }

    if (currentIndex.current === refs.current.length) {
      currentIndex.current = 0;
      steps.current = -150;
    }
  }

  const moveImage = (x, y) => {
    const currentImage = refs.current[currentIndex.current].current;
    currentImage.style.left = x + "px";
    currentImage.style.top = y + "px";
    currentImage.style.display = "block";
    currentIndex.current++;
    nbOfImages.current++;
    setZIndex();
  }

  const setZIndex = () => {
    const images = getCurrentImages();
    for (let i = 0; i < images.length; i++) {
      images[i].style.zIndex = i;
    }
  }

  const removeImage = () => {
    const images = getCurrentImages();
    images[0].style.display = "none";
    nbOfImages.current--;
  }

  const getCurrentImages = () => {
    let images = [];
    let indexOfFirst = currentIndex.current - nbOfImages.current;
    for (let i = indexOfFirst; i < currentIndex.current; i++) {
      let targetIndex = i;
      if (targetIndex < 0) targetIndex += refs.current.length;
      images.push(refs.current[targetIndex].current);
    }
    return images;
  }

  return (
      <div onMouseMove={manageMouseMove} className={styles.main}>
        {
          [...Array(16).keys()].map((_, index) => {
            const ref = useRef(null);
            // Push ref only during the initial mount
            useEffect(() => {
              refs.current[index] = ref;
            }, []);

            return <img key={index} ref={ref} src={`/images/${index}.png`} alt="image!" style={{ position: "absolute", display: "none" }} />;
          })
        }
      </div>
  )
}
