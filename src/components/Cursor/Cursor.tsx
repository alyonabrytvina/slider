import React, {
  FC,
  MutableRefObject,
  useEffect,
} from 'react';
import './Cursor.scss';

interface CursorProps {
  innerRef: MutableRefObject<HTMLDivElement | null>,
  circleRef: MutableRefObject<HTMLDivElement | null>,
}

export const Cursor: FC<CursorProps> = ({ innerRef, circleRef }) => {
  const onMouseMove = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    if (!innerRef.current || !circleRef.current) return;

    innerRef.current.style.left = `${x}px`;
    innerRef.current.style.top = `${y}px`;
    circleRef.current.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [innerRef.current, circleRef.current]);

  return (
    <div>
      <div className="cursor-circle" ref={circleRef} />
      <div className="cursor-inner" ref={innerRef} />
    </div>
  );
};
