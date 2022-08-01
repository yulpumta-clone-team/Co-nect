처리 순서

1. 댓글 store 만들기
2. mock data로 연결

- api action 분리하지 않고 진행

3. 댓글 crud
4. reply crud 구현
5. 기존 로직 삭제

> 작업하면서 아래 내용은 수정할 계획입니다.

# 현재 문제점

1. redux store에서 유저와 팀 객체의 depth가 깊다.

```javascript
"user(team)": {
    "team_id": 88888888,
    "team_name": "코넥트팀",
    "name": "코넥트",
    // 생략
    "comments": [
      {
        "id": "1",
        "parent_id": "1",
        "writter_id": 140192931,
        "nickname": "front_temp",
        "users_like": [901092146501, 92719182999999],
        // 생략
         "replies": []
      }
    ]
}
```

2. 포함하는 상태가 많다보니 발생하는 문제가 많았다.

- user(team) action에서 관리하는 함수가 많다.
- 댓글 관련 action은 같은 로직인데 store가 달라서 통합하지 못하고 user와 team에서 각각 사용하고 있다.

# 원하는 방향

> comment store를 분리해 위의 문제점들을 해결

1. redux store에서 유저와 팀 객체에서 comment를 분리해서 각각의 depth가 얕아짐.

```javascript
"user(team)": {
    "team_id": 88888888,
    "team_name": "코넥트팀",
    "name": "코넥트",
}
// comment store분리
"comments": [
  {
    "id": "1",
    "parent_id": "1",
    "writter_id": 140192931,
    "nickname": "front_temp",
    "users_like": [901092146501, 92719182999999],
    // 생략
      "replies": []
  }
]
```

2. comment관련 action을 user와 team에서 분리해 반복할 필요가 없다.
