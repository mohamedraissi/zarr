import { RiShoppingCartLine, RiPhoneLine } from 'react-icons/ri';
import { useContext, useMemo } from 'react';
import Btn from '@/elements/buttons/Btn';
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/navigation';
import CartContext from '@/helper/cartContext';
import ThemeOptionContext from '@/helper/themeOptionsContext';

const AddToCartDigital = ({ productState }) => {
  const { cartCanvas, setCartCanvas, themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation('common');
  const { handleIncDec, isLoading } = useContext(CartContext);
  const router = useRouter();

  const addToCart = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    setCartCanvas(!cartCanvas)
  };

  const externalProductLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  }

  const showAddToCart = useMemo(() => {
    if (!productState?.product?.categories?.length) return true;
    return !productState?.product?.categories?.some(category => category?.is_add_to_cart_visible === false || category?.is_add_to_cart_visible === 0);
  }, [productState?.product]);

  if (!showAddToCart) return (
    <div className="d-flex align-items-center p-3 mt-2 rounded-3 border border-theme-color bg-light-theme">
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

  return (
    <div className='dynamic-checkout'>
      {!productState?.product?.is_external ? (
        <>
          {productState?.product?.type == 'simple' ? (
            <Btn
              className={`${productState?.product?.status === 0 || productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty
                ? 'border-theme-color btn btn-md scroll-button'
                : 'bg-theme btn-md scroll-button'
                }`}
              onClick={addToCart}
              disabled={productState?.product?.status === 0 || productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty}
              loading={Number(isLoading)}>
              {productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty ? null : <RiShoppingCartLine className='me-2' />}
              {productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty ? t('sold_out') : t('add_to_cart')}
            </Btn>
          ) : (
            <Btn
              className={`${productState?.selectedVariation
                ? productState?.product?.status === 0 || productState?.product?.variations.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.selectedVariation?.quantity < productState?.productQty
                  ? 'border-theme-color btn btn-md scroll-button'
                  : 'bg-theme btn-md scroll-button'
                : 'bg-theme btn-md scroll-button'
                }`}
              disabled={productState?.selectedVariation ? productState?.product?.status === 0 || productState?.product?.variations.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.selectedVariation?.quantity < productState?.productQty : true}
              onClick={addToCart}
              loading={Number(isLoading)}>
              {productState?.product?.status === 0 || productState?.product?.variations?.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.selectedVariation?.quantity < productState?.productQty ? null : <RiShoppingCartLine className='me-2' />}
              {productState?.selectedVariation
                ? productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.selectedVariation?.quantity < productState?.productQty
                  ? t('sold_out')
                  : t('add_to_cart')
                : t('add_to_cart')}
            </Btn>
          )}
        </>) : <Btn
          className='btn btn-md bg-theme scroll-button'
          onClick={externalProductLink(productState.product.external_url)}
          loading={Number(isLoading)}>
        {productState?.product?.external_button_text ? productState?.product?.external_button_text : t('buy_now')}
      </Btn>}
    </div>
  );
};

export default AddToCartDigital;