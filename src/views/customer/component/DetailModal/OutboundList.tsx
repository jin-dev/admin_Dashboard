import React from 'react';
import TransactionList from './TransactionList';

const OutboundList = ({ userId, User }: any) => {
  return (
    <div>
      <TransactionList userId={userId} User={User} type="outbound" />
    </div>
  );
};

export default OutboundList;
