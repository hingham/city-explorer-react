import React from 'react';
import PropTypes from 'prop-types';

const render = (condition = false, children = null)=>{
    return !!condition ? children : null;
  
  } 
  
  export const If = props =>{
      return (
    //React map takes the array as a parameter and allows you to name the thing in array
    React.Children.map( props.children, child =>
       React.cloneElement(child, {condition: props.condition})
    ))
  }
  
  export const When = props => render(props.condition, props, props.children); 
  export const Unless = props => render(!props.condition, props.children);
  
  export const Then = props => render(props.condition, props.children);
  export const Else = props => render(!props.condition, props.children);

  If.propTypes = {
      condition: PropTypes.bool.isRequired,
      children: PropTypes.oneOfType([PropTypes.instanceOf(Then).isRequired]),
  }