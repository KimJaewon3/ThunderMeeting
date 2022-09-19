# ThunderMeeting
![image](https://user-images.githubusercontent.com/79837001/182592072-4b6afe80-4047-4113-9d8d-8f25d3db377b.png)
- 원하는 장소, 시간에 약속을 잡을 수 있게 도와주는 플랫폼입니다.
<br/>

## 배포 링크
https://thundermeeting.net/
<br/>
<br/>

## 실행 방법
```npm start```
<br/>
<br/>

## 기능
- ### 메뉴
    ```
        1. 메뉴를 통해 원하는 페이지로 이동할 수 있습니다
        2. 로그인 및 회원가입을 진행할 수 있습니다.
        3. 로그인시 사이드 바가 활성화 됩니다.
        4. 상태 메세지를 작성할 수 있습니다.
        5. 로그아웃할 수 있습니다.
    ```
  <details>
   <summary>기능 시연</summary>
     <img src='https://user-images.githubusercontent.com/79837001/190994469-6ec8133e-b59d-4b69-bc14-b26ddfe408d5.gif'/>
  </details>    
    <br/>


- ### 약속 잡기 페이지
  - #### 지도
    ```
        1. 내 위치 바로가기를 통해 자신의 현재 위치로 지도를 이동할 수 있습니다.
        2. 현재 보이는 지도에 모집글이 마커로 표시되고 클릭하여 상세정보를 확인할 수 있습니다.
        3. 입장하기 버튼을 통해 방으로 입장할 수 있습니다.
    ```
  - #### 방 생성하기
    ```
        1. 제목, 간단한 소개글, 위치, 날짜, 시간을 정해 방을 생성할 수 있습니다.
        2. 지도에서 원하는 위치를 클릭하면 주소가 자동으로 입력됩니다.
        3. 모달을 통해 시간을 선택할 수 있습니다.
    ```
  - #### 방 목록
    ```
        1. 현재 보이는 지도 내의 방 목록을 나열해줍니다.
        2. 모집 정보가 표시되며 클릭하여 방으로 입장할 수 있습니다.
    ```
  <details>
   <summary>기능 시연</summary>
      <img src='https://user-images.githubusercontent.com/79837001/190994460-19f1e7fe-9c3a-4a02-9f04-8bdfc1a76481.gif'/>
  </details>    
<br/>

- ### 방 페이지

    - #### 맴버 정보 확인하기
    ```
        1. 방에 참여 중인 맴버들의 정보를 확인할 수 있습니다.
    ```
    - #### 채팅
    ```
        1. 맴버들과 채팅할 수 잇습니다.
    ```
    - #### 약속 잡기
    ```
        1. 방장이라면 약속 잡기 버튼을 통해 약속 확정을 할 수 있습니다.
        2. 확정시 약속 목록 리스트에 추가 됩니다.
    ```
  <details>
   <summary>기능 시연</summary>
      <img src='https://user-images.githubusercontent.com/79837001/190994447-171762db-c16a-429a-a6bb-b7225aaa313f.gif'/>
  </details>    
<br/>

- ### 약속 확인 페이지
    ```
        1. 참여중인 방과 확정된 약속들의 목록을 확인할 수 있습니다.
        2. 클릭을 통해 해당 방으로 바로 이동할 수 있습니다.
    ```
  <details>
   <summary>기능 시연</summary>
     <img src='https://user-images.githubusercontent.com/79837001/190995792-27ed0db0-285f-4cfb-a2c0-758c8ec2e8eb.gif'/>
  </details>    
    <br/>


- ### 마이 페이지
    ```
    1. 개인 정보 확인 및 수정할 수 있습니다.
    2. 프로필 사진을 수정할 수 있습니다.
    ```
  <details>
   <summary>기능 시연</summary>
        <img src='https://user-images.githubusercontent.com/79837001/190994422-23037f8e-e432-4957-b28b-5a8ae2c13cbe.gif'/>
  </details>    
<br/>



 
<br/>

## 사용 스택
### Front-End
`TypeScript`
`React`
`Redux`
`Styled-Components`
`socket-io-client`

### Back-End
`Node JS`
`Express`
`socket-io`
`MYSQL`
`Sequelize ORM`
`JWT`
`AWS(RDS)`

### Deploy
- AWS  
`EC2`
`S3`
`Route 53`
`CloudFront`

### API
`kakaomap API`

 
<br/>

## dev log
[블로그 링크](https://pinnate-tortoise-471.notion.site/ThunderMeeting-016aa98e2e684fd8a6aeb12539a8f7fa)
