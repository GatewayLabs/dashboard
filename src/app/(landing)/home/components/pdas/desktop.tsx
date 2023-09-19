'use client';
import { useRef, useEffect } from 'react';

import Wrapper from '@/app/(landing)/components/wrapper';
import { splitSpans } from '@/app/(landing)/utils/dom';
import { joinClasses } from '@/app/(landing)/utils/function';
import LenisManager, { IInstanceOptions } from '@/app/(landing)/utils/scroll';
import gsap from 'gsap';

import styles from './pdas.module.scss';

export default function Pdas() {
  // Refs for DOM elements
  const sectionRef = useRef<HTMLElement>(null);
  const linesParentRef = useRef<SVGGElement>(null);
  const logoBackgroundRef = useRef<SVGPathElement>(null);
  const logoContainerRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<SVGPathElement>(null);
  const logoTextRef = useRef<SVGSVGElement>(null);
  const textPdasRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pdasLogoContainerRef = useRef<HTMLDivElement>(null);
  const textPdasParagraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const slashRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Animation setup using useEffect
  useEffect(() => {
    const tl = createAnimation();

    // Scroll event handling
    const handleScroll = (e: IInstanceOptions) => {
      if (!sectionRef.current) return;

      const offsetTop =
        sectionRef.current.offsetTop - window.innerHeight / 2 + 200;
      const sectionHeight = sectionRef.current.clientHeight;
      const scrollSection = e.scroll - offsetTop;
      const progress = scrollSection / (sectionHeight - window.innerHeight);

      if (progress >= 0 && progress <= 1) {
        tl.progress(progress);
      } else if (progress < 0) {
        tl.progress(0);
      }
    };

    // Set second logo text bounds
    gsap.delayedCall(0.3, setLogoTextBounds);

    // Attach scroll event listener
    LenisManager?.on('scroll', handleScroll);

    // Cleanup function
    return () => {
      LenisManager?.off('scroll', handleScroll);
    };
  }, []);

  const createAnimation = () => {
    if (!linesParentRef.current || !logoContainerRef.current)
      return gsap.timeline();

    const lines = linesParentRef.current.querySelectorAll('path');
    const boundsLogo = logoContainerRef.current.getBoundingClientRect();

    const tl = gsap.timeline({ paused: true });

    tl.set(pdasLogoContainerRef.current, {
      leftPercent: 50,
      topPercent: 50,
      position: 'absolute',
      xPercent: -50,
      yPercent: -50,
    });
    tl.to(logoBackgroundRef.current, { autoAlpha: 1 });
    tl.fromTo(logoRef.current, { y: -10 }, { autoAlpha: 1, y: 0 }, '-=0.3');
    tl.set(logoContainerRef.current, { autoAlpha: 0 });
    tl.set(logoTextRef.current, { autoAlpha: 1 });
    tl.to(lines, {
      transform: 'scale(1)',
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.6,
      duration: 1,
    });
    tl.to(lines, {
      autoAlpha: 0,
      stagger: 0.1,
      ease: 'power4.out',
      duration: 1,
    });
    tl.to(logoTextRef.current, { scale: 120 / boundsLogo.width }, '-=1');
    tl.to(pdasLogoContainerRef.current, { y: -73 }, '<');

    textPdasRefs.current.forEach((element, index) => {
      if (!element) return;

      splitSpans(element, () => {
        const parent = element.parentNode as HTMLParagraphElement;
        const { height } = parent.getBoundingClientRect();
        gsap.set(parent, { height });
      });
      const spans = element.querySelectorAll('span');

      const paragraphBounds =
        textPdasParagraphRefs.current[0]?.getBoundingClientRect();
      const texPdaBounds = element.getBoundingClientRect();

      if (index === 0) {
        tl.set(slashRefs.current[0], { display: 'inline-block' });
        tl.from(spans, { width: 0, display: 'none', stagger: 0.1 });
        tl.set(logoTextRef.current, { transformOrigin: 'left' });
        tl.to(
          logoTextRef.current,
          {
            scale: 98 / boundsLogo.width,
            left: 0,
            x: 0,
            duration: 0.8,
          },
          '<'
        );
        tl.to(
          pdasLogoContainerRef.current,
          {
            leftPercent: 0,
            xPercent: 0,
            left: 0,
            y: -73 - 96,
            duration: 0.8,
          },
          '<'
        );

        if (!paragraphBounds) return;

        const x = paragraphBounds.left - texPdaBounds.left;
        tl.to(
          textPdasParagraphRefs.current,
          { x, y: -120, duration: 0.8 },
          '-=0.6'
        );
        tl.set(textPdasParagraphRefs.current, {
          textAlign: 'left',
          x: 0,
        });
        tl.set(slashRefs.current[0], { display: 'none' });
        tl.set(slashRefs.current[1], { display: 'inline-block' });
      } else {
        tl.from(spans, { width: 0, display: 'none', stagger: 0.1 });
      }
    });

    return tl;
  };

  // Function to set logo text bounds
  const setLogoTextBounds = () => {
    if (!logoTextRef.current || !logoContainerRef.current) return;

    const logoBounds = logoContainerRef.current.getBoundingClientRect();
    const logoTextBounds = logoTextRef.current.getBoundingClientRect();

    const top = logoBounds.top - logoTextBounds.top;
    const left = logoBounds.left - logoTextBounds.left;

    gsap.set(logoTextRef.current, { top, left });
    logoTextRef.current.style.width = `${logoBounds.width}px`;
  };

  return (
    <section className={styles.element} ref={sectionRef}>
      <div className={styles.svg_container}>
        <svg
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 1511"
        >
          <mask
            id="b"
            width="100%"
            height="100%"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
            style={{ maskType: 'alpha' }}
          >
            <g
              clipPath="url(#lines)"
              className={styles.lines_parent}
              ref={linesParentRef}
            >
              <path
                fill="#771AC9"
                d="M771.871 859.602H667.128a51.776 51.776 0 0 1-51.731-51.73V703.128a51.776 51.776 0 0 1 51.731-51.73h104.743a51.776 51.776 0 0 1 51.731 51.73v104.744a51.776 51.776 0 0 1-51.731 51.73ZM667.128 655.107a48.086 48.086 0 0 0-48.021 48.021v104.744a48.082 48.082 0 0 0 48.021 48.021h104.743a48.082 48.082 0 0 0 48.021-48.021V703.128a48.083 48.083 0 0 0-48.021-48.021H667.128Z"
              />
              <path
                fill="#771AC9"
                d="M795.341 906.132H643.643a74.878 74.878 0 0 1-74.783-74.791v-151.69a74.87 74.87 0 0 1 74.783-74.783h151.698a74.878 74.878 0 0 1 74.79 74.783v151.69a74.884 74.884 0 0 1-74.79 74.791ZM643.643 609.969a69.753 69.753 0 0 0-49.25 20.432 69.753 69.753 0 0 0-20.432 49.25v151.69a69.756 69.756 0 0 0 69.682 69.69h151.698a69.765 69.765 0 0 0 69.69-69.69v-151.69a69.763 69.763 0 0 0-69.69-69.682H643.643Z"
              />
              <path
                fill="#771AC9"
                d="M818.818 952.661H620.212a97.957 97.957 0 0 1-97.897-97.842V656.212a97.962 97.962 0 0 1 97.866-97.873h198.607a97.95 97.95 0 0 1 97.834 97.842v198.607a97.952 97.952 0 0 1-97.804 97.873ZM620.212 564.83a91.463 91.463 0 0 0-91.382 91.351v198.607a91.459 91.459 0 0 0 91.351 91.382h198.607a91.454 91.454 0 0 0 91.343-91.351V656.212a91.456 91.456 0 0 0-91.343-91.351l-198.576-.031Z"
              />
              <path
                fill="#771AC9"
                d="M842.296 999.183H596.704c-66.66 0-120.894-54.227-120.894-120.887V632.704c0-66.661 54.234-120.887 120.894-120.887h245.592c66.661 0 120.887 54.226 120.887 120.887v245.592c0 66.66-54.226 120.887-120.887 120.887ZM596.704 519.699c-62.317 0-113.027 50.695-113.027 113.005v245.592c0 62.31 50.694 113.004 113.012 113.004h245.592c62.31 0 113.004-50.694 113.004-113.004V632.704c0-62.31-50.694-113.005-113.004-113.005H596.704Z"
              />
              <path
                fill="#771AC9"
                d="M865.773 1045.71H573.226c-79.373 0-143.939-64.571-143.939-143.937V609.227c0-79.365 64.566-143.939 143.939-143.939h292.547c79.365 0 143.937 64.574 143.937 143.939v292.546c0 79.381-64.572 143.937-143.937 143.937ZM573.226 474.561c-74.257 0-134.665 60.409-134.665 134.666v292.546c0 74.257 60.408 134.667 134.665 134.667h292.547c74.257 0 134.667-60.41 134.667-134.667V609.227c0-74.257-60.41-134.666-134.667-134.666H573.226Z"
              />
              <path
                fill="#771AC9"
                d="M889.243 1092.24H549.749c-21.93 0-43.645-4.32-63.906-12.71a166.897 166.897 0 0 1-54.177-36.2 166.984 166.984 0 0 1-48.908-118.087V585.749a166.99 166.99 0 0 1 166.991-166.991h339.494a166.984 166.984 0 0 1 118.087 48.908 166.897 166.897 0 0 1 36.2 54.177 167.036 167.036 0 0 1 12.71 63.906v339.494a166.976 166.976 0 0 1-48.91 118.087 166.901 166.901 0 0 1-54.178 36.2 167.055 167.055 0 0 1-63.909 12.71ZM549.749 429.422c-86.165 0-156.327 70.131-156.327 156.327v339.494c0 86.207 70.162 156.377 156.327 156.377h339.494c86.204 0 156.337-70.13 156.337-156.339V585.749c0-86.196-70.133-156.327-156.337-156.327H549.749Z"
              />
              <path
                fill="#771AC9"
                d="M912.72 1138.8H526.28c-24.962 0-49.68-4.91-72.742-14.47a190.036 190.036 0 0 1-102.858-102.89 190.004 190.004 0 0 1-14.451-72.743V562.303a190.034 190.034 0 0 1 55.645-134.421 190.041 190.041 0 0 1 134.406-55.684h386.44c24.963 0 49.681 4.917 72.742 14.472a190.111 190.111 0 0 1 61.668 41.212 190.206 190.206 0 0 1 41.19 61.675 189.958 189.958 0 0 1 14.45 72.746v386.394c.01 24.962-4.9 49.682-14.45 72.743a190.132 190.132 0 0 1-41.19 61.68 190.106 190.106 0 0 1-61.668 41.21 189.94 189.94 0 0 1-72.742 14.47ZM526.28 384.284a177.996 177.996 0 0 0-125.873 52.14 177.992 177.992 0 0 0-52.123 125.879v386.394a177.984 177.984 0 0 0 13.54 68.123 177.992 177.992 0 0 0 38.583 57.76 178.07 178.07 0 0 0 57.75 38.59 178.129 178.129 0 0 0 68.123 13.55h386.44c23.377 0 46.525-4.61 68.123-13.55a178.068 178.068 0 0 0 57.747-38.59 178.09 178.09 0 0 0 38.59-57.76 178.115 178.115 0 0 0 13.54-68.123V562.303c0-23.377-4.6-46.525-13.54-68.124a178.091 178.091 0 0 0-38.59-57.755 178.007 178.007 0 0 0-57.747-38.591 177.996 177.996 0 0 0-68.123-13.549H526.28Z"
              />
              <path
                fill="#771AC9"
                d="M936.198 1185.3H502.803a213.11 213.11 0 0 1-213.096-213.103V538.803a213.111 213.111 0 0 1 213.096-213.104h433.395a213.094 213.094 0 0 1 150.682 62.419 213.08 213.08 0 0 1 62.42 150.685v433.394a213.06 213.06 0 0 1-62.42 150.683 213.066 213.066 0 0 1-150.682 62.42ZM502.803 339.145a199.657 199.657 0 0 0-141.181 58.476 199.646 199.646 0 0 0-58.476 141.182v433.394a199.603 199.603 0 0 0 15.196 76.403 199.603 199.603 0 0 0 43.28 64.78 199.594 199.594 0 0 0 64.774 43.28 199.538 199.538 0 0 0 76.407 15.19h433.395c26.219.01 52.182-5.16 76.402-15.19a199.556 199.556 0 0 0 64.78-43.28 199.556 199.556 0 0 0 43.28-64.78 199.7 199.7 0 0 0 15.2-76.403V538.803c0-26.22-5.17-52.183-15.2-76.407a199.62 199.62 0 0 0-108.06-108.055 199.62 199.62 0 0 0-76.402-15.196H502.803Z"
              />
              <path
                fill="#771AC9"
                d="M959.713 1231.83H479.325a236.181 236.181 0 0 1-166.983-69.17 236.174 236.174 0 0 1-69.173-166.985V515.326a236.172 236.172 0 0 1 236.156-236.157h480.388a236.201 236.201 0 0 1 166.987 69.173 236.224 236.224 0 0 1 69.17 166.984v480.349a236.226 236.226 0 0 1-69.17 166.985 236.203 236.203 0 0 1-166.987 69.17ZM479.325 294.007a221.304 221.304 0 0 0-156.488 64.826 221.307 221.307 0 0 0-64.815 156.493v480.349a221.294 221.294 0 0 0 64.82 156.495 221.322 221.322 0 0 0 71.802 47.98 221.362 221.362 0 0 0 84.696 16.84h480.373c29.064 0 57.847-5.72 84.697-16.84a221.314 221.314 0 0 0 71.8-47.98 221.473 221.473 0 0 0 47.98-71.8 221.345 221.345 0 0 0 16.84-84.695V515.326c0-29.065-5.72-57.845-16.84-84.697a221.482 221.482 0 0 0-47.98-71.802 221.316 221.316 0 0 0-156.497-64.82H479.325Z"
              />
              <path
                fill="#771AC9"
                d="M983.144 1278.36H455.856a259.225 259.225 0 0 1-183.294-75.92 259.243 259.243 0 0 1-75.922-183.3V491.848A259.214 259.214 0 0 1 455.856 232.64h527.296a259.228 259.228 0 0 1 259.218 259.208v527.292a259.26 259.26 0 0 1-75.93 183.29 259.217 259.217 0 0 1-183.288 75.93h-.008ZM455.856 248.868a242.973 242.973 0 0 0-242.988 242.98v527.292a242.98 242.98 0 0 0 18.492 92.99 242.983 242.983 0 0 0 52.673 78.84 243.014 243.014 0 0 0 78.833 52.67 243.022 243.022 0 0 0 92.99 18.49h527.296c64.448 0 126.248-25.6 171.818-71.17a242.98 242.98 0 0 0 71.17-171.82V491.848a242.97 242.97 0 0 0-71.17-171.813 243.006 243.006 0 0 0-171.818-71.167H455.856Z"
              />
              <path
                fill="#771AC9"
                d="M1006.62 1324.89H432.371a281.915 281.915 0 0 1-108.048-21.44 281.897 281.897 0 0 1-91.6-61.18 282.079 282.079 0 0 1-82.613-199.65V468.379a282.564 282.564 0 0 1 172.394-260.082 280.528 280.528 0 0 1 109.867-22.179h574.249c37.75-.074 75.12 7.47 109.88 22.179a282.037 282.037 0 0 1 125.46 104.02 281.992 281.992 0 0 1 46.96 156.062v574.241c.03 37.08-7.26 73.8-21.43 108.06a282.175 282.175 0 0 1-61.2 91.61c-26.22 26.21-57.35 47-91.61 61.18a282.135 282.135 0 0 1-108.06 21.42ZM432.371 203.73a262.928 262.928 0 0 0-187.13 77.518 262.89 262.89 0 0 0-77.511 187.131v574.241c0 70.19 27.881 137.5 77.511 187.13a264.648 264.648 0 0 0 187.13 77.52h574.249c70.19 0 137.5-27.89 187.13-77.52a264.635 264.635 0 0 0 77.51-187.13V468.379c.1-34.768-6.7-69.209-20.01-101.33a262.852 262.852 0 0 0-57.5-85.801 262.856 262.856 0 0 0-85.8-57.503 262.901 262.901 0 0 0-101.33-20.015H432.371Z"
              />
              <path
                fill="#771AC9"
                d="M1030.1 1371.41H408.902c-40.104.03-79.82-7.84-116.877-23.17a305.168 305.168 0 0 1-99.085-66.18 305.1 305.1 0 0 1-89.359-215.96V444.901a305.639 305.639 0 0 1 186.474-281.294 303.36 303.36 0 0 1 118.847-24.019H1030.1c40.83-.08 81.25 8.081 118.85 23.996a304.318 304.318 0 0 1 97.04 65.424 304.326 304.326 0 0 1 66.25 99.024 304.338 304.338 0 0 1 23.17 116.869V1066.1a304.997 304.997 0 0 1-89.35 215.96 305.084 305.084 0 0 1-99.08 66.18 305.185 305.185 0 0 1-116.88 23.17ZM408.902 158.599a284.47 284.47 0 0 0-111.467 22.496 285.153 285.153 0 0 0-91.004 61.359 285.342 285.342 0 0 0-83.862 202.47V1066.1a286.089 286.089 0 0 0 21.732 109.61 286.17 286.17 0 0 0 62.064 92.92 286.002 286.002 0 0 0 92.927 62.05c34.753 14.38 72 21.76 109.61 21.72H1030.1c37.61.03 74.85-7.35 109.6-21.73a286.227 286.227 0 0 0 92.92-62.05 286.227 286.227 0 0 0 62.05-92.92 286.018 286.018 0 0 0 21.73-109.6V444.901a286.55 286.55 0 0 0-47.72-158.228 286.58 286.58 0 0 0-127.15-105.578 284.355 284.355 0 0 0-111.43-22.496H408.902Z"
              />
              <path
                fill="#771AC9"
                d="M1053.58 1417.94H385.424a328.14 328.14 0 0 1-125.692-24.93 328.183 328.183 0 0 1-106.556-71.17 328.156 328.156 0 0 1-71.163-106.57 328.073 328.073 0 0 1-24.915-125.69V421.424a327.329 327.329 0 0 1 96.135-232.191 327.366 327.366 0 0 1 104.372-70.37 326.3 326.3 0 0 1 127.819-25.804h668.156c43.9-.084 87.38 8.692 127.82 25.804a327.401 327.401 0 0 1 104.37 70.37 327.39 327.39 0 0 1 71.25 106.5 327.546 327.546 0 0 1 24.92 125.691v668.156a328.01 328.01 0 0 1-24.92 125.7 328.051 328.051 0 0 1-71.17 106.57 328.051 328.051 0 0 1-106.57 71.17 328.01 328.01 0 0 1-125.7 24.92ZM385.424 113.476a306.023 306.023 0 0 0-119.874 24.181 306.935 306.935 0 0 0-97.889 66.004 306.975 306.975 0 0 0-90.2 217.763v668.156a307.677 307.677 0 0 0 23.37 117.89 307.69 307.69 0 0 0 166.699 166.7 307.684 307.684 0 0 0 117.894 23.37h668.156c40.45.04 80.51-7.9 117.9-23.37a307.603 307.603 0 0 0 99.95-66.75 307.672 307.672 0 0 0 90.13-217.84V421.424c.06-40.45-7.88-80.512-23.36-117.884a307.008 307.008 0 0 0-66.84-99.879 306.923 306.923 0 0 0-97.89-66.004 305.961 305.961 0 0 0-119.87-24.196l-668.176.015Z"
              />
              <path
                fill="#771AC9"
                d="M1077.05 1464.47H361.947c-46.16.04-91.874-9.03-134.528-26.67a351.205 351.205 0 0 1-114.048-76.18 351.062 351.062 0 0 1-76.17-114.05 351.076 351.076 0 0 1-26.671-134.52V397.947a349.185 349.185 0 0 1 27.62-136.784 350.195 350.195 0 0 1 75.307-111.706 350.323 350.323 0 0 1 111.699-75.308 349.184 349.184 0 0 1 136.783-27.62h715.101c46.99-.089 93.51 9.305 136.78 27.62a350.25 350.25 0 0 1 111.7 75.308 350.359 350.359 0 0 1 75.31 111.699 349.3 349.3 0 0 1 27.62 136.783v715.111c.04 46.16-9.03 91.87-26.67 134.53a351.245 351.245 0 0 1-76.18 114.05 351.11 351.11 0 0 1-248.58 102.84h.03ZM361.947 68.322a327.482 327.482 0 0 0-128.282 25.896 328.566 328.566 0 0 0-104.798 70.648 328.513 328.513 0 0 0-70.648 104.783 327.485 327.485 0 0 0-25.897 128.282v715.119a329.327 329.327 0 0 0 25.013 126.18 329.261 329.261 0 0 0 71.446 106.98 329.257 329.257 0 0 0 106.978 71.45 329.34 329.34 0 0 0 126.188 25.02h715.103c43.29.04 86.18-8.46 126.19-25.02a329.428 329.428 0 0 0 106.98-71.44 329.615 329.615 0 0 0 71.45-106.98 329.374 329.374 0 0 0 25.01-126.19V397.947a327.72 327.72 0 0 0-25.9-128.283 328.644 328.644 0 0 0-70.65-104.782 328.543 328.543 0 0 0-104.78-70.648 327.513 327.513 0 0 0-128.28-25.896l-715.123-.016Z"
              />
              <path
                fill="#771AC9"
                d="M1100.52 1511H338.469c-49.187.04-97.9-9.62-143.351-28.43a374.112 374.112 0 0 1-121.527-81.17A374.176 374.176 0 0 1-36 1136.52V374.516A372.066 372.066 0 0 1-6.565 228.745a373.128 373.128 0 0 1 80.246-119.009 373.12 373.12 0 0 1 119.01-80.247A372.024 372.024 0 0 1 338.469 0h762.051a372.068 372.068 0 0 1 145.77 29.436 373.03 373.03 0 0 1 119 80.246 373.251 373.251 0 0 1 80.25 119.01A372.323 372.323 0 0 1 1475 374.516v762.044c.04 49.19-9.62 97.9-28.43 143.35a373.959 373.959 0 0 1-81.17 121.53 374.011 374.011 0 0 1-121.53 81.17 374.056 374.056 0 0 1-143.35 28.43v-.04ZM338.469 23.183A349.06 349.06 0 0 0 201.74 50.787a350.077 350.077 0 0 0-111.668 75.285 350.08 350.08 0 0 0-75.285 111.66 349.07 349.07 0 0 0-27.604 136.784v762.044A350.975 350.975 0 0 0 90 1385.02a350.951 350.951 0 0 0 114.002 76.14 351.3 351.3 0 0 0 134.468 26.66h762.051c46.15.03 91.84-9.03 134.48-26.67A350.963 350.963 0 0 0 1425.15 1271a351.16 351.16 0 0 0 26.67-134.48V374.516a349.117 349.117 0 0 0-27.61-136.784 350.136 350.136 0 0 0-75.28-111.667 350.191 350.191 0 0 0-111.67-75.285 349.128 349.128 0 0 0-136.74-27.604l-762.051.007Z"
              />
            </g>
          </mask>
          <g mask="url(#b)">
            <rect width="100%" height="100%" x="0" fill="#771AC9" />
            <rect
              width="100%"
              height="100%"
              x="0"
              fill="url(#c)"
              fillOpacity=".5"
            />
            <rect width="100%" height="100%" x="0" fill="url(#d)" />
          </g>
          <g clipPath="url(#logo)" ref={logoContainerRef}>
            <path
              className={styles.logo_background}
              ref={logoBackgroundRef}
              fill="#E6D5FA"
              d="M647 720.61c0-19.667 15.943-35.61 35.61-35.61h74.78c19.667 0 35.61 15.943 35.61 35.61v74.78c0 19.667-15.943 35.61-35.61 35.61h-74.78c-19.667 0-35.61-15.943-35.61-35.61v-74.78Z"
            />
            <g
              fill="#771AC9"
              clipPath="url(#f)"
              ref={logoRef}
              className={styles.logo}
            >
              <path d="M683.319 804.333a3.148 3.148 0 0 1-2.412-.898 3.08 3.08 0 0 1-.907-2.388v-55.869c.052-9.048 3.706-17.712 10.169-24.11 6.463-6.399 15.214-10.016 24.354-10.068h10.954c9.14.052 17.891 3.669 24.354 10.068 6.463 6.398 10.117 15.062 10.169 24.11v14.461a3.27 3.27 0 0 1-.972 2.323 3.336 3.336 0 0 1-2.348.963c-.88 0-1.724-.346-2.347-.963a3.27 3.27 0 0 1-.972-2.323v-14.461a27.632 27.632 0 0 0-8.215-19.472 28.191 28.191 0 0 0-19.669-8.133h-10.954a28.191 28.191 0 0 0-19.669 8.133 27.632 27.632 0 0 0-8.215 19.472v55.869c0 .872-.35 1.707-.972 2.324a3.339 3.339 0 0 1-2.348.962Z" />
              <path d="M729.461 776.07a3.15 3.15 0 0 1-2.413-.898 3.08 3.08 0 0 1-.907-2.388v-22.676a5.143 5.143 0 0 0-.386-2.023 5.192 5.192 0 0 0-1.15-1.715 5.25 5.25 0 0 0-1.732-1.138 5.292 5.292 0 0 0-2.043-.382h-1.328a5.288 5.288 0 0 0-2.043.382 5.25 5.25 0 0 0-1.732 1.138 5.192 5.192 0 0 0-1.15 1.715 5.143 5.143 0 0 0-.386 2.023v22.676c0 .872-.35 1.707-.972 2.324a3.339 3.339 0 0 1-2.348.962c-.88 0-1.724-.346-2.347-.962a3.273 3.273 0 0 1-.972-2.324v-22.676a11.688 11.688 0 0 1 .901-4.533 11.808 11.808 0 0 1 2.589-3.843 11.936 11.936 0 0 1 3.882-2.563 12.026 12.026 0 0 1 4.578-.892h1.328a12.03 12.03 0 0 1 4.578.892 11.936 11.936 0 0 1 3.882 2.563c1.11 1.1 1.99 2.406 2.589 3.843.599 1.438.905 2.978.901 4.533v22.676a3.536 3.536 0 0 1-1.041 2.256 3.602 3.602 0 0 1-2.278 1.03Z" />
              <path d="M723.154 791.516h-5.975a24.135 24.135 0 0 1-9.196-1.936 23.935 23.935 0 0 1-7.734-5.294 24.586 24.586 0 0 1-6.639-13.802 3.261 3.261 0 0 1 .847-2.54 3.343 3.343 0 0 1 2.473-1.075 3.535 3.535 0 0 1 2.194.89 3.472 3.472 0 0 1 1.125 2.067 18.56 18.56 0 0 0 4.98 10.188 17.3 17.3 0 0 0 11.95 5.258h5.975a16.74 16.74 0 0 0 6.52-1.414 16.596 16.596 0 0 0 5.43-3.844 18.553 18.553 0 0 0 4.979-13.145v-18.404a20.806 20.806 0 0 0-4.979-13.146 17.309 17.309 0 0 0-11.95-5.258h-5.975c-2.248.03-4.466.511-6.52 1.415a16.583 16.583 0 0 0-5.43 3.843 18.56 18.56 0 0 0-4.98 13.146 3.27 3.27 0 0 1-.972 2.324 3.337 3.337 0 0 1-2.347.962c-.88 0-1.725-.346-2.347-.962a3.271 3.271 0 0 1-.973-2.324 24.092 24.092 0 0 1 1.724-9.4 24.294 24.294 0 0 1 5.247-8.018 23.253 23.253 0 0 1 7.71-5.349 23.445 23.445 0 0 1 9.22-1.881h5.643c3.165.037 6.29.695 9.196 1.936a23.936 23.936 0 0 1 7.733 5.294 25.651 25.651 0 0 1 6.971 17.418v18.404a24.098 24.098 0 0 1-1.723 9.4 24.266 24.266 0 0 1-5.248 8.017 23.224 23.224 0 0 1-7.709 5.349 23.428 23.428 0 0 1-9.22 1.881Z" />
            </g>
          </g>
          <defs>
            <clipPath id="lines">
              <path fill="#fff" d="M-36 0h1511v1511H-36z" />
            </clipPath>
            <clipPath id="logo">
              <path fill="#fff" d="M647 685h146v146H647z" />
            </clipPath>
            <clipPath id="f">
              <path fill="#fff" d="M680 711h80v93.333h-80z" />
            </clipPath>
            <radialGradient
              id="c"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(0 480 -2891.67 0 719 750)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopOpacity="0" />
              <stop offset="1" />
            </radialGradient>
            <radialGradient
              id="d"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(0 360 -645.988 0 719 750)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00E0FF" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <Wrapper className={styles.wrapper}>
          <div
            className={styles.pdas_logo_container}
            ref={pdasLogoContainerRef}
          >
            <svg
              className={styles.logo_text}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 120 120"
              ref={logoTextRef}
            >
              <g clipPath="url(#a)">
                <path
                  fill="#E6D5FA"
                  d="M0 29.268C0 13.104 13.104 0 29.268 0h61.464C106.896 0 120 13.104 120 29.268v61.464C120 106.896 106.896 120 90.732 120H29.268C13.104 120 0 106.896 0 90.732V29.268Z"
                />
                <g fill="#771AC9" clipPath="url(#b)">
                  <path d="M29.851 98.082a2.588 2.588 0 0 1-1.983-.738 2.536 2.536 0 0 1-.745-1.963v-45.92a28.113 28.113 0 0 1 8.358-19.816c5.312-5.259 12.505-8.232 20.017-8.275H64.5c7.512.043 14.705 3.016 20.017 8.275a28.114 28.114 0 0 1 8.358 19.817v11.885c0 .716-.287 1.403-.799 1.91a2.743 2.743 0 0 1-1.93.791 2.743 2.743 0 0 1-1.928-.791 2.687 2.687 0 0 1-.8-1.91V49.462a22.711 22.711 0 0 0-6.752-16.005 23.172 23.172 0 0 0-16.166-6.685h-9.003a23.172 23.172 0 0 0-16.166 6.685 22.711 22.711 0 0 0-6.752 16.005v45.92c0 .716-.288 1.403-.8 1.91a2.742 2.742 0 0 1-1.929.79Z" />
                  <path d="M67.776 74.853a2.588 2.588 0 0 1-1.983-.738 2.536 2.536 0 0 1-.746-1.963V53.513a4.23 4.23 0 0 0-.317-1.663 4.264 4.264 0 0 0-.945-1.41 4.347 4.347 0 0 0-3.103-1.25h-1.091a4.347 4.347 0 0 0-3.103 1.25 4.264 4.264 0 0 0-.945 1.41 4.23 4.23 0 0 0-.318 1.663V72.15c0 .717-.287 1.404-.799 1.91a2.742 2.742 0 0 1-1.929.792 2.742 2.742 0 0 1-1.93-.791 2.687 2.687 0 0 1-.798-1.91V53.513a9.614 9.614 0 0 1 .74-3.726 9.692 9.692 0 0 1 2.128-3.158 9.805 9.805 0 0 1 3.19-2.108 9.88 9.88 0 0 1 3.764-.732h1.091a9.88 9.88 0 0 1 3.763.733 9.805 9.805 0 0 1 3.19 2.107 9.69 9.69 0 0 1 2.129 3.158 9.614 9.614 0 0 1 .74 3.726V72.15c-.05.7-.354 1.359-.855 1.855a2.96 2.96 0 0 1-1.873.847Z" />
                  <path d="M62.591 87.548H57.68a19.843 19.843 0 0 1-7.559-1.591 19.677 19.677 0 0 1-6.356-4.351A20.202 20.202 0 0 1 38.31 70.26a2.676 2.676 0 0 1 .696-2.087 2.727 2.727 0 0 1 2.032-.884c.669.03 1.306.288 1.804.732.497.443.824 1.043.924 1.699a15.255 15.255 0 0 0 4.093 8.373 14.225 14.225 0 0 0 9.822 4.322h4.911c1.848-.024 3.67-.42 5.36-1.163a13.64 13.64 0 0 0 4.462-3.159 15.255 15.255 0 0 0 4.093-10.804V52.163a17.106 17.106 0 0 0-4.093-10.804 14.225 14.225 0 0 0-9.822-4.322H57.68c-1.847.024-3.67.42-5.36 1.163a13.64 13.64 0 0 0-4.462 3.159 15.255 15.255 0 0 0-4.093 10.804c0 .717-.287 1.404-.799 1.91a2.742 2.742 0 0 1-1.929.791 2.742 2.742 0 0 1-1.93-.79 2.688 2.688 0 0 1-.798-1.91 19.811 19.811 0 0 1 1.416-7.727 19.969 19.969 0 0 1 4.313-6.59 19.099 19.099 0 0 1 6.337-4.396 19.263 19.263 0 0 1 7.578-1.546h4.638c2.601.03 5.17.571 7.559 1.591a19.677 19.677 0 0 1 6.356 4.351 21.09 21.09 0 0 1 5.73 14.316V67.29a19.814 19.814 0 0 1-1.417 7.726 19.97 19.97 0 0 1-4.313 6.59 19.101 19.101 0 0 1-6.337 4.396 19.264 19.264 0 0 1-7.578 1.546Z" />
                </g>
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h120v120H0z" />
                </clipPath>
                <clipPath id="b">
                  <path fill="#fff" d="M27.123 21.37h65.753v76.712H27.123z" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={styles.text_container}>
            <p
              className={joinClasses(
                styles.pdas_text,
                styles['pdas_text--white']
              )}
              ref={(ref) => (textPdasParagraphRefs.current[0] = ref)}
            >
              <span ref={(ref) => (textPdasRefs.current[0] = ref)}>
                Private Data Assets (PDAs)
              </span>
              <span
                className={styles.type_slash}
                ref={(ref) => (slashRefs.current[0] = ref)}
              >
                _
              </span>
            </p>
            <p
              className={joinClasses(
                styles.pdas_text,
                styles['pdas_text--purple']
              )}
              ref={(ref) => (textPdasParagraphRefs.current[1] = ref)}
            >
              <span ref={(ref) => (textPdasRefs.current[1] = ref)}>
                The foundation for true data privacy, sovereignty, and
                portability. Turn raw data into encrypted, secure, portable, and
                publicly verifiable assets.
              </span>
              <span
                className={styles.type_slash}
                ref={(ref) => (slashRefs.current[1] = ref)}
              >
                _
              </span>
            </p>
          </div>
        </Wrapper>
      </div>
    </section>
  );
}
