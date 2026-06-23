import { useContext } from 'react';
import HandleQuantity from './HandleQuantity';
import CartContext from '@/helper/cartContext';
import CartProductDetail from './CartProductDetail';
import { useTranslation } from "react-i18next";
import SettingContext from '@/helper/settingContext';
import useCreate from '@/utils/hooks/useCreate';
import { AddToCartAPI, WishlistAPI } from '@/utils/axiosUtils/API';
import { ToastNotification } from '@/utils/customFunctions/ToastNotification';
import Cookies from 'js-cookie';
import useDelete from '@/utils/hooks/useDelete';
import Link from 'next/link';
import Avatar from '../common/Avatar';
import { placeHolderImage } from '../../data/CommonPath';
import { RiHeartLine, RiDeleteBinLine } from 'react-icons/ri';

/* ─── styles inline isolés ──────────────────────────────────────────── */
const card = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  background: '#fff',
  borderRadius: '16px',
  padding: '14px 16px',
  marginBottom: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  border: '1px solid #f0f0f0',
  flexWrap: 'wrap',
};

const imgWrap = {
  width: '80px',
  height: '80px',
  borderRadius: '12px',
  overflow: 'hidden',
  flexShrink: 0,
  background: '#f7f7f7',
};

const infoBlock = {
  flex: '1 1 160px',
  minWidth: 0,
};

const productName = {
  fontWeight: '700',
  fontSize: '14px',
  color: '#1a1a1a',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block',
  textDecoration: 'none',
  marginBottom: '3px',
};

const metaText = {
  fontSize: '12px',
  color: '#999',
  marginBottom: '4px',
};

const salePrice = {
  fontWeight: '700',
  fontSize: '15px',
  color: 'var(--theme-color, #0d6efd)',
};

const oldPrice = {
  fontSize: '12px',
  color: '#bbb',
  textDecoration: 'line-through',
  marginLeft: '6px',
};

const savingBadge = {
  display: 'inline-block',
  background: '#e8f5e9',
  color: '#2e7d32',
  borderRadius: '6px',
  padding: '2px 7px',
  fontSize: '11px',
  fontWeight: '600',
  marginLeft: '6px',
};

const qtyBlock = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
};

const qtyLabel = {
  fontSize: '10px',
  fontWeight: '600',
  color: '#aaa',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const totalBlock = {
  flexShrink: 0,
  textAlign: 'right',
  minWidth: '70px',
};

const totalLabel = {
  fontSize: '10px',
  color: '#bbb',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '3px',
};

const totalAmount = {
  fontWeight: '800',
  fontSize: '16px',
  color: '#1a1a1a',
};

const actionsBlock = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'center',
  flexShrink: 0,
};

const actionBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '8px',
  padding: '7px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s',
  fontSize: '17px',
};

/* ─────────────────────────────────────────────────────────────────── */

const CartData = ({ elem }) => {
  const { t } = useTranslation('common');
  const { cartProducts, setCartProducts, removeCart } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const { mutate } = useCreate(WishlistAPI, false);
  const isCookie = Cookies.get('uaf');
  const { mutate: deleteCart } = useDelete(AddToCartAPI, false, true);

  const saveForLater = (product_id, id) => {
    const updatedCart = cartProducts?.filter((item) => item.product_id !== id);
    setCartProducts(updatedCart);
    if (isCookie && id) deleteCart(id);
  };

  const hasDiscount =
    ((elem?.variation?.price ?? elem?.product?.price) -
      (elem?.variation?.sale_price ?? elem?.product?.sale_price)) > 0;

  return (
    <div style={card}>

      {/* Image */}
      <Link href={`/product/${elem?.product?.slug}`} style={imgWrap}>
        <Avatar
          customImageClass="img-fluid h-100 w-100 object-fit-cover"
          data={elem?.variation?.variation_image ?? elem?.product?.product_thumbnail}
          placeHolder={placeHolderImage}
          name={elem?.product?.name}
        />
      </Link>

      {/* Info */}
      <div style={infoBlock}>
        <Link href={`/product/${elem?.product?.slug}`} style={productName}>
          {elem?.variation?.name ?? elem?.product?.name}
        </Link>

        {elem?.product?.store?.store_name && (
          <div style={metaText}>
            {t('sold_by')}: <strong style={{ color: '#555' }}>{elem?.product?.store?.store_name}</strong>
          </div>
        )}

        {/* Prix */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2px' }}>
          <span style={salePrice}>{convertCurrency(elem?.product?.sale_price)}</span>
          {(elem?.variation?.price ?? elem?.product?.price) > elem?.product?.sale_price && (
            <del style={oldPrice}>{convertCurrency(elem?.variation?.price ?? elem?.product?.price)}</del>
          )}
          {hasDiscount && (
            <span style={savingBadge}>
              -{convertCurrency(
                Number((elem?.variation?.price ?? elem?.product?.price) -
                  (elem?.variation?.sale_price ?? elem?.product?.sale_price))
              )}
            </span>
          )}
        </div>
      </div>

      {/* Quantity */}
      <div style={qtyBlock}>
        <span style={qtyLabel}>{t('quantity')}</span>
        <HandleQuantity
          productObj={elem?.product}
          classes={{ customClass: 'quantity-price' }}
          elem={elem}
        />
      </div>

      {/* Total */}
      <div style={totalBlock}>
        <div style={totalLabel}>{t('total')}</div>
        <div style={totalAmount}>{convertCurrency(elem?.sub_total)}</div>
      </div>

      {/* Actions */}
      <div style={actionsBlock}>
        <button
          style={{ ...actionBtn, color: '#e53935' }}
          title={t('remove')}
          onClick={() => removeCart(elem.product_id, elem?.id)}
          onMouseEnter={e => e.currentTarget.style.background = '#ffeaea'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <RiDeleteBinLine />
        </button>
        <button
          style={{ ...actionBtn, color: '#1976d2' }}
          title={t('save_for_later')}
          onClick={() => saveForLater(elem.product_id, elem?.id)}
          onMouseEnter={e => e.currentTarget.style.background = '#e3f2fd'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <RiHeartLine />
        </button>
      </div>

    </div>
  );
};

export default CartData;
