module.exports = {
    mode : "production", // 개발모두, none 상황에 따라 설정
    devtool : "source-map", // 디버그시 위치파악하기 위해 source-map허용
    resolve : {
      // 확장자 추가
      extensions : ['.ts','.tsx']
    },
    module : {
      // loader 추가
      rules : [
        {
          test : /\.ts(x?)$/, // .ts or .tsx
          exclude : /node_modules/, // node_modules 폴더 제외
          use : [
            {
              loader : 'ts-loader' // loader 지정
            }
          ]
        },
        {
          // .js 출력파일 소스맵 처리
          enforce : 'pre',
          test : /\.js$/,
          loader : 'source-map-loader'
        }
      ]
    },
    externals : {
      // 다음중 일치하는 모듈을 가져올때 해당 전역변수가 있다고 가정하고 사용.
      // 이부분 중요
      // 웹팩이 React변수에서 react를 불러오기 위한 마법을 사용한단다.
      // 마법을 위한 주문....^^..................
      'react' : 'React',
      'react-dom' : 'ReactDOM'
    }
  }