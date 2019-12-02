export default {
  index: '/',
  home: '/home',
  more: '/more',
  lists: {
    create: '/lists/new',
    list: '/lists',
    detail: '/lists/:id',
    delete: '/lists/delete',
  },
  suggestions: {
    create: '/suggestions/new',
    list: '/suggestions',
    detail: '/suggestions/:id',
    delete: '/suggestions/delete',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  addFriend: '/friends/new',
}

export const routeWithParams = (route, ...params) => {
  const re = /(?<=\/):\w+/g
  let i = 0
  let match
  while ((match = re.exec(route)) != null) {
    route = route.replace(match[0], params[i])
    i++
  }
  return route
}
