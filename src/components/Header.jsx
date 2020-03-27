import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import '@fortawesome/fontawesome-free/css/all.css';

import Button from './Button';


const styles = createUseStyles({
  headerRoot: {
    display: 'flex',
    backgroundColor: '#878787',
    height: window.innerHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  openButtonText: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 32
  },
  openButtonIconWrapper: (props) => ({
    marginLeft: 10,
    transition: 'transform 0.2s',
    transform: `rotate(${props.states.openButtonHover === true ? 90 : 0}deg)`
  }),
  openButtonIcon: {
    fontSize: 32
  }
});

function Header() {
  const [openButtonHover, setOpenButtonHover] = useState(false);

  const classes = styles({
    states: { openButtonHover }
  });

  const openButtonHoverCss = {
    backgroundColor: 'gray',
    color: 'white'
  };

  return (
    <div className={classes.headerRoot}>
      <Button width={300} height={60} borderRadius={10} onHover={openButtonHoverCss}
        onMouseOver={() => setOpenButtonHover(true)} onMouseLeave={() => setOpenButtonHover(false)}>
        <div className={classes.openButtonText}>View my works</div>
        <div className={classes.openButtonIconWrapper}>
          <i className={"fas fa-arrow-right " + classes.openButtonIcon}></i>
        </div>
      </Button>
    </div>
  );
}

export default Header;
