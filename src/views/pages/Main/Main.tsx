import React, { useEffect } from 'react';
import { apiProvider } from 'services/modules/provider';

function Main() {
  useEffect(() => {
    console.log('HAHAHA');
    getSession();
  }, []);

  const getSession = async () => {
    const response = await apiProvider
      .get('partner/partnerinfosession')
      .then((res: any) => {
        console.log('HAHA');
        sessionStorage.setItem('partner_id', res?.partnerid);
        return res;
      });
  };

  return <div>Welcome SKS</div>;
}

export default Main;
