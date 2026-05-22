import React, { useContext, useEffect, useState } from 'react';
import { Card, Col } from 'reactstrap';
import SettingContext from '../../../helper/settingContext';
import { useTranslation } from "react-i18next";
import SidebarProduct from './SidebarProduct';
import useCreate from '@/utils/hooks/useCreate';
import { CheckoutAPI } from '@/utils/axiosUtils/API';
import CartContext from '@/helper/cartContext';
import Loader from '@/layout/loader';
import PointWallet from './PointWallet';
import ApplyCoupon from './ApplyCoupon';
import PlaceOrder from './PlaceOrder';
import Cookies from 'js-cookie';
import NoDataFound from '@/components/common/NoDataFound';
import emptyImage from '../../../../public/assets/svg/empty-items.svg';

const CheckoutSidebar = ({ values, setFieldValue, errors, addToCartData }) => {
  const [storeCoupon, setStoreCoupon] = useState("");
  const { convertCurrency } = useContext(SettingContext);
  const { cartProducts, cartTotal } = useContext(CartContext);
  const { t } = useTranslation('common');
  const [errorCoupon, setErrorCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { settingData } = useContext(SettingContext);
  const access_token = Cookies.get('uaf');

  const { data, mutate, isLoading } = useCreate(CheckoutAPI, false, false, true, (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      setErrorCoupon('');
      storeCoupon !== '' && setAppliedCoupon('applied');
    } else {
      setErrorCoupon(resDta?.response?.data?.message);
    }
  }, false);
  // Submitting data on Checkout
  useEffect(() => {
    if (settingData?.activation?.guest_checkout && !access_token) {
      if (values['products']?.length > 0) {
        mutate(values);
      }
    } else {
      if (access_token && values['billing_address_id'] && values['shipping_address_id']) {
        const targetObject = {
          coupon: values['coupon'],
          billing_address_id: values['billing_address_id'],
          shipping_address_id: values['shipping_address_id'],
          delivery_description: values['delivery_description'],
          delivery_interval: values['delivery_interval'],
          points_amount: values['points_amount'],
          payment_method: values['payment_method'],
          products: values['products'] = cartProducts,
          wallet_balance: values['wallet_balance']
        };
        values['products']?.length > 0 && mutate(targetObject);
        if (isLoading) {
          setStoreCoupon('');
        }
      }
      if (addToCartData?.is_digital_only && values['billing_address_id'] && values['payment_method']) {
        const targetObject1 = {
          coupon: values['coupon'],
          billing_address_id: values['billing_address_id'],
          points_amount: values['points_amount'],
          payment_method: values['payment_method'],
          products: values['products'] = cartProducts,
          wallet_balance: values['wallet_balance']
        };
        values['products']?.length > 0 && mutate(targetObject1)
        if (isLoading) {
          setStoreCoupon('');
        }
      }
    }
  }, [values['billing_address_id'], values['shipping_address_id'], values['payment_method'], values['delivery_description'], values['points_amount'], values['wallet_balance'], cartProducts, access_token, settingData]);

  return (
    <Col xxl='4' xl='5'>
      <Card className='pos-detail-card'>
        {cartProducts.length ? (
          <>
            <SidebarProduct values={values} setFieldValue={setFieldValue} />
            <div className='pos-loader'>
              <ul className={`summary-total position-relative`}>
                {isLoading && <Loader />}
                <li>
                  <h4>{t('subtotal')}</h4>
                  <h4 className='price'>{data?.data?.total?.sub_total ? convertCurrency(data?.data?.total?.sub_total) : convertCurrency(cartTotal)}</h4>
                </li>
                <li>
                  <h4>{t('shipping')}</h4>
                  <h4 className='price'>{data?.data?.total?.shipping_total >= 0 ? convertCurrency(data?.data?.total?.shipping_total) : convertCurrency(0)}</h4>
                </li>
                <li>
                  <h4>{t('tax')}</h4>
                  <h4 className='price'>{data?.data?.total?.tax_total >= 0 ? convertCurrency(data?.data?.total?.tax_total) : convertCurrency(0)}</h4>
                </li>

                <PointWallet values={values} setFieldValue={setFieldValue} data={data} />

                <ApplyCoupon values={values} setFieldValue={setFieldValue} data={data} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon} errorCoupon={errorCoupon} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} mutate={mutate} isLoading={isLoading} />

                <li className='list-total'>
                  <h4>{t('total')}</h4>
                  <h4 className='price'>{data?.data?.total?.total ? convertCurrency(data?.data?.total?.total) : convertCurrency(cartTotal)}</h4>
                </li>
              </ul>
            </div>
            <PlaceOrder addToCartData={addToCartData} values={values} errors={errors} />
          </>
        ) :
          <NoDataFound
            data={{
              customClass: 'no-data-added',
              imageUrl: emptyImage,
              title: 'no_items_cart',
              height: 500,
              width: 500,
            }}
          />
        }

      </Card>
    </Col>
  );
};

export default CheckoutSidebar;
