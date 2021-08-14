import React from 'react';
import DefaultInfo from './DefaultInfo';
import EtcInfo from './EtcInfo';
import AccountManage from './AccountManage';

const TabDetail = (props: any) => {
  return (
    <div>
      <DefaultInfo {...props} />
      <EtcInfo {...props} />
      <AccountManage {...props} />
    </div>
  );
};

export default TabDetail;
