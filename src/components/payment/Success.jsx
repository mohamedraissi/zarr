'use client';
import { Col } from 'reactstrap';
import Image from 'next/image';
import Breadcrumb from '../common/Breadcrumb';
import WrapperComponent from '../common/WrapperComponent';
import OrderSuccessImage from '../../../public/assets/images/inner-page/order-success.png';
import Btn from '@/elements/buttons/Btn';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";

const PaymentSuccessComponent = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    return (
        <>
            <Breadcrumb title={'Paiement réussi avec succès'} subNavigation={[{ name: 'Paiement réussi avec succès' }]} />
            <WrapperComponent classes={{ sectionClass: 'section-404 section-lg-space' }} customCol>
                <Col xs='12'>
                    <div className='image-404'>
                        {OrderSuccessImage && <Image src={OrderSuccessImage} className='img-fluid' alt='payment success' height={400} width={400} />}
                    </div>
                </Col>
                <Col xs={12}>
                    <div className='contain-404'>
                        <h2 className='mb-3'>Votre paiement a été effectué avec succès !
                        </h2>
                        <p className='text-content'>Merci pour votre paiement. Votre commande est en cours de traitement et vous recevrez un e-mail de confirmation sous peu.</p>
                        <Btn id='back_button' className='btn-md text-white theme-bg-color mt-4 mx-auto' title={'Back to Home'} onClick={() => router.push('/')} />
                    </div>
                </Col>
            </WrapperComponent>
        </>
    );
};

export default PaymentSuccessComponent;
