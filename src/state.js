export const newItems = [
  {
    id: '1',
    from: 'Trenton Spice',
    message: 'Develop BucketList',
  },
  {
    id: '2',
    from: 'Daniel Peach',
    message: 'Learn GraphQL',
  },
]

export const lists = [
  {
    name: 'School Stuff',
    items: [
      {
        from: 'Matt Thomas',
        message: 'Free movie on campus',
      },
    ],
  },
  {
    name: 'Personal List',
    items: [
      {
        message: 'Work on BucketList project',
      },
      {
        message: 'Adult Swim',
        link: 'https://adultswim.com/',
      },
    ],
  },
  {
    name: 'This weekend',
    items: [
      {
        from: 'Kate Harris',
        message: 'Rollerblading',
      },
      {
        from: 'John Daley',
        message: 'Sugar creek is great for fishing',
      },
      {
        from: 'Mark Anthony',
        message: 'Shooting range',
        link: 'https://shootpointblank.com/shoot-point-blank-greenwood-in/',
      },
    ],
  },
  {
    name: 'Test list',
    items: [],
  },
]

export const state = {
  // TODO: use a real flux pattern
  user: {
    uid: 'Y090y3m61IeJtLFgZ5qwOam0Xlb2',
    firstName: 'First',
    lastName: 'Last',
    email: 'firstlast@test.com',
    friends: [
      {
        uid: 'Y090y3m61IeJtLFgZ5qwOam0Xlc3',
        firstName: 'Trenton',
        lastName: 'Spice',
        email: 'yyy@yyy.com',
      },
      {
        uid: 'Y090y3m61IeJtLFgZ5qwOam0Xld4',
        firstName: 'Daniel',
        lastName: 'Peach',
        email: 'djpeach@test.com',
      },
      {
        uid: 'Y090y3m61IeJtLFgZ5qwOam0Xle5',
        firstName: 'Jayden',
        lastName: 'Thrasher',
        email: 'jaydent@test.com',
      },
      {
        uid: 'Y090y3m61IeJtLFgZ5qwOam0Xlf6',
        firstName: 'Steven',
        lastName: 'Camp',
        email: 'stacamp@test.com',
      },
      {
        uid: 'Y090y3m61IeJtLFgZ5qwOam0Xlg7',
        firstName: 'Nathalie',
        lastName: 'Kroeker',
        email: 'nathaliek@test.com',
      },
    ]
  },
}
