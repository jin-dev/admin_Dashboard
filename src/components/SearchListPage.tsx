import React, { useState, useCallback } from 'react';
import moment from 'moment';
import SearchBox from 'components/SearchBox';
import ListTable from 'components/ListTable';
import CommonModal from './CommonModal';
import { UrlExcel } from 'components/exportToExcel/UrlExcel';

const SearchListPage = ({
  searchData,
  subURL,
  title,
  modalBody,
  ...props
}: any) => {
  const [query, setQuery] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<number>();

  const handleQuery = useCallback((inputs: any) => {
    const result: any = {};
    for (let key in inputs) {
      if (!inputs[key]) continue;
      if (key === 'date') {
        if (inputs.date.length === 1) {
          result.startDate = moment(inputs.date[0]).format('YYYY-MM-DD');
          result.endDate = moment(inputs.date[0]).format('YYYY-MM-DD');
        } else {
          result.startDate = moment(inputs.date[0]).format('YYYY-MM-DD');
          result.endDate = moment(inputs.date[1]).format('YYYY-MM-DD');
        }
      } else if (
        ['countryId', 'stringKey', 'controller', 'method'].includes(key)
      ) {
        if (!inputs[key].value) continue;
        result[key] = inputs[key].value;
      } else {
        result[key] = inputs[key];
      }
    }
    if (props.sort) result['orderby'] = 'desc';

    setQuery(result);
  }, []);

  const onRowClicked = (data: any) => {
    setUserId(data.id);
    setShowModal(true);
  };

  const controlSort = () => {
    const toChange = query.orderby === 'asc' ? 'desc' : 'asc';

    setQuery({ ...query, orderby: toChange });

    return true;
  };

  return (
    <>
      <SearchBox
        searchData={searchData}
        query={query}
        handleQuery={handleQuery}
      />
      <ListTable
        title={title}
        subURL={subURL}
        query={query}
        pointerOnHover
        onRowClicked={props?.listOptions?.onRowClicked || onRowClicked}
        onSort={controlSort}
        sortServer={true}
        {...props}
        {...props.listOptions}
      />
      <CommonModal
        isModal={props.isModal ?? showModal}
        setIsModal={props.setIsModal ?? setShowModal}
        body={modalBody}
        {...props.modalOptions}
      />
    </>
  );
};
export default SearchListPage;
