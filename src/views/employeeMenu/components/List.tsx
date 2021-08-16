import React, { useState, useCallback } from 'react';
import moment from 'moment';
import SearchBox from 'components/SearchBox';
import ListTable from './ListTable';
import FeedBackModal from './FeedBackModal';

const List = ({ searchData, subURL, gubun, type, ...props }: any) => {
  const [query, setQuery] = useState<any>({});
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<any>({});

  const handleQuery = useCallback((inputs: any) => {
    const result: any = {};
    for (let key in inputs) {

      if (!inputs[key]) continue;
      if (key === 'date') {

        if (subURL === "partner/get_transactions" || subURL === "partner/get_exchanges") {

          if (inputs.date.length === 1) {
            result.create_date_start = moment(inputs.date[0]).format('YYYY-MM-DD');
            result.create_date_end = moment(inputs.date[0]).format('YYYY-MM-DD');
          } else {
            result.create_date_start = moment(inputs.date[0]).format('YYYY-MM-DD');
            result.create_date_end = moment(inputs.date[1]).format('YYYY-MM-DD');
          }

        } else if (subURL === "partner/get_transaction_revenue" || subURL === "partner/get_exchanges_revenue") {

          if (inputs.date.length === 1) {
            result.done_date_start = moment(inputs.date[0]).format('YYYY-MM-DD');
            result.done_date_end = moment(inputs.date[0]).format('YYYY-MM-DD');
          } else {
            result.done_date_start = moment(inputs.date[0]).format('YYYY-MM-DD');
            result.done_date_end = moment(inputs.date[1]).format('YYYY-MM-DD');
          }

        } else {
          if (inputs.date.length === 1) {
            result.startDate = moment(inputs.date[0]).format('YYYY-MM-DD');
            result.endDate = moment(inputs.date[0]).format('YYYY-MM-DD');
          } else {
            result.startDate = moment(inputs.date[0]).format('YYYY-MM-DD');
            result.endDate = moment(inputs.date[1]).format('YYYY-MM-DD');
          }
        }

      } else if (key === 'countryId') {
        if (!inputs[key].value) continue;
        result[key] = inputs[key].value;
      } else {
        result[key] = inputs[key];
      }
    }
    result['orderby'] = 'desc';
    if (subURL !== 'partner/user') {
      //TODO
      //user partner_id로 할당하기
      // result['partner_id'] = 2;
    }

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
        title={'excel'}
        subURL={subURL}
        gubun={gubun}
        type={type}
        query={query}
        pointerOnHover
        onRowClicked={props?.listOptions?.onRowClicked || onRowClicked}
        columnOptions={{ create_date: { sortable: true } }}
        onSort={controlSort}
        sortServer={true}
        showModal={showModal}
        setShowModal={setShowModal}
        setModalType={setModalType}
        setUserId={setUserId}
        {...props}
        {...props.listOptions}
      />

      {showModal && (
        <FeedBackModal
          modal={showModal}
          setModal={setShowModal}
          userId={userId}
          type={modalType}
        />
      )}
    </>
  );
};
export default List;
