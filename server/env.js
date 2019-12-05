const urlList={
    development:'http://10.1.1.200:8090',
    testing:'http://10.1.1.61:8090',
    prepare:'https://pre.citex.io',
    production:'https://www.citex.co.kr',
  };
  
  const URL = urlList[process.env.NODE_ENV];
  module.exports = URL