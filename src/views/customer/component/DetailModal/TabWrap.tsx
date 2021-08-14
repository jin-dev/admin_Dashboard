import React, { useState, useEffect } from 'react';
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCardBody,
  CTabs,
} from '@coreui/react';
import { apiProvider } from 'services/modules/provider';
import TabDetail from './TabDetail';
import TabTransaction from './TabTransaction';

const TabWrap = ({ userId, setUserId }: any) => {
  const [userData, setUserData] = useState();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await apiProvider.get('customer/detail', {
        userId,
      });
      setUserData(data.data);
    };
    userId && getData();
  }, [userId, refresh]);

  return (
    <CCardBody>
      <CTabs>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink>상세보기</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>해외송금 내역</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane>
            <TabDetail
              userData={userData}
              userId={userId}
              setUserId={setUserId}
              isMemo={true}
              setRefresh={setRefresh}
            />
          </CTabPane>
          <CTabPane>
            <TabTransaction userId={userId} />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CCardBody>
  );
};

export default TabWrap;
