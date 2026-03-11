import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import { useTranslation } from "react-i18next";
import { useContext, useMemo } from 'react';
import { RiShoppingCartLine, RiPhoneLine } from 'react-icons/ri';
import ThemeOptionContext from '@/helper/themeOptionsContext';

const VariationAddToCart = ({ cloneVariation, setVariationModal }) => {
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const { t } = useTranslation('common');
  const { handleIncDec, isLoading } = useContext(CartContext);
  const productInStock = cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.stock_status == 'in_stock' : cloneVariation?.product?.stock_status == 'in_stock';

  const { themeOption } = useContext(ThemeOptionContext);

  const showAddToCart = useMemo(() => {
    if (!cloneVariation?.product?.categories?.length) return true;
    return !cloneVariation?.product?.categories?.some(category => category?.is_add_to_cart_visible === false || category?.is_add_to_cart_visible === 0);
  }, [cloneVariation?.product]);

  if (!showAddToCart) return (
    <div className="d-flex align-items-center justify-content-center p-3 mt-2 rounded-3 border border-theme-color bg-light-theme">
      <a href={`tel:${themeOption?.footer?.support_number}`} className="d-flex align-items-center gap-3 text-decoration-none">
        <div className="d-flex align-items-center justify-content-center rounded-circle theme-bg-color text-white" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
          <RiPhoneLine className="fs-5" />
        </div>
        <div>
          <h6 className="text-content mb-0 text-uppercase fw-bold" style={{ fontSize: '12px' }}>{t('order_with_number')}</h6>
          <h4 className="theme-color fw-bold mb-0">{themeOption?.footer?.support_number}</h4>
        </div>
      </a>
    </div>
  );

  const addToCart = (allProduct) => {
    if (cloneVariation?.selectedVariation) {
      handleIncDec(cloneVariation.productQty, allProduct, false, false, false, cloneVariation);
      setVariationModal(false);
    } else {
      handleIncDec(cloneVariation.productQty, allProduct, false, false, false);
      setVariationModal(false);
    }
    setCartCanvas(!cartCanvas)
  };
  return (
    <div className='addtocart_btn'>
      <Btn
        className='btn btn-md fw-bold icon text-white theme-bg-color view-button text-uppercase'
        disabled={(cloneVariation?.selectedVariation && cloneVariation?.selectedVariation?.stock_status !== 'in_stock') || (cloneVariation?.product?.stock_status !== 'in_stock' && true)}
        onClick={() => addToCart(cloneVariation.product)}
        loading={Number(isLoading)}>
        <RiShoppingCartLine />
        <span>{productInStock ? t('add_to_cart') : t('sold_out')}</span>
      </Btn>
    </div>
  );
};
export default VariationAddToCart;
