import { useLoading } from 'components/Loading/Loading';
import React, { useState, useEffect, useMemo } from 'react';
import { IDataTableColumn } from 'react-data-table-component';
import { apiProvider } from 'services/modules/provider';
import List from './List';

const DormentUserList = () => {
  const searchData: any = [
    {
      label: '이메일',
      keyName: 'userInfo',
    },
  ];
  const [_, setLoading] = useLoading();
  const handleRestore = async (id: string | number) => {
    setLoading(true);
    try {
      const result = await apiProvider.post('customer/dormancy', {
        id,
      });
      if (!result.success) {
        alert(result.msg || result.detailMsg);
        return;
      }
      alert('복구가 완료되었습니다.');
      window.location.reload();
    } catch (e) {
      alert('error' + ' ' + e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string | number, id: number) => {
    setLoading(true);
    try {
      const result = await apiProvider.post('/customer/closed', {
        dormancyId: id,
        userId,
      });

      if (!result.success) {
        alert(result.msg || result.detailMsg);
        return;
      }
      alert(result.detailMsg || 'success');
      window.location.reload();
    } catch (e) {
      alert('error' + ' ' + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <List
      title=""
      searchData={searchData}
      subURL="customer/dormancy"
      columnOptions={{ email: { minWidth: '180px' } }}
      onRowClicked={() => {}}
      cellFn={(
        row: any,
        idx: number,
        col: IDataTableColumn,
        id: string | number,
      ) => {
        return col.selector === 'restore' ? (
          <button onClick={() => handleRestore(row.id)}>복구</button>
        ) : col.selector === 'delete' ? (
          <button onClick={() => handleDelete(row.user_id, row.id)}>
            삭제
          </button>
        ) : (
          <div>{row[col.selector as string]}</div>
        );
      }}
    />
  );
};

export default DormentUserList;
