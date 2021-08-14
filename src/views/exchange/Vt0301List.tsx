import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';

import { searchItemsType } from 'types/definedType';
import List from './components/List';

const Vt0301List = () => {
  const countries = useCommonApi('available_countries');
  const partners = useCommonApi('code/type', { type: 12 });

  const searchData: (searchItemsType | searchItemsType[])[] = [
    [
      {
        label: '발생 일시',
        keyName: 'date',
        type: 'DatePicker',
      },
    ],

    [
      {
        label: '이메일/고객관리번호',
        keyName: 'userInfo',
      },
    ],
    [
      {
        label: 'VT0301 관리번호',
        keyName: 'vt0301Info',
      },
    ],
  ];

  return <List searchData={searchData} subURL="exchange/vt0301_list" />;
};

export default Vt0301List;
