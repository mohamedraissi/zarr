import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RatioImage from '@/utils/RatioImage';
import ProductIdsContext from '@/helper/productIdsContext';
import LiveImagePath from '@/utils/constants';


const OfferBanner = ({ classes = {}, imgUrl, ratioImage, customRatioClass = '', elem }) => {
  
  const { filteredProduct } = useContext(ProductIdsContext);
  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return 'product/' + product?.slug;
  };
  return (
    <div className={`${classes?.customClass ? classes?.customClass : ''}`}>
      {elem?.redirect_link?.link_type === 'external_url' ? (
        <Link href={elem?.redirect_link?.link || '/'} target='_blank'>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'} position-relative`}>
            {ratioImage ? <RatioImage src={`${LiveImagePath}${imgUrl}`} className={`bg-img ${customRatioClass}`} alt='banner' /> : <Image src={`${LiveImagePath}${imgUrl}`} className={`img-fluid ${customRatioClass}`} alt='banner' fill style={{ objectFit: 'cover' }} />}
          </div>
        </Link>
      ) : elem?.redirect_link?.link_type === 'collection' ? (
        <Link href={`/collections?category=${elem?.redirect_link?.link}` || '/'}>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'} position-relative`}>
            {ratioImage ? <RatioImage src={`${LiveImagePath}${imgUrl}`} className={`bg-img ${customRatioClass}`} alt='banner' /> : <Image src={`${LiveImagePath}${imgUrl}`} className={`img-fluid ${customRatioClass}`} alt='banner' fill style={{ objectFit: 'cover' }} />}
          </div>
        </Link>
      ) : elem?.redirect_link?.link_type === 'product' ? (
        <Link href={`/${redirectToProduct(elem?.redirect_link?.link)}` || '/'}>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'} position-relative`}>
            {ratioImage ? <RatioImage src={`${LiveImagePath}${imgUrl}`} className={`bg-img ${customRatioClass}`} alt='banner' /> : <Image src={`${LiveImagePath}${imgUrl}`} className={`img-fluid ${customRatioClass}`} alt='banner' fill style={{ objectFit: 'cover' }} />}
          </div>
        </Link>
      ) : (
        <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'} position-relative`}>
          {ratioImage ? <RatioImage src={`${LiveImagePath}${imgUrl}`} className={`bg-img ${customRatioClass}`} alt='banner' /> : <Image src={`${LiveImagePath}${imgUrl}`} className={`img-fluid ${customRatioClass}`} alt='banner' fill style={{ objectFit: 'cover' }} />}
        </div>
      )}
    </div>
  );
};

export default OfferBanner;
