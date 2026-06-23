import Link from 'next/link';
import { placeHolderImage } from '../../data/CommonPath';
import HandleQuantity from './HandleQuantity';
import Avatar from '../common/Avatar';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import SettingContext from '@/helper/settingContext';

const CartProductDetail = ({ elem }) => {
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  return (
    <td className='product-detail'>
      <div className='product border-0 d-flex align-items-center gap-3'>
        <Link href={`/product/${elem?.product?.slug}`} className='product-image' style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Avatar customImageClass={'img-fluid h-100 w-100 object-fit-cover'} data={elem?.variation?.variation_image ?? elem?.product?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.product?.name} />
        </Link>
        <div className='product-detail'>
          <div className="mb-1">
            <Link href={`/product/${elem?.product?.slug}`} className='name h6 fw-bold text-dark' style={{ fontSize: '16px', lineHeight: '1.4' }}>{elem?.variation?.name ?? elem?.product?.name}</Link>
          </div>
          
          <div className='text-muted small mb-1' style={{ fontSize: '13px' }}>
            {elem?.product?.store?.store_name && (
              <span className='me-2'>{t('sold_by')}: <span className="text-dark fw-medium">{elem?.product?.store?.store_name}</span></span>
            )}
            { (elem?.variation?.unit ?? elem?.product?.unit) && (
               <span>{t('unit')}: <span className="text-dark fw-medium">{elem?.variation?.unit ?? elem?.product?.unit}</span></span>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 mt-2">
            <span className="fw-bold theme-color" style={{ fontSize: '15px' }}>{convertCurrency(elem?.product?.sale_price)}</span>
            { (elem?.variation?.price ?? elem?.product?.price) > elem?.product?.sale_price && (
               <del className='text-muted small'>{convertCurrency(elem?.variation?.price ?? elem?.product?.price)}</del>
            )}
          </div>

          {((elem?.variation?.price ?? elem?.product?.price) - (elem?.variation?.sale_price ?? elem?.product?.sale_price)) > 0 && (
            <div className='badge bg-success-subtle text-success border border-success-subtle mt-2' style={{ fontSize: '11px', padding: '4px 8px' }}>
              {t('saving')} : {convertCurrency(Number((elem?.variation?.price ?? elem?.product?.price) - (elem?.variation?.sale_price ?? elem?.product?.sale_price)))}
            </div>
          )}
        </div>
      </div>
    </td>
  );
};

export default CartProductDetail;
