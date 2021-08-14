import React, { useEffect, useState, useRef, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { apiProvider } from 'services/modules/provider';

interface Props {
  tableData: any;
  offset: number | string;
  limit: number | string;
  subURL: string;
  columns: ReadonlyArray<any>;
  onChange?: (newValue: any) => void;
}

const Table: React.FunctionComponent<Props> = (props: any) => {
  const [columns, setColumns] = useState(props.columns);
  const [offset, setOffset] = useState(props.offset);
  const [limit, setLimit] = useState(props.limit);
  const [info, setInfo] = useState<any>(props.tableData.tableData);
  const [total, setTotal] = useState(props.tableData.tableCount);
  const isMounted = useRef(false);
  const [flag, setFlag] = useState(true);

  const getTableList = async () => {

    console.log("The offset & limit: ", offset, limit);
    const response = await apiProvider.getTabledata(
      offset,
      limit,
      props.subURL,
    );
    setInfo(response.data.tableData);
    setTotal(response.data.tableCount);
  };

  useEffect(() => {
    if (isMounted.current) {
      getTableList();
      setFlag(true);
    } else {
      isMounted.current = true;
      setFlag(false);
    }
  }, [offset, limit]);

  const handleChange = (state: any) => {
    props?.onChange(state);
  };

  return (
    <>
      {flag && (
        <DataTable
          title=""
          columns={columns}
          data={info}
          selectableRows
          onRowClicked={handleChange}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={total}
          paginationPerPage={limit}
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          paginationComponentOptions={{
            noRowsPerPage: false,
          }}
          onChangeRowsPerPage={rowsPerPage => setLimit(rowsPerPage)}
          onChangePage={pageNo => setOffset(limit * pageNo - limit)}
        />
      )}
    </>
  );
};
export default Table;
