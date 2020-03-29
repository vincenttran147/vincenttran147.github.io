import React, { useMemo, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import '@fortawesome/fontawesome-free/css/all.css';
import anime from 'animejs';

import Button from './Button';


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
          color: 'rgb(255, 255, 255)',
          duration: (arrows.length - i) * 150,
          delay: i === arrows.length - 1 ? 200 : 0
        });
      }
    } else {
      animeTimeline.current.finished.then(animeTimeline.current.restart());
    }
  };

  const buttonPointerLeaveHandler = () => {
    isMouseLeave = true;
  };

  const resetArrowColors = () => {
    animeTimeline.current.pause();
    for (let i = 0; i < arrows.length; ++i) {
      arrows[i].ref.style.color = 'gray';
    }
  };

  return (
    <div className={classes.buttonRoot}>
      <div className={classes.openButtonIconWrapper}>
        {arrows.map((item) => item.element)}
      </div>
      <Button width={250} height={60} borderRadius={10}
        onMouseEnter={buttonHoverHandler} onMouseLeave={buttonPointerLeaveHandler}>
        <div className={classes.openButtonText}>View my works</div>
      </Button>
    </div>
  );
}

ViewAllButton.defaultProps = {
  arrowAnimationDuration: 0.1
};

export default ViewAllButton;
