import React, { useState, useEffect } from 'react';
import { searchItemsType } from 'types/definedType';
import List from './components/List';

const AllUser = () => {

  const searchData: (searchItemsType | searchItemsType[])[] = [
    [
      {
        label: 'Date',
        keyName: 'date',
        type: 'DatePicker',
      },

      {
        label: 'ID',
        keyName: 'id',
      },

    ],

    [
      {
        label: 'E-mail',
        keyName: 'senderEmail',
      },
      {
        label: 'Remittance',
        keyName: 'remittanceMethod',
        type: 'select',
        datalist: [
          { code: 0, value: '은행 계좌 입금' },
          { code: 1, value: '모바일 월렛' },
        ],
      },
    ],

  ];

  return <List searchData={searchData} subURL="users/" />;
};

export default AllUser;
