import { useContext, useEffect, useMemo } from 'react';
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { Input } from 'reactstrap';

/* ── styles inline pour spinner vertical Kg/G (isolés du SCSS global) ── */
const spinnerBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1.5px solid #e0e0e0',
  borderRadius: '8px',
  overflow: 'hidden',
  background: '#fff',
  width: '40px',
};
const spinBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px 0',
  width: '100%',
  fontSize: '13px',
  color: '#555',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const spinInput = {
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
const spinLabel = {
  fontSize: '10px',
  fontWeight: '700',
  color: '#aaa',
  textTransform: 'uppercase',
  letterSpacing: '0.4px',
  marginBottom: '3px',
};

/* ── spinner réutilisable ── */
const WeightSpinner = ({ label, value, onInc, onDec, onChange, max }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <span style={spinLabel}>{label}</span>
    <div style={spinnerBox}>
      <button type="button" style={spinBtn} onClick={onInc}
        onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}>
        <RiAddLine />
      </button>
      <input type="number" style={spinInput} value={value} min={0} max={max}
        onChange={onChange} />
      <button type="button" style={spinBtn} onClick={onDec}
        onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}>
        <RiSubtractLine />
      </button>
    </div>
  </div>
);

/* ── composant principal ── */
const VariationModalQty = ({ cloneVariation, setCloneVariation }) => {
  const { cartProducts } = useContext(CartContext);

  const checkStockAvailable = () => {
    if (cloneVariation?.selectedVariation) {
      setCloneVariation((prev) => {
        const tmp = { ...prev.selectedVariation };
        tmp.stock_status = tmp.quantity < prev.productQty ? 'out_of_stock' : 'in_stock';
        return { ...prev, selectedVariation: tmp };
      });
    } else {
      setCloneVariation((prev) => {
        const tmp = { ...prev.product };
        tmp.stock_status = tmp.quantity < prev.productQty ? 'out_of_stock' : 'in_stock';
        return { ...prev, product: tmp };
      });
    }
  };

  const updateQuantity = (qty) => {
    if (1 > cloneVariation?.productQty + qty) return;
    setCloneVariation((prev) => ({ ...prev, productQty: cloneVariation?.productQty + qty }));
    checkStockAvailable();
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      const found = cartProducts.find((e) => e.product_id === cloneVariation?.product?.id);
      setCloneVariation({ ...cloneVariation, productQty: found ? found.quantity : 1 });
    } else {
      setCloneVariation({ ...cloneVariation, productQty: 1 });
    }
  }, [cartProducts]);

  const showAddToCart = useMemo(() => {
    if (!cloneVariation?.product?.categories?.length) return true;
    return !cloneVariation?.product?.categories?.some(
      (cat) => cat?.is_add_to_cart_visible === false || cat?.is_add_to_cart_visible === 0
    );
  }, [cloneVariation?.product]);

  if (!showAddToCart) return null;

  /* ── by_gram logic ── */
  const isByGram = !!cloneVariation?.product?.by_gram;
  const productQty = cloneVariation?.productQty ?? 1;
  const totalGrams = Math.round(productQty * 100);
  const kg = Math.floor(totalGrams / 1000);
  const gram = totalGrams % 1000;

  const handleAbsoluteChange = (newKg, newGram) => {
    const newTotal = (parseInt(newKg) || 0) * 1000 + (parseInt(newGram) || 0);
    const newQty = Math.max(1, newTotal / 100);
    setCloneVariation((prev) => ({ ...prev, productQty: newQty }));
    checkStockAvailable();
  };

  if (isByGram) {
    return (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
        <WeightSpinner
          label="Kg"
          value={kg}
          onInc={() => updateQuantity(10)}
          onDec={() => updateQuantity(-10)}
          onChange={(e) => handleAbsoluteChange(e.target.value, gram)}
        />
        <WeightSpinner
          label="G"
          value={gram}
          onInc={() => updateQuantity(1)}
          onDec={() => updateQuantity(-1)}
          onChange={(e) => handleAbsoluteChange(kg, e.target.value)}
          max={999}
        />
      </div>
    );
  }

  return (
    <div className='qty-box cart_qty'>
      <div className='input-group'>
        <Btn type='button' className='btn qty-left-minus' onClick={() => updateQuantity(-1)}>
          <RiSubtractLine />
        </Btn>
        <Input className='form-control input-number qty-input' type='text' name='quantity'
          value={cloneVariation.productQty} readOnly />
        <Btn type='button' className='btn qty-right-plus' onClick={() => updateQuantity(1)}>
          <RiAddLine />
        </Btn>
      </div>
    </div>
  );
};

export default VariationModalQty;
