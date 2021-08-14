import React, { useState, useEffect, useMemo } from 'react';
import { IDataTableColumn } from 'react-data-table-component';
import List from './List';

const DormentControlList = () => {
  const searchData: any = [
    {
      label: '이메일',
      keyName: 'userInfo',
    },
  ];

  const handleRestore = () => {};

  const handleDelete = () => {};

  return (
    <List
      title=""
      searchData={searchData}
      subURL="customer/customer"
      gubun="all"
      cellFn={(
        row: any,
        idx: number,
        col: IDataTableColumn,
        id: string | number,
      ) => {
        console.log({ row });

        return col.selector === 'restore' ? (
          <button onClick={handleRestore}>복구</button>
        ) : col.selector === 'delete' ? (
          <button onClick={handleDelete}>삭제</button>
        ) : (
          <div>{row[col.selector as string]}</div>
        );
      }}
    />
  );
};

export default DormentControlList;
