import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SettingContext from '@/helper/settingContext';
import { useTranslation } from "react-i18next";
import { placeHolderImage } from '../../../../data/CommonPath';


const VerticalProductBox = ({ product }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    return (
        <div className='offer-product'>
            <Link href={`/product/${product?.slug}`} className='offer-image'>
                {<Image className="img-fluid" src={product.product_thumbnail ? product.product_thumbnail.original_url : placeHolderImage} height={80} width={80} alt="product" />}
            </Link>
            <div className='offer-detail'>
                <div>
                    <Link href={`/product/${product?.slug}`} className='text-title'>
                        <h6 className='name'>{product?.name}</h6>
                    </Link>
                    <span>1Kg</span>
                    <div className='vertical-price'>
                        <h6 className='price theme-color'>{product?.by_gram == 1 ? `${convertCurrency(product?.sale_price * 10)}` : convertCurrency(product?.sale_price)}</h6>
                        {
                            product?.discount || product?.discount ? (
                                <del>{product?.by_gram == 1 ? `${convertCurrency(product?.price * 10)}` : convertCurrency(product?.price)}</del>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerticalProductBox;
