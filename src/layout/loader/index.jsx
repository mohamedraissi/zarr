import { useContext } from 'react';

import { useTranslation } from "react-i18next";

const Loader = () => {
  
  const { t } = useTranslation( 'common');
  return (
    <div className='loader-wrapper'>
      <div>
        <div className='loader' style={{ borderColor: '#daad30 !important' }}></div>
        <h3>{t('loading')}</h3>
      </div>
    </div>
  );
};

export default Loader;
