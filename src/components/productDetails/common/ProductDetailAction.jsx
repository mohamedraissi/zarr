import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Input, InputGroup } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import AddToWishlist from '@/components/common/productBox/AddToWishlist';
import AddToCompare from '@/components/common/productBox/AddToCompare';
import AddToCartButton from './AddToCartButton';
import SettingContext from '@/helper/settingContext';
import ProductWholesale from './ProductWholesale';
import ThemeOptionContext from '@/helper/themeOptionsContext';

const ProductWeightInputs = ({ productState, setProductState, checkStockAvailable }) => {
  const totalGrams = useMemo(() => Math.round(productState?.productQty * 100), [productState?.productQty]);
  const kg = useMemo(() => Math.floor(totalGrams / 1000), [totalGrams]);
  const gram = useMemo(() => totalGrams % 1000, [totalGrams]);

  const handleWeightChange = (newKg, newGram) => {
    let k = parseInt(newKg);
    let g = parseInt(newGram);

    // Handle gram overflow/underflow
    if (g >= 1000) {
      k += Math.floor(g / 1000);
      g = g % 1000;
    } else if (g < 0) {
      const subtractKg = Math.ceil(Math.abs(g) / 1000);
      k -= subtractKg;
      g = 1000 - (Math.abs(g) % 1000);
      if (g === 1000) g = 0;
    }

    if (k < 0) {
      k = 0;
      g = Math.max(0, g);
    }

    const totalGrams = k * 1000 + g;
    const newQty = totalGrams / 100;
    setProductState((prev) => ({ ...prev, productQty: newQty }));
    checkStockAvailable();
  };

  return (
    <div className="d-flex align-items-center gap-2 weight-input-wrapper " style={{ flexWrap: 'wrap' }}>
      <div className='d-flex align-items-center gap-1'>
        <div className='qty-box product-qty' style={{ maxWidth: '120px', marginTop: 0 }}>
          <InputGroup>
            <Btn type='button' className='qty-right-plus' onClick={() => handleWeightChange(kg - 1, gram)}>
              <RiSubtractLine />
            </Btn>
            <Input
              className='input-number qty-input'
              type='number'
              value={kg}
              min={0}
              onChange={(e) => handleWeightChange(e.target.value, gram)}
            />
            <Btn type='button' className='qty-left-minus' onClick={() => handleWeightChange(kg + 1, gram)}>
              <RiAddLine />
            </Btn>
          </InputGroup>
        </div>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Kg</span>
      </div>

      <div className='d-flex align-items-center gap-1'>
        <div className='qty-box product-qty' style={{ maxWidth: '120px', marginTop: 0 }}>
          <InputGroup>
            <Btn type='button' className='qty-right-plus' onClick={() => handleWeightChange(kg, gram - 100)}>
              <RiSubtractLine />
            </Btn>
            <Input
              className='input-number qty-input'
              type='number'
              value={gram}
              min={0}
              max={999}
              step={100}
              onChange={(e) => handleWeightChange(kg, e.target.value)}
            />
            <Btn type='button' className='qty-left-minus' onClick={() => handleWeightChange(kg, gram + 100)}>
              <RiAddLine />
            </Btn>
          </InputGroup>
        </div>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>G</span>
      </div>
    </div>
  );
};

const ProductDetailAction = ({ productState, setProductState, extraOption, isDisplay = true }) => {
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const { handleIncDec, isLoading } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const router = useRouter();
  const addToCart = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    setCartCanvas(!cartCanvas)
  };

  const showAddToCart = useMemo(() => {
    if (!productState?.product?.categories?.length) return true;
    return !productState?.product?.categories?.some(category => category?.is_add_to_cart_visible === false || category?.is_add_to_cart_visible === 0);
  }, [productState?.product]);

  const buyNow = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    router.push(`/checkout`);
  };
  const updateQty = (qty) => {
    if (1 > productState?.productQty + qty) return;
    setProductState((prev) => {
      return { ...prev, productQty: productState?.productQty + qty };
    });
    checkStockAvailable();
    wholesalePriceCal();
  };
  const checkStockAvailable = () => {
    if (productState?.selectedVariation) {
      setProductState((prevState) => {
        const tempSelectedVariation = { ...prevState.selectedVariation };
        tempSelectedVariation.stock_status = tempSelectedVariation.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          selectedVariation: tempSelectedVariation,
        };
      });
    } else {
      setProductState((prevState) => {
        const tempProduct = { ...prevState.product };
        tempProduct.stock_status = tempProduct.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          product: tempProduct,
        };
      });
    }
  };

  const wholesalePriceCal = () => {
    let wholesale = productState?.product?.wholesales?.find(value => value?.min_qty <= productState?.productQty && value?.max_qty >= productState?.productQty) || null

    if (wholesale && productState?.product.wholesale_price_type == 'fixed') {
      setProductState(prev => { return { ...prev, totalPrice: prev?.productQty * wholesale.value } })
    } else if (wholesale && productState?.product.wholesale_price_type == 'percentage') {
      setProductState(prev => {
        const basePrice = prev?.selectedVariation ? prev?.selectedVariation.sale_price : prev?.product.sale_price;
        const total = prev?.productQty * basePrice;
        return { ...prev, totalPrice: total - (total * (wholesale.value / 100)) }
      })
    } else {
      setProductState(prev => { return { ...prev, totalPrice: prev?.productQty * (prev?.selectedVariation ? prev?.selectedVariation.sale_price : prev?.product.sale_price) } })
    }
  }

  useEffect(() => {
    wholesalePriceCal();
  }, [productState?.productQty, productState?.selectedVariation, productState?.product])

  return (
    <>
      {productState?.product?.wholesales?.length ? (
        <ProductWholesale productState={productState} />
      ) : null}

      {!productState?.product.external_url && isDisplay &&
        <div className='note-box product-package'>
          {showAddToCart && (
            productState?.product?.by_gram ? (
              <ProductWeightInputs productState={productState} setProductState={setProductState} checkStockAvailable={checkStockAvailable} />
            ) : (
              <div className='cart_qty qty-box product-qty'>
                <InputGroup>
                  <Btn type='button' className='qty-right-plus' onClick={() => updateQty(-1)}>
                    <RiSubtractLine />
                  </Btn>
                  <Input className='input-number qty-input' type='number' value={productState?.productQty} readOnly />
                  <Btn type='button' className='qty-left-minus' onClick={() => updateQty(1)}>
                    <RiAddLine />
                  </Btn>
                </InputGroup>
              </div>
            )
          )}



          {extraOption !== false ? (
            <div className='wishlist-btn-group d-flex align-items-center gap-2'>
              <AddToWishlist productObj={productState?.product} customClass={'wishlist-button btn'} />
              <AddToCompare productObj={productState?.product} customClass={'wishlist-button btn'} />
            </div>
          ) : null}
        </div>
      }
      <AddToCartButton productState={productState} isLoading={isLoading} addToCart={addToCart} buyNow={buyNow} extraOption={extraOption} />
    </>
  );
};

export default ProductDetailAction;
