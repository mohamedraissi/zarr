import React, { useContext, useEffect } from 'react';
import Btn from '@/elements/buttons/Btn';
import MainHeaderMenu from './MainHeaderMenu';

import { useTranslation } from "react-i18next";
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { RiCloseLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

const ClassicHeaderMenu = () => {
  const pathname = usePathname();
  const { mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const { t } = useTranslation( 'common');

  useEffect(() => {
    setMobileSideBar(false);
  }, [pathname]);

  return (
    <div className='header-nav-middle'>
      <div className='main-nav navbar navbar-expand-xl navbar-light navbar-sticky'>
        <div className={`offcanvas offcanvas-collapse order-xl-2 ${mobileSideBar ? 'show' : ''}`} id='primaryMenu'>
          <div className='offcanvas-header navbar-shadow'>
            <h5>{t('menu')}</h5>
            <Btn className='btn-close lead' type='button' onClick={() => setMobileSideBar(!mobileSideBar)}>
              <RiCloseLine/>
            </Btn>
          </div>
          <div className='offcanvas-body' onClick={(e) => {
            if (e.target.closest('a') && !e.target.closest('.dropdown-toggle')) {
              setMobileSideBar(false);
            }
          }}>
            <MainHeaderMenu />
          </div>
        </div>
        {mobileSideBar && <div className={'offcanvas-backdrop fade show'} onClick={() => setMobileSideBar(!mobileSideBar)} />}
      </div>
    </div>
  );
};

export default ClassicHeaderMenu;
