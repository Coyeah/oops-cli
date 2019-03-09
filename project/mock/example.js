// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const productData = function() {
  let Data = [];
  for (let i = 0; i < 100; i++) {
    let data = {
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date()  // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
    }
    Data.push(data)
  }

  return {
    Data: Data
  }
}

// Mock.mock( url, post/get , 返回的数据)；

Mock.mock(/api\/example/, 'get', productData);
