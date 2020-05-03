import React, { useMemo, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import '@fortawesome/fontawesome-free/css/all.css';
import anime from 'animejs';

import Button from './Button';
import FadingSmoke from '../animated/FadingSmoke';

const NUMBER_OF_ARROWS = 3;
const NO_ANIMATION_ARROW_MARGIN_LEFT = -20;

const styles = createUseStyles({
  buttonRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  openButtonText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 32
  },
  openButtonIconWrapper: {
    marginRight: 2
  },
  openButtonIcon: {
    fontSize: 60,
    marginLeft: NO_ANIMATION_ARROW_MARGIN_LEFT,
    color: 'gray'
  },
  smokeCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none'
  }
});

function ViewAllButton(props) {
  const classes = styles({
    states: {},
    props
  });

  const arrows = useMemo(() => {
    let arrows = [];
    for (let i = 0; i < NUMBER_OF_ARROWS; ++i) {
      arrows[i] = { element: null, ref: null };
      arrows[i].element = <i id={`arrows-${i}`} ref={ref => arrows[i].ref = ref} key={`arrows-${i}`} className={"fas fa-chevron-left " + classes.openButtonIcon}></i>;
    }
    return arrows;
  }, [classes.openButtonIcon]);

  const animeTimeline = useRef(null);
  const animeButton = useRef(null);
  const buttonSmokeCanvas = useRef(null);
  const smokeImg = useRef(null);
  let isMouseLeave = false;

  const buttonHoverHandler = () => {
    isMouseLeave = false;
    if (animeTimeline.current == null) {
      animeTimeline.current = anime.timeline({
        easing: 'linear',
        loop: true,
        loopComplete: () => {
          if (isMouseLeave === true) {
            resetArrowColors();
          }
        }
      });
      for (let i = arrows.length - 1; i >= 0; --i) {
        animeTimeline.current.add({
          targets: `#arrows-${i}`,
          color: 'rgb(211,211,211)',
          duration: (arrows.length - i) * 100,
          delay: i === arrows.length - 1 ? 100 : 0,
          translateX: -5 * (arrows.length - i)
        });
      }
    } else {
      animeTimeline.current.finished.then(animeTimeline.current.restart());
    }

    if (animeButton.current == null) {
      const shakeMultiplier = 4;
      const keyframeTemplate = [
        {translateX: 1, translateY: 1, rotateZ: 0},
        {translateX: -1, translateY: -2, rotateZ: -1},
        {translateX: -3, translateY: 0, rotateZ: 1},
        {translateX: 3, translateY: 2, rotateZ: 0},
        {translateX: 1, translateY: -1, rotateZ: 1},
        {translateX: -1, translateY: 2, rotateZ: -1},
        {translateX: -3, translateY: 1, rotateZ: 0},
        {translateX: 3, translateY: 1, rotateZ: -1},
        {translateX: -1, translateY: -1, rotateZ: 1},
        {translateX: 1, translateY: 2, rotateZ: 0},
        {translateX: 1, translateY: -2, rotateZ: -1},
      ];
      animeButton.current = anime({
        targets: '#view-all-main-button',
        loop: true,
        keyframes: keyframeTemplate.map((item) => ({
          translateX: item.translateX * shakeMultiplier,
          translateY: item.translateY * shakeMultiplier,
          rotateZ: item.rotateZ * shakeMultiplier
        }))
      })
    } else {
      animeButton.current.finished.then(animeButton.current.restart());
    }
  };

  const buttonPointerLeaveHandler = () => {
    isMouseLeave = true;
    animeButton.current.pause();
    document.getElementById('view-all-main-button').style.transform = 'translate(0px, 0px) rotate(0deg)';
  };

  const resetArrowColors = () => {
    animeTimeline.current.pause();
    for (let i = 0; i < arrows.length; ++i) {
      arrows[i].ref.style.color = 'gray';
      arrows[i].ref.style.transform = 'translateX(0px)';
    }
  };

  return (
    <div className={classes.buttonRoot}>
      <img ref={smokeImg} src={require('../../assets/smoke1.png')} style={{display: 'none'}}></img>
      <canvas ref={buttonSmokeCanvas} className={classes.smokeCanvas} width={window.innerWidth} height={window.innerHeight}></canvas>
      <div className={classes.openButtonIconWrapper}>
        {arrows.map((item) => item.element)}
      </div>
      <Button id={'view-all-main-button'} width={250} height={60} borderRadius={10}
        onMouseEnter={buttonHoverHandler} onMouseLeave={buttonPointerLeaveHandler}>
        <div className={classes.openButtonText}>View my works</div>
      </Button>
      <FadingSmoke />
    </div>
  );
}

ViewAllButton.defaultProps = {
  arrowAnimationDuration: 0.1
};

export default ViewAllButton;
