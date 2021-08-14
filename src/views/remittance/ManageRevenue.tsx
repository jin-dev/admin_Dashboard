import React, { useState, useEffect } from 'react';
import { useCommonApi } from 'hooks/useCommonApi';
import { searchItemsType } from 'types/definedType';
import List from './components/List'

const ManageRevenue = () => {
  const countries = useCommonApi('available_countries');
  const currencyList = useCommonApi('available_currencies');

    const searchData: (searchItemsType | searchItemsType[])[] = [
        [

          {
            label: '송금 완료일시',
            keyName: 'done_date',
            type: 'DatePicker',
          },
            {
                label: '송금 번호',
                keyName: 'ticket_number',
             
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
                label: '받는 방법',
                keyName: 'method',
                type: 'select',
                datalist:  [

                  { code: 0, value: '은행계좌 입금' },
                  { code: 1, value: '캐시 픽업' },
                  { code: 2, value: '모바일 월렛' },
                  { code: 3, value: 'ATM 카드' },
                  { code: 4, value: 'Debit 카드' },
                ],
              },
         
        ],
        [
            {
                label: '받는 국가',
                keyName: 'to_country_id',
                type: 'select',
                datalist: countries,
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
     
      ];
    
  return <List searchData={searchData} subURL="partner/get_transaction_revenue" />;
};

export default ManageRevenue;
