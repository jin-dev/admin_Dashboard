import React, {useEffect} from 'react';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import nav from '../nav';
import { apiProvider } from 'services/modules/provider';

const TheSidebar = () => {
 
  useEffect(() => {
    
    getSession();
    }, [])
    
    const getSession = async () => {
      const response = await apiProvider
        .get('partner/partnerinfosession')
        .then( (res : any) => {
          sessionStorage.setItem('partner_id', res?.partnerid);
          return res;
        });
    };
    
  



  return (
    <CSidebar>
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
