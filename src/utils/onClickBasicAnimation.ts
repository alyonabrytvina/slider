import gsap from 'gsap';

export const onClickBasicAnimation = () => {
  gsap.set('.slider__detailed-view', {
    yPercent: -100,
    zIndex: 1,
    background: 'white',
  });

  gsap.set('.slider__master-view', {
    zIndex: -1,
  });

  const timeLine = gsap.timeline();

  timeLine.to('.slider__detailed-view', {
    duration: 1,
    yPercent: 0,
    opacity: 1,
    zIndex: 1,
    onStart: () => {
      gsap.set('.slider__detailed-view', {
        background: 'white',
        zIndex: 1,
      });
    },
    onComplete: () => {
      gsap.set('.slider__detailed-view', {
        opacity: 1,
        zIndex: 1,
        yPercent: 0,
      });
    },
  });
};
