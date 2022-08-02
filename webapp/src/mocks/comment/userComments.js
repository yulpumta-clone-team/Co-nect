export const userComment = {
  id: 999,
  img: '',
  userId: 12512512,
  writer: '수정된',
  parentId: null,
  secret: true,
  content: '수정된 연습용 댓긇',
  feeling: [901092146501, 92719182999999, 927191821029312],
  replies: [
    {
      id: 10,
      img: '',
      userId: 12512512,
      writer: 'front_temp',
      parentId: 999,
      secret: true,
      content: '연습용',
      feeling: [901092146501],
    },
    {
      id: 12,
      img: '',
      userId: 12512512,
      writer: 'string',
      parentId: 999,
      secret: true,
      content: '수정된',
      feeling: [784833333333, 19148710],
    },
  ],
};

export const userComments = [
  {
    id: 1,
    img: '',
    userId: 123123,
    writer: 'front_temp',
    parentId: null,
    secret: true,
    content: '연습용 댓글입니다.',
    feeling: [901092146501, 92719182999999, 927191821029312],
    replies: [
      {
        id: 10,
        img: '',
        userId: 123123,
        writer: 'front_temp',
        parentId: 1,
        secret: true,
        content: 'string',
        feeling: [901092146501],
      },
      {
        id: 11,
        img: '',
        userId: 123123,
        writer: 'string',
        parentId: 1,
        secret: false,
        content: 'string',
        feeling: [11456666],
      },
      {
        id: 12,
        img: '',
        userId: 123123,
        writer: 'string',
        parentId: 1,
        secret: false,
        content: 'string',
        feeling: [784833333333, 19148710],
      },
    ],
  },
  {
    id: 2,
    img: '',
    userId: 123123,
    writer: 'back',
    parentId: null,
    secret: false,
    content: '연습용 댓글입니다.',
    feeling: [902092246502, 92729282999999, 927292822029322],
    replies: [
      {
        id: 20777777,
        img: '',
        userId: 123123,
        writer: 'back',
        parentId: 2,
        secret: false,
        content: 'string',
        feeling: [902092246502],
      },
      {
        id: 21616161,
        img: '',
        userId: 123123,
        writer: 'string',
        parentId: 2,
        secret: false,
        content: 'string',
        feeling: [22456666],
      },
      {
        id: 2152,
        img: '',
        userId: 123123,
        writer: 'asdfasdf123123',
        parentId: 2,
        secret: false,
        content: 'string',
        feeling: [784833333333, 29248710],
      },
    ],
  },
  {
    id: 3,
    img: '',
    userId: 123123,
    writer: 'back',
    parentId: null,
    secret: false,
    content: '연습용 댓글입니다.',
    feeling: [903092346503, 92739382999999, 927393823029332],
    replies: [
      {
        id: 30151235,
        img: '',
        userId: 123123,
        writer: 'front_temp',
        parentId: 3,
        secret: false,
        content: 'string',
        feeling: [903092346503],
      },
      {
        id: 311231231,
        img: '',
        userId: 123123,
        writer: 'string',
        parentId: 3,
        secret: false,
        content: 'string',
        feeling: [33456666],
      },
      {
        id: 3212341234,
        img: '',
        userId: 123123,
        writer: 'string',
        parentId: 3,
        secret: false,
        content: 'string',
        feeling: [784833333333, 39348730],
      },
    ],
  },
];
