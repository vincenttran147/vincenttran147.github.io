import React from 'react';
import {createUseStyles} from 'react-jss';


const styles = createUseStyles({
  buttonRoot: (props) => ({
    ...props.props.style,
    display: 'flex',
    backgroundColor: props.props.backgroundColor,
    width: props.props.width,
    height: props.props.height,
    borderRadius: props.props.borderRadius,
    justifyContent: 'center',
    alignItems: props.props.alignment,
    transition: props.props.transition,
    cursor: 'pointer',
    '&:hover': {
      ...props.props.onHover
    }
  })
});

function Button(props) {
  const classes = styles({props});

  return (
    <div className={classes.buttonRoot} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
      {props.children}
    </div>
  );
}

Button.defaultProps = {
  width: 50,
  height: 30,
  borderRadius: 0,
  alignment: 'center',
  backgroundColor: 'lightgray',
  transition: '0.2s'
}

export default Button;
