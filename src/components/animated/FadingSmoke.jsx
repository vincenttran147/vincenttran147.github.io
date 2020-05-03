import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';

import Bounds from '../../helper/Bounds';
import Vector from '../../helper/Vector';

import FadingSmokeSprite from './FadingSmokeSprite';

const styles = createUseStyles({
  canvas: {
    top: -220,
    width: 500,
    height: 500,
    position: 'absolute'
  }
});

function FadingSmoke() {
  const canvas = useRef(null);

  const classes = styles();

  useEffect(() => {
    const fadingSmokeSprites = [];
    for (let i = 0; i < 10; ++i) {
      const x = Math.random() * 100 * 1;
      const y = Math.random() * 100 * 1;
      fadingSmokeSprites.push(new FadingSmokeSprite(canvas.current, require('../../assets/smoke1.png'),
        new Bounds(0, 200, 100, 100), new Vector(x, y, 1).normalize()));
    }
    const timeout = setTimeout(() => {
      fadingSmokeSprites.forEach((smoke) => {
        smoke.dispose();
      });
    }, 2000)

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  return (
    <div>
      <canvas className={classes.canvas} ref={canvas} width={500} height={500} />
    </div>
  );
}

export default FadingSmoke;
