import React, { useState, useEffect, useRef, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { apiProvider } from 'services/modules/provider';
import { useLoading } from 'components/Loading/Loading';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  userSelector,
  logoutUser,
  clearState,
} from 'redux/features/User/UserSlice';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  CButton,
  CRow,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CTextarea,
} from '@coreui/react';
import { ExcelDownloader } from './ExcelDownloader';

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
  const [excelURL, setExcelURL] = useState('');

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
    } finally {
      setLoading(false);
    }
  };

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

  const renderHeader = () => (
    <div>
      <ExcelDownloader
        excelURL={excelURL}
        query={query}
        buttonName="Excel Exporter"
        buttonColor="success"
      />
      <ExcelDownloader
        excelURL={excelURL}
        query={query}
        buttonName="대량 이체파일 생성"
        buttonColor="primary"
      />
    </div>
  );

  return (
    <Fragment>
      <DataTable
        title={(title === 'excel' && renderHeader()) || renderHeader()}
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
    </Fragment>
  );
};

export default ListTable;

const SpaceRow = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  margin-left: 15px;
  margin-right: 0px;
`;