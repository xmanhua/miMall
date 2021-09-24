import Mock from 'mockjs'

Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
})

// 生成 10 个 随机手机号码
// let { phone } = Mock.mock({
//   'phone|1-10': ['@phone']
// })
// console.log(phone);

Mock.mock('/api/user/login', {
    "status": 0,
    "data": {
      "id|1-10": 0, //随机生成1-10的id
      "username": "@name",//随机生成name,@cname是中文名,
      "email": "@email",//随机生成email
      'phone': "@phone",//随机生成 1 个 随机手机号码
      "role": 0,
      "createTime": 1479048325000,
      "updateTime": 1479048325000
    }  
});
//mockjs语法：https://github.com/nuysoft/Mock/wiki/Getting-Started