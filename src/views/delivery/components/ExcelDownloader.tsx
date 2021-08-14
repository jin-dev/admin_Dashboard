import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CButton } from '@coreui/react';
import FileDownload from 'js-file-download';
import axios, { AxiosRequestConfig } from 'axios';
import { useLoading } from 'components/Loading/Loading';

interface paramsType {
  excelURL: any;
  query: any;
  buttonName?: string;
  buttonColor?: string;
}

export const ExcelDownloader = ({
  excelURL,
  query,
  buttonName,
  buttonColor,
}: any) => {
  const [_, setLoading] = useLoading();

  const exportToCSV = (excelURL: string, query: any, buttonName?: string) => {
    let excelName_adv = '';

    setLoading(true);
    axios({
      url: excelURL,
      method: 'GET',
      responseType: 'blob', // Important
      params: query,
    })
      .then(response => {
        excelName_adv = response.headers['content-disposition'];

        FileDownload(
          response.data,
          excelName_adv.substr(excelName_adv.indexOf('=') + 1),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CButton
      color={buttonColor}
      className="mr-3"
      onClick={(e: any) => exportToCSV(excelURL, query, buttonName)}
    >
      {buttonName ? buttonName : null}
    </CButton>
  );
};
