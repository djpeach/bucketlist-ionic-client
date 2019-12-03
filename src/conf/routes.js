export default {
  index: '/',
  home: '/home',
  more: '/more',
  buckets: {
    create: '/buckets/new',
    list: '/buckets',
    detail: '/buckets/:id',
    delete: '/buckets/delete',
  },
  drops: {
    create: '/drops/new',
    detail: '/drops/:id',
    delete: '/drops/delete',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  friends: {
    list: '/friends/list'
  },
  addFriend: '/friends/new',
}

export const routeWithParams = (route, ...params) => {
  const re = /(?:\/):\w+/g
  let i = 0
  let match
  while ((match = re.exec(route)) != null) {
    route = route.replace(match[0], `/${params[i]}`)
    i++
  }
  return route
}
