import axios from 'axios';


//instead of using provider.ts
//I just figured out advanced way to use axios call with interceptors
//2021.05.07

const instance = axios.create({
    baseURL: '',
    timeout: 1000,
});


instance.interceptors.request.use(
    function (config) {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Authorization"] = "";
    
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }

);

instance.interceptors.response.use(
    function (response : any) {
        console.log(response);

        if(response.code !== 200){ 
            return response.code;
        }
        return response.data;
    },
    function (error: any) {
        return error;
    }
);

/* How to call above axios
// Sample

 modifyBoardContent(data) {
    var params = {
      boardNo: data.boardNo,
      boardTitle: data.boardTitle,
      context: data.context,
      userNo: AuthService.getUserNo()
    };

    return ApiController({
      url: base + "modify",
      method: "put",
      data: params,
    });
  }




*/