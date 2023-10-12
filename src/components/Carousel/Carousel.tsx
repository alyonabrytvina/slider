import React, { useEffect, useState } from 'react';
import {
  fetchBreedsThunk,
  fetchCatAndUpdateThunk,
} from '../../store/breed/thunks';
import { currentBreed, nextBreed, prevBreed } from '../../store/breed/slice';
import { Cursor } from '../Cursor/Cursor';
import './Carousel.scss';
import {
  getBreed,
  getBreedIndex,
  getBreedList,
} from '../../store/breed/selectors';
import { useCarousel } from '../../hooks/useCarousel';
import { useAppDispatch, useAppSelector } from '../../store';
import { Breed } from '../../store/breed/types';
import { onClickBasicAnimation } from '../../utils/onClickBasicAnimation';

export const Carousel = () => {
  const dispatch = useAppDispatch();

  const currIndex = useAppSelector(getBreedIndex);
  const breeds = useAppSelector(getBreedList);
  const breed = useAppSelector(getBreed);

  const [isSwitching, setIsSwitching] = useState(false);
  const [isDetailedMode, setIsDetailedMode] = useState(false);

  const {
    boxRef,
    galleryRef,
    slideRef,
    buttonRef,
    innerRef,
    circleRef,
    handleClick,
    onClose,
  } = useCarousel(currIndex, isDetailedMode, breed);

  const handleClickUpdate = (data?: Breed) => () => {
    if (data) {
      dispatch(fetchCatAndUpdateThunk(data.id));
    }
  };

  const handleClickClose = () => {
    setIsDetailedMode(false);
    onClose();
  };

  const onClick = (type: 'next' | 'prev') => () => {
    if (isSwitching) {
      return;
    }

    handleClick(
      type,
      () => {
        setIsSwitching(true);
      },
      () => {
        if (type === 'next') {
          dispatch(nextBreed());
        } else {
          dispatch(prevBreed());
        }
      },
    );
  };

  const fetchList = () => {
    dispatch(fetchBreedsThunk());
  };

  useEffect(fetchList, []);
  useEffect(() => {
    setIsSwitching(false);
  }, [currIndex]);

  const onClickSelectedCard = (breedId: string) => () => {
    dispatch(currentBreed(breedId));
    setIsDetailedMode(true);
    onClickBasicAnimation();
  };

  const setRef = (index: number) => (el: HTMLLIElement) => { boxRef.current[index] = el; };

  return (
    <div className="slider">
      <Cursor circleRef={circleRef} innerRef={innerRef} />
      <div className="slider__detailed-view ">
        <div className="slider__inner-content">
          <button
            className="slider__btn-close"
            onClick={handleClickClose}
            ref={buttonRef}
          />
          <div className="slider__wrapper">
            <div className="slider__btn-wrapper">
              <button
                className="slider__btn-switch slider__btn-switch--dark"
                onClick={onClick('prev')}
              />
            </div>
            <div className="slider__content">
              <div className="slider__img-wrapper">
                <img
                  ref={slideRef}
                  src={breed?.image?.url}
                  alt={breed?.name}
                  className="slider__img"
                />
              </div>
              <div className="slider__heading">
                <h2 className="slider__title">{ breed?.name }</h2>
                <div
                  className="slider__description"
                >
                  { breed?.description }
                </div>
                <button
                  className="slider__btn-refresh"
                  onClick={handleClickUpdate(breed)}
                >
                  Refresh
                </button>
              </div>
            </div>
            <div className="slider__btn-wrapper">
              <button
                className="slider__btn-switch slider__btn-switch--light"
                onClick={onClick('next')}
                ref={buttonRef}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="slider__master-view">
        <ul className="slider__cards" ref={galleryRef}>
          { breeds?.map((card, index) => (
            <li
              key={card.id}
              ref={setRef(index)}
              className="slider__card-wrapper"
            >
              <img
                src={card?.image?.url}
                className="slider__card"
                onClick={onClickSelectedCard(card.id)}
                onKeyDown={onClickSelectedCard(card.id)}
                alt={card?.name}
              />
            </li>
          )) }
        </ul>
      </div>
    </div>
  );
};
