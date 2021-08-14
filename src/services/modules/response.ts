export function handleResponse(response: any) {
  //response 값으로 오는 부분이 data 인지 result인지 확인

  if (response.results) {
    return response.results;
  }

  if (response.data) {
    return response.data;
  }

  return response;
}

export function handleError(error: any) {
  //error 가 올경우 handling 하는 부분

  if (error.data) {
    return error.data;
  }

  return error;
}
