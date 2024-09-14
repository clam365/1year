'use client';
import styles from './page.module.scss'
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {
  floating1,
  floating2,
  floating3,
  floating4,
  floating5,
  floating6,
  floating7,
  floating8
} from './components/floatingImage/data'
import {AnimatePresence} from "framer-motion";
import Preloader from "./Preloader/index"
import {OurTimeline} from "@/app/components/OurTimeline";

export default function Home() {

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start, target, amount) => start * (1 - amount) +target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`})

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;

    if(xForce !== 0 || yForce !== 0){
      requestAnimationFrame(animate);
    }
    else{
      cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null;
    }
  }


  const [isLoading, setIsLoading] = useState(true);
  useEffect( () => {
    (
        async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
        }
    )()
  }, [])

  return (
      <div>
        <main onMouseMove={(e) => {
          manageMouseMove(e)
        }} className={styles.main}>
          <AnimatePresence mode={"wait"}>
            {isLoading && <Preloader/>}
          </AnimatePresence>
          <div ref={plane1} className={styles.plane}>
            <Image
                src={floating1}
                alt='image'
                width={300}
            />
            <Image
                src={floating2}
                alt='image'
                width={300}
            />
            <Image
                src={floating7}
                alt='image'
                width={225}
            />
          </div>
          <div ref={plane2} className={styles.plane}>
            <Image
                src={floating4}
                alt='image'
                width={250}
            />
            <Image
                src={floating6}
                alt='image'
                width={200}
            />
            <Image
                src={floating8}
                alt='image'
                width={225}
            />
          </div>
          <div ref={plane3} className={styles.plane}>
            <Image
                src={floating3}
                alt='image'
                width={150}
            />
            <Image
                src={floating5}
                alt='image'
                width={200}
            />
          </div>
          <div className={styles.title}>
            <p>Happy One Year, Dani Soriano ❤️</p>
            <img src={"/milkandmocha.gif"} alt={"bruh"} className={"w-16 h-16 flex justify-center m-auto"}/>
          </div>
        </main>
        <div className={"m-auto flex justify-center mt-32"}>
          <OurTimeline/>
        </div>
      </div>

  )
}