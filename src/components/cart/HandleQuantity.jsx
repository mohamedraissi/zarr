import React, { useContext, useEffect, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

/* ------------------------------------------------------------------ */
/*  Styles inline pour les champs Kg / G  (évite les conflits SCSS)    */
/* ------------------------------------------------------------------ */
const weightFieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
};

const weightLabelStyle = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const weightControlStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1.5px solid #e0e0e0',
  borderRadius: '10px',
  overflow: 'hidden',
  background: '#fff',
  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
  width: '40px',
};

const weightBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '5px 0',
  width: '100%',
  fontSize: '13px',
  color: '#555',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s',
};

const weightInputStyle = {
  width: '100%',
  textAlign: 'center',
  border: 'none',
  borderTop: '1px solid #eee',
  borderBottom: '1px solid #eee',
  outline: 'none',
  fontSize: '13px',
  fontWeight: '700',
  color: '#222',
  background: 'transparent',
  padding: '4px 0',
  MozAppearance: 'textfield',
};

const CartWeightInputs = ({ productObj, elem, productQty, setProductQty }) => {
  const { handleIncDec } = useContext(CartContext);
  const totalGrams = Math.round(productQty * 100);
  const kg = Math.floor(totalGrams / 1000);
  const gram = totalGrams % 1000;

  const handleWeightChange = (qtyDelta) => {
    handleIncDec(qtyDelta, productObj, productQty, setProductQty, false, elem?.id);
  };

  const handleAbsoluteChange = (newKg, newGram) => {
    const newTotalGrams = (parseInt(newKg) || 0) * 1000 + (parseInt(newGram) || 0);
    const newQty = newTotalGrams / 100;
    const delta = newQty - productQty;
    if (delta !== 0) {
      handleIncDec(delta, productObj, productQty, setProductQty, false, elem?.id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>

      {/* ---- Champ Kg ---- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        <div style={weightControlStyle}>
          {/* + en haut */}
          <button
            type="button"
            style={weightBtnStyle}
            onClick={() => handleWeightChange(10)}
            onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <RiAddLine />
          </button>

          {/* valeur au milieu */}
          <input
            type="number"
            style={weightInputStyle}
            value={kg}
            min={0}
            onChange={(e) => handleAbsoluteChange(e.target.value, gram)}
          />
          {/* - en bas */}
          <button
            type="button"
            style={weightBtnStyle}
            onClick={() => handleWeightChange(-10)}
            onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <RiSubtractLine />
          </button>

        </div>
        <span style={{ ...weightLabelStyle, minWidth: '18px' }}>Kg</span>
      </div>

      {/* ---- Champ G ---- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        <div style={weightControlStyle}>
          {/* + en haut */}
          <button
            type="button"
            style={weightBtnStyle}
            onClick={() => handleWeightChange(1)}
            onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <RiAddLine />
          </button>
          {/* valeur au milieu */}
          <input
            type="number"
            style={weightInputStyle}
            value={gram}
            min={0}
            max={999}
            onChange={(e) => handleAbsoluteChange(kg, e.target.value)}
          />
          {/* - en bas */}
          <button
            type="button"
            style={weightBtnStyle}
            onClick={() => handleWeightChange(-1)}
            onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <RiSubtractLine />
          </button>

        </div>
        <span style={{ ...weightLabelStyle, minWidth: '18px' }}>G</span>
      </div>

    </div>
  );
};

const HandleQuantity = ({ classes = {}, productObj, elem, customIcon }) => {
  const { cartProducts, handleIncDec } = useContext(CartContext);
  const [productQty, setProductQty] = useState(0);
  useEffect(() => {
    if (cartProducts.length > 0) {
      const foundProduct = cartProducts.find((el) => el.product_id === elem?.product_id);
      if (foundProduct) {
        setProductQty(foundProduct.quantity); // Use the quantity from the found product directly
      } else {
        setProductQty(0);
      }
    } else {
      setProductQty(0);
    }
  }, [cartProducts]);

  if (productObj?.by_gram) {
    return (
      <div className='cart_qty'>
        <CartWeightInputs productObj={productObj} elem={elem} productQty={productQty} setProductQty={setProductQty} />
      </div>
    )
  }

  return (
    <div className='cart_qty'>
      <InputGroup>
        <Btn type='button' className='btn qty-left-minus' onClick={() => handleIncDec(-1, productObj, productQty, setProductQty, false, elem?.id)}>
          {customIcon && customIcon && productQty <= 1 ? customIcon : <RiSubtractLine />}
        </Btn>
        <Input className=' input-number qty-input' type='text' name='quantity' value={productQty} readOnly />
        <Btn type='button' className='btn qty-right-plus' onClick={() => handleIncDec(1, productObj, productQty, setProductQty, false, elem?.id)}>
          <RiAddLine />
        </Btn>
      </InputGroup>
    </div>
  );
};

export default HandleQuantity;
