import { gsap } from 'gsap';

export const slideAnimation = (direction: number) => {
  const timeLine = gsap.timeline();

  timeLine.to('.slider__detailed-view', {
    duration: 0.2,
  });

  timeLine.fromTo(
    '.slider__img',
    {
      x: 150 * direction,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      transform: `scale(${1.1}) rotate(${3}deg)`,

    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      transform: `scale(${1}) rotate(${0}deg)`,

    },
  );

  timeLine.fromTo(
    '.slider__heading *',
    {
      x: 50 * direction,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
    },
    '<',
  );
};
