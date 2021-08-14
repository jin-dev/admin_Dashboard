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


export const useCommonApi = (url: string, params?: any) => {
  //TODO:  delete console
  // console.log('useCommonApi call');
  const history = useHistory();
  const dispatch = useDispatch();
  const [_, setLoading] = useLoading();

  const [State, setState] = useState<any>();
  useEffect(() => {
    try {
      // console.log('useCommonApi try in useEffect');

      const getState = async () => {
        // console.log('useCommonApi try in useEffect - before api function call');

        const result: any = await apiProvider.get('partner/' + url, params);
        // console.log('useCommonApi try in useEffect - after api function call result' + result);


        if(result.code === 900){
          setLoading(false);
          dispatch(logoutUser());
          history.push('/login');
        }



        let resultData = result.data || [];
        if (url === 'available_countries') {
          resultData = resultData.map((o: any) => {
            return { value: o.name, code: o.id };
          });
        }

        if (url === 'available_currencies') {
          resultData = resultData.map((o: any) => {
            return { value: o.code, code: o.id };
          });
        }

        if (url === 'available_mso') {
          resultData = resultData.map((o: any) => {
            return { value: o.name, label: o.id };
          });
        }
        if (url === 'send_countries_by_inbound') {
          resultData = resultData.map((o: any) => {
            return { value: o.id, label: o.name };
          });
        }
        if (url === 'recipient_countries_by_outbound') {
          resultData = resultData.map((o: any) => {
            return { value: o.id, label: o.name };
          });
        }
        //공백 부분 빼라는 백엔드 요청이 있어 제거 2021.04.16
        //setState([{ value: '', label: 'all' }, ...resultData]);
        setState([...resultData]);
        return resultData;
      };
      getState();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return State;
};
