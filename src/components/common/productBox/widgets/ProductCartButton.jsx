import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import VariationModal from '../productBox1/variationModal';
import { RiAddLine } from 'react-icons/ri';
import ThemeOptionContext from '@/helper/themeOptionsContext';

/* ── composant principal ── */
const ProductCartButton = ({ productObj, text, iconClass }) => {
  const { cartProducts, handleIncDec, removeCart } = useContext(CartContext);
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const [variationModal, setVariationModal] = useState('');
  const { t } = useTranslation('common');
  const [productQty, setProductQty] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      const found = cartProducts.find((elem) => elem?.product_id === productObj?.id);
      if (found) {
        setIsOpen(true);
        setProductQty(found.quantity);
      } else {
        setProductQty(0);
        setIsOpen(false);
      }
    } else {
      setProductQty(0);
      setIsOpen(false);
    }
  }, [cartProducts]);

  const externalProductLink = (link) => {
    if (link) window.open(link, '_blank');
  };

  const showAddToCart = useMemo(() => {
    if (!productObj?.categories?.length) return true;
    return !productObj?.categories?.some(
      (cat) => cat?.is_add_to_cart_visible === false || cat?.is_add_to_cart_visible === 0
    );
  }, [productObj]);

  if (!showAddToCart) return null;

  const handleCancel = () => {
    removeCart(productObj?.id);
    setProductQty(0);
    setIsOpen(false);
  };

  return (
    <>
      {productObj?.stock_status === 'in_stock' ? (
        productQty > 0 ? (
          <Btn
            className="btn btn-add-cart addcart-button"
            onClick={handleCancel}
          >
            Annuler
          </Btn>
        ) : (
          <Btn
            id={`add-to-cart'+${productObj.id}`}
            className="btn btn-add-cart addcart-button"
            disabled={false}
            onClick={() => {
              productObj.external_url
                ? window.open(productObj.external_url, '_blank')
                : productObj?.type === 'classified'
                ? setVariationModal(productObj?.id)
                : handleIncDec(1, productObj, productQty, setProductQty, setIsOpen);
              productObj?.type === 'classified'
                ? setVariationModal(productObj?.id)
                : setCartCanvas(!cartCanvas);
            }}
          >
            {iconClass ? <RiAddLine /> : t('add')}
          </Btn>
        )
      ) : (
        <Btn
          id={`out-of-stock'+${productObj.id}`}
          className="btn btn-add-cart addcart-button"
          disabled
        >
          {iconClass ? <RiAddLine /> : t('sold_out')}
        </Btn>
      )}

      <VariationModal setVariationModal={setVariationModal}
        variationModal={variationModal} productObj={productObj} />

      {productObj?.is_external && (
        <Btn id="'add-to-cart'+product.id" className="btn btn-add-cart addcart-button"
          onClick={() => externalProductLink(productObj.external_url)}>
          {productObj.external_button_text || 'buy_now'}
        </Btn>
      )}
    </>
  );
};

export default ProductCartButton;