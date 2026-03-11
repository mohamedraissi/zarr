'use client';
import { Col } from 'reactstrap';
import Breadcrumb from '../common/Breadcrumb';
import WrapperComponent from '../common/WrapperComponent';
import Btn from '@/elements/buttons/Btn';
import { useRouter } from 'next/navigation';
import { RiErrorWarningLine } from 'react-icons/ri';

const PaymentErrorComponent = () => {
    const router = useRouter();

    return (
        <>
            <Breadcrumb title={'Paiement echoué'} subNavigation={[{ name: 'Paiement echoué' }]} />
            <WrapperComponent classes={{ sectionClass: 'section-404 section-lg-space' }} customCol>
                <Col xs='12'>
                    <div className='image-404'>
                        <RiErrorWarningLine size={150} color='#ff4f4f' />
                    </div>
                </Col>
                <Col xs={12}>
                    <div className='contain-404'>
                        <h2 className='mb-3'>Paiement échoué !</h2>
                        <p className='text-content'>Nous sommes désolés, mais votre paiement n'a pas pu être traité à ce moment-là. Veuillez vérifier vos informations de paiement et réessayer.</p>
                        <div className='d-flex justify-content-center gap-3 mt-4'>
                            <Btn id='retry_button' className='btn-md text-white theme-bg-color' title={'Try Again'} onClick={() => router.push('/checkout')} />
                            <Btn id='back_button' className='btn-md btn-outline theme-bg-color' title={'Back to Home'} onClick={() => router.push('/')} />
                        </div>
                    </div>
                </Col>
            </WrapperComponent>
        </>
    );
};

export default PaymentErrorComponent;
