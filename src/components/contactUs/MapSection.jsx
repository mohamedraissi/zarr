import WrapperComponent from '../common/WrapperComponent';

const MapSection = () => {
  return (
    <WrapperComponent classes={{ sectionClass: 'map-section', fluidClass: 'p-0' }} noRowCol={true}>
      <div className='map-box'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204100.6620156527!2d10.062993994896555!3d36.936708125734505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2caea2dcce671%3A0x97fb068114f2f2fa!2sP%C3%A2tisserie%20Madame%20ZARROUK%20La%20soukra!5e0!3m2!1sfr!2stn!4v1772113856110!5m2!1sfr!2stn'
          style={{ border: 0 }}
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'></iframe>
      </div>
    </WrapperComponent>
  );
};

export default MapSection;
