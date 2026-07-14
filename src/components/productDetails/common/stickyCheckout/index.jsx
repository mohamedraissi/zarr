import React from 'react';
import ShowProduct from './ShowProduct';

const StickyCheckout = ({ productState, setProductState }) => {
  return <ShowProduct productState={productState} setProductState={setProductState} />;
};

export default StickyCheckout;
