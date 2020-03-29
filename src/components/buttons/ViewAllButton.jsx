import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import '@fortawesome/fontawesome-free/css/all.css';

import Button from './Button';
import { useInterval } from '../../helper/useInterval';


const NUMBER_OF_ARROWS = 3;
const NO_ANIMATION_ARROW_MARGIN_LEFT = -20;

const styles = createUseStyles({
  buttonRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  openButtonText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 32
  },
  openButtonIconWrapper: {
    marginRight: 2
  },
  openButtonIcon: (props) => ({
    fontSize: 60,
    marginLeft: NO_ANIMATION_ARROW_MARGIN_LEFT,
    color: 'gray'
  })
});

function ViewAllButton(props) {
  const openButtonHover = useRef(false);
  const arrowColors = [];
  let arrowIndex = NUMBER_OF_ARROWS - 1;

  const classes = styles({
    states: {},
    props
  });

  const arrows = useMemo(() => {
    let arrows = [];
    for (let i = 0; i < NUMBER_OF_ARROWS; ++i) {
      arrows[i] = { element: null, ref: null };
      arrows[i].element = <i ref={ref => arrows[i].ref = ref} key={`arrows-${i}`} className={"fas fa-chevron-left " + classes.openButtonIcon}></i>;
      arrowColors[i] = 'gray';
    }
    return arrows;
  }, [classes.openButtonIcon]);

  const buttonHoverHandler = () => {
    openButtonHover.current = true;
    playArrowsAnimation(NUMBER_OF_ARROWS - 1);
  };

  const buttonPointerLeaveHandler = () => {
    openButtonHover.current = false;
  };

  const playArrowsAnimation = (i) => {
    if (i >= 0) {
      let style = arrows[i].ref.style;
      style.transition = props.arrowAnimationDuration + 's';
      arrowColors[i] = arrowColors[i] === 'lightgray' ? 'gray' : 'lightgray';
      style.color = arrowColors[i];
      style.marginLeft = NO_ANIMATION_ARROW_MARGIN_LEFT - 10;
    }
  }

  const resetArrowColors = () => {
    for (let i = 0; i < arrows.length; ++i) {
      arrowColors[i] = 'gray';
      let style = arrows[i].ref.style;
      style.color = arrowColors[i];
    }
  };

  useEffect(() => {
    const transitionEndListeners = [];
    for (let i = 0; i < arrows.length; ++i) {
      transitionEndListeners.push(() => {
        if (arrowIndex > 0) {
          --arrowIndex;
        } else if (openButtonHover.current === true) {
          arrowIndex = NUMBER_OF_ARROWS - 1;
        } else if (arrowIndex === 0) {
          resetArrowColors();
          arrowIndex = -1;
        }
        playArrowsAnimation(arrowIndex);
      });
    }

    for (let i = 0; i < arrows.length; ++i) {
      arrows[i].ref.addEventListener('transitionend', transitionEndListeners[i]);
    }

    return () => {
      for (let i = 0; i < arrows.length; ++i) {
        arrows[i].ref.removeEventListener('transitionend', transitionEndListeners[i]);
      }
    }
  }, []);

  return (
    <div className={classes.buttonRoot}>
      <div className={classes.openButtonIconWrapper}>
        {arrows.map((item) => item.element)}
      </div>
      <Button width={250} height={60} borderRadius={10}
        onMouseOver={buttonHoverHandler} onMouseLeave={buttonPointerLeaveHandler}>
        <div className={classes.openButtonText}>View my works</div>
      </Button>
    </div>
  );
}

ViewAllButton.defaultProps = {
  arrowAnimationDuration: 0.1
};

export default ViewAllButton;
