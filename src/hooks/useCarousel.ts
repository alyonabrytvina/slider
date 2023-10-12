import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { slideAnimation } from '../utils/slideAnimation';
import { Breed } from '../store/breed/types';

export const useCarousel = (
  currIndex: number,
  isDetailedMode: boolean,
  breed?: Breed,
) => {
  const boxRef = useRef<HTMLLIElement[]>([]);
  const galleryRef = useRef<HTMLUListElement | null>(null);
  const slideRef = useRef<HTMLImageElement | null>(null);

  const innerRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onMouseDown = () => {
    if (innerRef.current) {
      innerRef.current.classList.add('cursor-inner--click');
    }
  };

  const onMouseUp = () => {
    if (innerRef.current) {
      innerRef.current.classList.remove('cursor-inner--click');
    }
  };

  const onMouseEnter = () => {
    if (!circleRef.current || !innerRef.current) return;

    circleRef.current.classList.add('cursor-circle--hovered');
    circleRef.current.innerHTML = `<span class="cursor-inner__text">${isDetailedMode ? breed?.name : 'discover'}</span>`;
    innerRef.current.classList.add('cursor-inner--hover');
  };

  const onMouseLeave = () => {
    if (!circleRef.current || !innerRef.current) return;

    circleRef.current.classList.remove('cursor-circle--hovered');
    circleRef.current.innerHTML = '';
    innerRef.current.classList.remove('cursor-inner--hover');
  };

  const handleClick = (
    type: 'next' | 'prev',
    startCallback: () => void,
    completeCallback: () => void,
  ) => {
    const timeLine = gsap.timeline();
    const direction = type === 'next' ? 1 : -1;

    timeLine.to('.slider__img', {
      x: -250 * direction,
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onStart: startCallback,
      onComplete: () => {
        slideAnimation(direction);
        completeCallback();
      },
    });

    timeLine.to(
      ' .slider__heading *',
      {
        x: -100 * direction,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.inOut',
      },
      '<',
    );
  };

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [buttonRef.current]);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.addEventListener('mouseenter', onMouseEnter);
      slideRef.current.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      slideRef.current?.removeEventListener('mouseenter', onMouseEnter);
      slideRef.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [slideRef.current, breed, isDetailedMode]);

  useEffect(() => {
    boxRef.current.forEach((card) => {
      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      boxRef.current.forEach((card) => {
        card.removeEventListener('mouseenter', onMouseEnter);
        card.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, [boxRef.current.length, breed, isDetailedMode]);

  const onClose = () => {
    if (currIndex === 0 || currIndex + 1 === boxRef.current.length) {
      boxRef.current[currIndex].scrollIntoView();
    } else {
      boxRef.current[currIndex + 1].scrollIntoView();
    }

    const timeLine = gsap.timeline();

    timeLine.to('.slider__detailed-view', {
      duration: 1.3,
      yPercent: -80,
      opacity: 0,
      zIndex: 1,
      onStart: () => {
        gsap.set('.slider__detailed-view', {
          background: 'linear-gradient(180deg, rgba(255,255,255,1) 75%, rgba(140,108,237,0) 100%)',
        });
      },
      onComplete: () => {
        gsap.set('.slider__detailed-view', {
          opacity: 0,
          zIndex: -1,
          yPercent: 0,
        });
      },
    });
  };

  return {
    boxRef,
    galleryRef,
    slideRef,
    buttonRef,
    innerRef,
    circleRef,
    handleClick,
    onClose,
  };
};
