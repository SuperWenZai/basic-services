exports.routes = [
  // base接口 开始
  {
    url: '/base/user',
    systemName: 'base',
    interfaceName: 'user',
    method: 'GET'
  },
  {
    url: '/base/register',
    systemName: 'base',
    interfaceName: 'register',
    method: 'POST'
  },
  {
    url: '/base/info',
    systemName: 'base',
    interfaceName: 'info',
    method: 'GET'
  },
  // base接口 结束

  // product接口 开始
  {
    url: '/product/getProductMenu',
    systemName: 'product',
    interfaceName: 'getProductMenu',
    method: 'GET'
  },
  // product接口 结束
]