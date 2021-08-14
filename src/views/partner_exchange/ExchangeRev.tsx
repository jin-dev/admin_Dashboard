import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';
import { searchItemsType } from 'types/definedType';
import List from '../remittance/components/List'

const ExchangeRev = () => {
  const currencyList = useCommonApi('available_currencies');
    const searchData: (searchItemsType | searchItemsType[])[] = [
        [
          {
            label: '환전 완료 일시',
            keyName: 'done_date',
            type: 'DatePicker',
          },
          {
            label: '환전 번호',
            keyName: 'exchange_number',
          },
        ],
        [
          {
            label: '이메일',
            keyName: 'email',
          },
          {
            label: '고객명',
            keyName: 'korean_name',
          },
          

          
        ],
        [
            {
                label: '받는 통화',
                keyName: 'to_currency_id',
                type: 'select',
                datalist: currencyList,
              },
              {
                label: '정산 유무',
                keyName: 'fee',
                type: 'select',
                datalist:  [
                  { code: 'Y', value: 'Y' },
                  { code: 'N', value: 'N' },
                ],
              },
         
        ],
      ];
    

  return <List searchData={searchData} subURL="partner/get_exchanges_revenue" />;
};

export default ExchangeRev;
