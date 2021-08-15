import React, { useState, useEffect, useRef, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { apiProvider } from 'services/modules/provider';
import { useLoading } from 'components/Loading/Loading';
import { Link } from 'react-router-dom';
import { CButton, CRow, CTextarea } from '@coreui/react';

import { useSelector, useDispatch } from 'react-redux';
import {
  userSelector,
  logoutUser,
  clearState,
} from 'redux/features/User/UserSlice';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useFlag } from 'components/checkFlag/checkFlag';
import { Rating } from '@material-ui/lab';
import { useHistorySave } from 'components/saveHistory/saveHistory';
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
  const [refresh, setRefresh] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useFlag();
  const [historyData, setSearchData]: any = useHistorySave();
  const history = useHistory();
  const dispatch = useDispatch();

  const getTableList = async () => {
    setLoading(true);
    try {
      const data = await apiProvider.get(subURL, {
        gubun: gubun,
        type: type,
        ...query,
        offset,
        limit,
      });

      //health Check --> if 900 --> log out


      console.log("The data: ", data);

      let header = [];

      header.push(
        {
          value: 'ID',
          key: 'id'
        },
        {
          value: 'User',
          key: 'username'
        },
        {
          value: 'Permission',
          key: 'permission'
        },
        {
          value: 'Select',
          key: 'select',
        },
        

      )

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
        if (data.key.indexOf('') > -1) {
          result = {
            selector: data.key,
            name: data.value,

            format: (row: any) => row[data.key],
            width: '80px',
          };
        }

        if (data.key === 'permission') {
          return {
            selector: data.key,
            name: data.value,
            maxWidth: '40px',
            cell: (props: any) => (
              <div> {props?.permission === 1 ? 'yes' : 'no'} </div>
            )
          };
        }

        if (data.key === 'select') {
          return {
            selector: data.key,
            name: data.value,
            maxWidth: '20px',
            cell: (data: any) => (
              <CCancelBtn onClick={() =>  props.selectedEmployee(data)}>
                Select
              </CCancelBtn>
            )
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

      //      setList(listData ?? []);
      // totalCount !== tableCount && setTotalCount(tableCount);

      setList(data);
      setTotalCount(data?.length);

      columns.length === 0 && setColumns(tableHeader);
    } catch (err) {
      setList([]);
      setLoading(false);
      // dispatch(logoutUser());
      // history.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    setIsButtonClicked(false);
    setRefresh(false);
    getTableList();
  }, [limit, offset, refresh, isButtonClicked]);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    setOffset(0);
    getTableList();
  }, [query]);









  return (
    <Fragment>
      <DataTable
        title={(title === 'Users')}
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


const CCancelBtn = styled(CButton)`
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  background-color: #f3a42d;
  &:hover {
    color: #fff;
    background-color: #bd4212;
  }
`;


const CAddBtn = styled(CButton)`
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  background-color: #2d47f3;
  &:hover {
    color: #fff;
    background-color: #262d5c;
  }
`;


