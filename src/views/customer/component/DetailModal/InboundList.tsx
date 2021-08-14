import React from 'react';
import TransactionList from './TransactionList';

const InboundList = ({ userId, User }: any) => {
  return (
    <div>
      <TransactionList userId={userId} User={User} type="inbound" />
    </div>
  );
};

export default InboundList;
