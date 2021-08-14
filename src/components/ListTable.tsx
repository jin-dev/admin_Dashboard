import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { apiProvider } from 'services/modules/provider';
import { ExportToExcel } from './exportToExcel';
import { useLoading } from './Loading/Loading';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  userSelector,
  logoutUser,
  clearState,
} from 'redux/features/User/UserSlice';
import { useHistory } from 'react-router-dom';

interface Props {
  data: dataType;
  subURL: string;
  title?: string;
  gubun?: string;
  columnOptions?: { [key: string]: object };
  keyField?: string;
  onRowClicked?: () => void;
}
interface dataType {
  tableData: {
    tableCount: number;
    data: any[];
    header: { key: string; value: string }[];
  };
}
interface columnType {
  selector: string;
  name: string;
}

const ListTable = ({
  title,
  gubun,
  type,
  query,
  subURL,
  onRowClicked,
  customColumnEntries,
  columnOptions,
  ...props
}: any) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [list, setList] = useState<any[]>([]);
  const [columns, setColumns] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [_, setLoading] = useLoading();
  const skipInitialFetch = useRef(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const getTableList = async () => {
    setLoading(true);
    try {
      const {
        data: {
          tableCount,
          tableData: listData,
          tableMetaData: { header: headerMeta },
        },
        code,
      } = await apiProvider.get(subURL, {
        gubun: gubun,
        type: type,
        ...query,
        offset,
        limit,
      });

      //health Check --> if 900 --> log out
      if (code === 900) {
        setLoading(false);
        dispatch(logoutUser());
        history.push('/login');
      }

      let header = [...headerMeta];

      if (customColumnEntries && Array.isArray(customColumnEntries)) {
        header = header.concat(customColumnEntries);
      }

      if (columnOptions) {
        for (let key in columnOptions) {
          header = header.map((headerItem: any) =>
            headerItem.key === key
              ? { ...headerItem, columnOptions: columnOptions[key] }
              : headerItem,
          );
        }
      }

      const tableHeader: columnType[] = header.map((data: any) => {
        let result;
        if (data.key.indexOf('date') > -1) {
          result = {
            selector: data.key,
            name: data.value,
            //[백엔드 요청] 의석 실장님이 모멘트 포맷 변환 하는거 빼달라고 해서 일단 뺌 2021.04.23
            format: (row: any) => row[data.key],
            width: '170px',
          };
        }
        if (data.value === '고객번호') {
          result = {
            selector: data.key,
            name: data.value,
            width: '160px',
          };
        }
        if (data.value === '거절사유') {
          result = {
            selector: data.key,
            name: data.value,
            width: '700px',
          };
        }

        //FXrepot 메뉴에서 필요해서 임시방편 처리
        //동욱 차장님 요청으로
        //Fxrepot inbound detail --> outbound detail로

        if (data.key === 'transactionid' && subURL.includes('fx1012')) {
          return {
            selector: data.key,
            name: data.value,
            cell: (props: any) => (
              <Link
                to={{
                  //동욱 차장님 요청 userId --> id로 바꿈
                  pathname: `/transaction/details/${props.id}`,
                  state: {
                    createdAt: props.createdate,
                  },
                }}
                className="mb-0 text-info"
              >
                {props.transactionid}
              </Link>
            ),
          };
        }

        if (data.key === 'transactionid' && subURL.includes('fx1013')) {
          return {
            selector: data.key,
            name: data.value,
            cell: (props: any) => (
              <Link
                to={{
                  //동욱 차장님 요청 userId --> id로 바꿈
                  pathname: `/transaction/inbound_details/${props.id}`,
                  state: {
                    createdAt: props.createdate,
                  },
                }}
                className="mb-0 text-info"
              >
                {props.transactionid}
              </Link>
            ),
          };
        }

        result = {
          selector: data.key,
          name: data.value,
          cell: props.cellFn,
          ...result,
          ...data?.columnOptions,
        };
        return result;
      });

      setList(listData ?? []);
      totalCount !== tableCount && setTotalCount(tableCount);
      columns.length === 0 && setColumns(tableHeader);
    } catch (err) {
      setList([]);
      setLoading(false);
      dispatch(logoutUser());
      history.push('/login');

      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <div>
      <ExportToExcel apiData={list} fileName="userExcel" />
    </div>
  );

  useEffect(() => {
    getTableList();
  }, [limit, offset]);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    setOffset(0);
    getTableList();
  }, [query]);

  return (
    <DataTable
      title={(title === 'excel' && renderHeader()) || title}
      columns={columns}
      data={list}
      onRowClicked={onRowClicked}
      highlightOnHover
      pagination
      paginationServer
      paginationTotalRows={totalCount}
      paginationPerPage={limit}
      paginationRowsPerPageOptions={[10, 25, 50, 100]}
      paginationComponentOptions={{
        noRowsPerPage: false,
      }}
      onChangeRowsPerPage={rowsPerPage => setLimit(rowsPerPage)}
      onChangePage={pageNo => setOffset(limit * (pageNo - 1))}
      {...props}
    />
  );
};

export default ListTable;
