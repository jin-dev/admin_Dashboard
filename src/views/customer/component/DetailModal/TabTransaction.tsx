import React, { useState, useEffect } from 'react';
import { Tabset, Tab, ButtonGroup, ButtonIcon } from 'react-rainbow-components';
import styled from 'styled-components';
import { apiProvider } from 'services/modules/provider';
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from '@coreui/react';
import OutboundList from './OutboundList';
import InboundList from './InboundList';

const TransactionTab = (props: any) => {
  const [User, setUser] = useState('');

  useEffect(() => {
    const amountCall = async () => {
      try {
        const userData = await apiProvider.get(
          `/transaction/customer/detail?userId=${props.userId}&type=inbound`,
        );

        setUser(userData.data);
      } catch (e) {
        console.log(e);
      }
    };
    amountCall();
  }, []);

  return (
    <Wrap>
      <CTabs>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink>Outbound 송금</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>Inbound 송금</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane>
            <OutboundList {...props} User={User} />
          </CTabPane>
          <CTabPane>
            <InboundList {...props} User={User} />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-top: 10px;
`;

export default TransactionTab;
