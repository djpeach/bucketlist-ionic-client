import UserAccessors from './accessors/User'
import UserMutators from './mutators/User'
import ListAccessors from './accessors/List'
import ListMutators from './mutators/List'
import ItemAccessors from './accessors/Item'
import ItemMutators from './mutators/Item'
import FriendRequestAccessors from './accessors/FriendRequest'
import FriendRequestMutators from './mutators/FriendRequest'

export default {
  ...UserAccessors,
  ...UserMutators,
  ...ListAccessors,
  ...ListMutators,
  ...ItemAccessors,
  ...ItemMutators,
  ...FriendRequestAccessors,
  ...FriendRequestMutators,
}