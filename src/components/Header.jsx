import React from 'react';
import { createUseStyles } from 'react-jss';

import ViewAllButton from './buttons/ViewAllButton';


const styles = createUseStyles({
  headerRoot: {
    display: 'flex',
    backgroundColor: '#878787',
    height: window.innerHeight,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function Header() {
  const classes = styles();

  return (
    <div className={classes.headerRoot}>
      <ViewAllButton />
    </div>
  );
}

export default Header;
