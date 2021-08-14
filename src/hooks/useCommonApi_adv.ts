import { useState, useEffect } from 'react';
import { apiProvider } from 'services/modules/provider';
import { useSelector, useDispatch } from 'react-redux';
import {
  userSelector,
  logoutUser,
  clearState,
} from 'redux/features/User/UserSlice';
import { useHistory } from 'react-router-dom';
import { useLoading } from 'components/Loading/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';

//react Query를 사용하기 위해 생성 2021.05.18
// 도전!!!!


export const useCommonApi_adv = (url: string, params?: any) => {
  //TODO:  delete console
  // console.log('useCommonApi call');
  const history = useHistory();
  const dispatch = useDispatch();
  const [_, setLoading] = useLoading();
  const [State, setState] = useState<any>();

  const { isLoading, error, data } = useQuery('fetchCommon', () => 
    axios('/api/v1/admin/common/' + url, params).then( (res) :any => {
        return res.data
    })
  )

    if(data?.code === 900){
        setLoading(false);
        dispatch(logoutUser());
        history.push('/login');
    }
    useEffect(() => {
      let resultData = data?.data || [];
      

      if (url === 'available_mso') {
        resultData = resultData.map((o: any) => {
          return { value: o.name, label: o.id };
        });
      }     
      else {
        resultData = resultData.map((o: any) => {
          return { value: o.id, label: o.name };
        });
      }
      setState([...resultData]);
    }, [data])
  
  if (isLoading) return 'Loading...'

  return State;
};
