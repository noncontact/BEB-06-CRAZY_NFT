### 프로젝트 개요

- 커뮤니티에서 NFT를 도입을 대행하여 누구나 쉽게 NFT 발행을 자동화 할 수 있는 플랫폼 서비스 개발
- 프로젝트 기간에 개발을 할 수 있는 스택으로 개발 일정을 정함
- 기존 수행한 프로젝트를 최대한 이용하여 이번 프로젝트에 적용
- 현재 서비스를 진행하고 있는 플랫폼이 있으면 이를 참고로 개발(블록오디세이 - 개인 NFT 발행)
- 최대 4인이 팀을 구성하는 관계로 그에 맞는 작업 환경을 고려하여 프로젝트를 수행하도록 유도
- 프로젝트를 단계적으로 진행하면서 완성도를 높여나가는 방식으로 개발 진행

### 프로젝트 추진 배경 및 목적

- 현재 수 많은 커뮤니티와 동아리 단체가 존재.
- 커뮤니티 중에는 자신들만의 단체를 알리고 가치를 올리면서 회원수를 증가.
- 현재 커뮤니티 중에는 NFT 를 도입 하면서 특별한 이벤트를 많이 하고 있는 추세.
- 커뮤니티에서 NFT를 도입하려고 하지만 어려워하는 부분이 있어 이것을 대행하여 누구나 쉽게 NFT 발행을 자동화 할 수 있는 플랫폼 서비스가 필요
- 한가지 예로 NFT 이미지를 출력하는 POD(Print On Demand) 서비스를 제공하여 소속감을 주는 커뮤니티를 상징하는 의상을 착용하고 오프라인 모임 참석.
- 차후 가입하는 커뮤니티 가입수가 많아지면 광고 수익을 낼 수 있는 플랫폼으로 발전
- 필요하면 POD 서비스를 함으로써 수익 창출

### 플랫폼 모듈 구성

<img width="1000" alt="image" src="https://github.com/noncontact/BEB-06-CRAZY_NFT/assets/46256604/f2204beb-d22b-4afa-9dfa-ded474d83385">



### ****프로젝트 개발 설계****

**[필수 요구사항 분석]**

- 회원가입 및 로그인/로그아웃을 할 수 있다.
- 클럽 운영자는 클럽을 개설하고 운영을 위한 기능이 제공되어야 한다.(공지사항/ …… 4~5 가지)
- 회원은 게시글을 작성 또는 커뮤니티 활동(좋아요, 댓글 작성)을 하고 그에 대한 보상으로 토큰을 받을 수 있어야 한다.
- 클럽 운영자가 대량의 NFT이미지를 민팅 할 수 있는 서비스를 제공해야 한다. (NFT 이미지는 보유를 전제로 민팅)
- 대량의 NFT 발행시 등급을 나누어 발행을 할 수 있어야 한다.
- NFT 발행 후 회원은 보유한 토큰으로 NFT를 구매할 수 있다.
- 회원은 NFT를 구매시 보유한 토큰에 대해 등급에 맞는 NFT(4가지) 를 구매 할 수 있으며 자신이 구매한 NFT를 확인 할 수 있게 한다.
- 회원은 내가 보유한 NFT 를 볼 수 있어야 한다.
- 회원은 내가 보유한 토큰 잔량, 게시글 목록을 볼 수 있어야 한다.
- 회원은 타인의 게시글을 보고 좋아요/싫어요 그리고 댓글을 달 수 있어여야 한다.
- 회원은 본인이 메타마스크(카이카스)를 이용하여 생성한 계좌를 회원가입시 등록해야 한다.

[시스템 구성]

![Untitled](https://github.com/noncontact/BEB-06-CRAZY_NFT/assets/46256604/88a429ab-586b-41f9-b10e-9928228fafc8)


- 시스템은 Front와 Back 으로 개발을 하고 외부 연동으로 IPFS와 KLVM을 연동하였다.
- KLVM은 클레이튼에서 사용하는 가상머신이다.
- IPFS는 서버와 클라이언트 모두 사용한다.

[프론트 화면 구성]

![Untitled (1)](https://github.com/noncontact/BEB-06-CRAZY_NFT/assets/46256604/a30ad353-033f-41a9-b0b6-21999fe3052e)


[데이터베이스 구조]

![Untitled (2)](https://github.com/noncontact/BEB-06-CRAZY_NFT/assets/46256604/e79b9c38-6ae7-40cb-b5ac-21294242da50)


### **[필수 요구사항 분석]**

- 회원가입 및 로그인/로그아웃을 할 수 있다.
- 클럽 운영자는 클럽을 개설하고 운영을 위한 기능이 제공되어야 한다.(공지사항/ …… 4~5 가지)
- 회원은 게시글을 작성 또는 커뮤니티 활동(좋아요, 댓글 작성)을 하고 그에 대한 보상으로 토큰을 받을 수 있어야 한다.
- 클럽 운영자가 대량의 NFT이미지를 민팅 할 수 있는 서비스를 제공해야 한다. (NFT 이미지는 보유를 전제로 민팅)
- 대량의 NFT 발행시 등급을 나누어 발행을 할 수 있어야 한다.
- NFT 발행 후 회원은 보유한 토큰으로 NFT를 구매할 수 있다.
- 회원은 NFT를 구매시 보유한 토큰에 대해 등급에 맞는 NFT(4가지) 를 구매 할 수 있으며 자신이 구매한 NFT를 확인 할 수 있게 한다.
- 회원은 내가 보유한 NFT 를 볼 수 있어야 한다.
- 회원은 내가 보유한 토큰 잔량, 게시글 목록을 볼 수 있어야 한다.
- 회원은 타인의 게시글을 보고 좋아요/싫어요 그리고 댓글을 달 수 있어여야 한다.
- 회원은 본인이 메타마스크(카이카스)를 이용하여 생성한 계좌를 회원가입시 등록해야 한다.

### **[필수 요구사항 분석]**회원가입 및 로그인/로그아웃을 할 수 있다.

- 클럽 운영자는 클럽을 개설하고 운영을 위한 기능이 제공되어야 한다.(공지사항/ …… 4~5 가지)
- 회원은 게시글을 작성 또는 커뮤니티 활동(좋아요, 댓글 작성)을 하고 그에 대한 보상으로 토큰을 받을 수 있어야 한다.
- 클럽 운영자가 대량의 NFT이미지를 민팅 할 수 있는 서비스를 제공해야 한다. (NFT 이미지는 보유를 전제로 민팅)
- 대량의 NFT 발행시 등급을 나누어 발행을 할 수 있어야 한다.
- NFT 발행 후 회원은 보유한 토큰으로 NFT를 구매할 수 있다.
- 회원은 NFT를 구매시 보유한 토큰에 대해 등급에 맞는 NFT(4가지) 를 구매 할 수 있으며 자신이 구매한 NFT를 확인 할 수 있게 한다.
- 회원은 내가 보유한 NFT 를 볼 수 있어야 한다.
- 회원은 내가 보유한 토큰 잔량, 게시글 목록을 볼 수 있어야 한다.
- 회원은 타인의 게시글을 보고 좋아요/싫어요 그리고 댓글을 달 수 있어여야 한다.
- 회원은 본인이 메타마스크(카이카스)를 이용하여 생성한 계좌를 회원가입시 등록해야 한다.

[주요 기능별 flow]

![Untitled (3)](https://github.com/noncontact/BEB-06-CRAZY_NFT/assets/46256604/388e0e11-4709-4953-87de-dbbe3feb3ffd)


- 클라이언트에서 회원가입을 하면 무상으로 10 Klay를 지급한다.
- 클라이언트는 지급받은 klay로 내부 토큰을 서버에 전송할때 가스비로 사용할 수 있다.

![Untitled (4)](https://github.com/noncontact/BEB-06-CRAZY_NFT/assets/46256604/1d5ea671-5617-42ed-8f1d-0b28ebb65ede)


- 클라이언트에서 회원가입을 하면 무상으로 10 Klay를 지급한다.
- 클라이언트는 지급받은 klay로 내부 토큰을 서버에 전송할때 가스비로 사용할 수 있다.
- 클라이언트에서 회원가입을 하면 무상으로 10 Klay를 지급한다.
- 클라이언트는 지급받은 klay로 내부 토큰을 서버에 전송할때 가스비로 사용할 수 있다.

- 회원은 클럽활동으로 서버로 부터 보상으로 10토큰을 받는다.
- 그전에 서버는 시작시 내부 토큰을 발행한다.

![Untitled (5)](https://github.com/noncontact/BEB-06-CRAZY_NFT/assets/46256604/65f3c506-11fb-4b4a-9ffd-2939a46b8f49)


운영자는 서버로 Parts이미지를 전송한다.

- 서버는 수신된 Parts이미지를 로컬저장소에 저장하고 Hashlip-Art-Engin을 이용하여 NFT를 생성하는 Build작업을 한다.
- build된 NFT 이미지와 Json 파일을 IPFS 로 업로드 한다.
- 업로드되면 IPFS 로 부터 CID값을 받아 NFT Deploy한다.
- Deploy를 하면 생성되는 Contract Address를 데이터베이스에 저장한다.

![Untitled (6)](https://github.com/noncontact/BEB-06-CRAZY_NFT/assets/46256604/92bfc23c-aed2-439f-be5d-f586eab48b29)


- 회원은 클럽활동으로 인하여 보상으로 지급받은 내부 토큰이 100이상이 되면 NFT를 구매할 수 있다.
- 회원은 서버주소로 100토큰을 보내고 서버에게 NFT 구매(민팅)요청을 한다.
- 서버는 데이터베이스로 부터 해당 Club의 contrac address를 검색하고 KLVM Contract 에 연결하여 NFT 민팅을 한다.

[**프로젝트 개발 스택]**

- **Front-End**
    - React
    - Redux-Toolkit
    - redux-persist
    - styled-component
    - nft.storage
    - ant-design
    - Klay API caver-js
- **Back-End**
    - Node.js express
    - Klay API caver-js
    - nft.storage
    - mysql
    - sequelize
    - AWS EC2

### 3. 주요기능

**[Front-End]**

- 회원
    
    
    - 회원가입/로그인
        
        ![login_signup.GIF](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0af4e814-d91e-4f32-9a72-318c3a6666db/login_signup.gif)
        
        - 서버에게 회원가입요청을 하면 서버는 회원등록을 하고 회원에게 10Klay를 무상지급한다.
        - 회원가입을 하면 서버로 부터 서버계정 주소와 내부토큰 발행 토큰 주소(CA)를 수신받는다.
    - 클럽가입 요청
        
        ![subscription.GIF](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/285d4699-e9cf-4137-bf83-a38c77b5cfd7/subscription.gif)
        
        - 회원은 원하는 클럽에 들어가 가입요청을 할 수 있다.
        - 클럽 회원이 되면 클럽내에서 게시글을 작성하고 댓글을 작성할 수 있는 권한을 가진다.
    - 클럽 활동
        
        ![clubactivity2.GIF](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6115d50-c8e5-4013-bb59-dfbfc42627fd/clubactivity2.gif)
        
        - 클럽 회원이 되면 클럽내에서 게시글을 작성하고 댓글을 작성할 수 있다
        - 게시글과 댓글을 작성한 회원은 활동보상으로 서버로 부터 토큰 10JQS를 무상 지급받는다.
        - 게시글에 대해 좋아요를 달 수 있고 같은 게시글에 중복으로 좋아요를 하면 좋아요 숫자는 감하게 된다.
    - 클럽내 모든 NFT 정보 조회
        
        ![seeNFT.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/06633ad8-db93-4a4b-bb61-32b04e213666/seeNFT.gif)
        
        - 해당 클럽의 민팅된 NFT 전체 정보를 볼수 있다.
        - NFT 전체 정보 중 하나를 클릭하면 상세정보를 볼 수 있다.
    - NFT 구매
        
        ![userMint.GIF](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/018f2d2e-e8dd-4a3d-86a8-cb232f290760/userMint.gif)
        
        - 해당 클럽활동을 통하여 보상토큰으로 지급받은 토큰으로 NFT를 구매 할 수 있다.
        - NFT 구매 가격은 100JQS 로 책정하였으며 구매버튼을 누르면 자동으로 서버에게 토큰이 전송 된다.
        - 서버는 클라이언트에게 차례대로 NFT를 민팅한다.
    - MyPage
        
        ![mypage.GIF](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8bb5fff-4b60-42df-a420-c42d4ca4f331/mypage.gif)
        
        - 나의 상세정보를 볼 수 있다.
        - 나의 게시글 정보를 볼 수 있다.
        - 내가 가입한 클럽의 정보를 볼 수 있다.
        - 내가 소유한 NFT 정보를 볼 수 있다.
- 운영자
    - 클럽개설
        
        ![createClub.GIF](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a4f4e71d-2837-483b-80fa-bd4598ae5661/createClub.gif)
        
        - 회원은 원하는 클럽 개설을 위하여 title, 클럽 이미지를 설정하고 서버에 요청한다.
        - 클럽 개설이 되면 회원은 운영자 권한을 가지게 된다.
        - 운영자 권한은 NFT 발행과 클럽가입 희망자에 대한 관리를 할 수 있다.
    - 클럽가입 희망자 관리
        
        ![operator.GIF](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b265ad26-dd78-4622-a700-f3010218ecef/operator.gif)
        
        - 클럽 가입 희망을 원하는 회원의 리스트를 볼 수 있다.
        - 가입희망 회원에 대해 가입 처리를 할 수 있다.
    - NFT 발행 요청
        
        ![deploy.GIF](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/075d7b46-bc37-474e-8ebf-bee8d70b9898/deploy.gif)
        
        - 운영자는 클럽내의 NFT이미지를 발행하기 위하여 NFT 제작을 위한 Parts 이미지를 서버에 전송한다.
        - Parts이미지는 폴더에 담아 Layer순서대로 서버에 단계별로 전송한다.
        - Parts이미지가 서버에 전송이 끝나면 운영자는 서버에게 NFT 발행 요청을 할 수 있다.
        - NFT 발행요청을 위해 NFT 이름, Symbol, 설명, 가격, 발행량 정보를 서버에 전송한다.
        - 하나의 클럽내에서는 한번만 발행이 가능하다.

**[Back-End]**

- Sequelize DB
    - 서버에서는 mySQL 을 사용했다.
    - DB Query 작업을 직접 쿼리문을 사용해도 되지만 이전에 관련하여 작업을 한 경헙이 있지만 Sequelize를 사용하여 개발을 하는 방법으로 이번 프로젝트에서는 진행하기로 했다.
    - Sequelize 를 사용하면 javascript 문법으로 쉽게 SQL 쿼리문을 대신하여 사용할 수 있는 장점이 있다.
- Parts 이미지 수신
    - 서버는 클라이언트로 부터 단계별로 Parts이미지가 담긴 Layer 폴더를 차례대로 보내면 서버는 차례대로 받아서 로컬 저장소에 Layer 폴더에 번호대로 저장한다.
    - 현재 Part이미지 Layer 단계는 5단계가 최대이다.
- Hashlip-Art-Engin(이하 HAE) 을 이용한 NFT 이미지 Build
    - Parts이미지를 수신 받으면 이제는 Parts임지를 조합하여 NFT이미지를 만드는 작업을해야 한다.
    - 그 작업을 도와주는 모듈이 HAE이다. HAE는 Parts 이미지의 위치를 연결시켜주면 발행량에 따라 유니크한 NFT이미지를 랜덤으로 생성하도록 도와준다.
    - NFT 이미지가 Build되면 image 폴더와 메타데이터가 담긴 json폴더가 생성된다.
    - 이전에는 IPFS를 클라이언트에서 처리하려 하였으나 폴더를 통째로 옮기는 부분에 대해서는 fs 모듈을 사용해야 하는데 react에서는 모듈을 지원하는게 원할 하지 않아 서버에서는 처리하기로 했다.
    - 보통 ipfs-api 모듈을 사용하나 폴더를 통째로 업로드하는 방식은 nft.stroage를 사용하는 것이 용이하여 nft.storage 모듈을 사용하였다.
    - 우선 이미지를 IPFS로 nft.storage 를 사용하여 업로드하면 CID값을 받아오면 그 값을 metadata json 파일내의 각각의 메타정보중 이미지 url 정보에 수신된 CID값을 적용한다.
    - 그리고 적용된 metadata json 파일을 nft.storage 를 사용하여 IPFS에 업로드한다.
- KIP-7 토큰 발행 및 전송
    - 서버는 시작됨과 동시에 현재 서버계정의 지갑에 KIP-7 토큰이 없으면 발행을해야 한다.
    - Klaytn에서는 caver-js 모듈을 사용하여 KIP-7 토큰을 발행할 수 있다
    - 클라이언트에서 클럽활동으로 게시글 작성이나 댓글 작성시 보상토큰을 지급해 주어야 한다.
- NFT 발행
    - Klaytn 에서 발행하는 토큰은 KIP-17이다.
    - 이더라움계열에서는 smart contract 하기 위해 web3.js 모듈을 사용한것 처럼 Klaytn에서는 caver-js 모듈을 사용하면 된다.
    - klay.caver.KIP17.deploy 를 사용하여 NFT를 발행하면 contract address가 생성되고 이정보는 각각 클럽에 대해 발행을하기 때문에 DB에 저장을 해야 한다.
- NFT 민팅
    - 회원은 자신의 보상토큰이 100토큰 이상이면 NFT를 구매할 수 있는 자격이 되어 서버로 NFT구매 요청을 한다.
    - 서버는 NFT구매 요청을 받으면 클라이언트에서 서버주소로 100토큰을 보냈는지 확인을 위하여 tx_hash를 조사한다.
    - 클라이언트에서 보낸게 확인이 되면 해당 클라이언트 계정으로 NFT를 민팅한다.

### 4. 팀원 소개

- 임형대 (팀장)
    - 포지션(프론트엔드/백엔드)
    - 개인 깃허브 링크, 블로그 등
    - 활용한 스택
        - React
        - Node.js express
        - Klay API
        - sequelize mySQL
        - net.storage
    - 구현한 주요 기능 (역할)
        - Mypage 화면구성
        - DB 테이블 작성
        - DB CRUD 기능
        
- 조은석
    - 포지션(프론트엔드)
    - 개인 깃허브 링크, 블로그 등
    - 활용한 스택
        - React
        - Redux-Toolkit
        - redux-persist
        - styled-component
        - nft.storage
        - ant-design
        - Klay API caver-js
    - 구현한 주요 기능(역할)
        - NFT 민팅
            - Klay API caver-js를 활용해 KaiKas지갑으로 토큰을 서버계정으로 100토큰 전송
            - tx_hash 받아서 서버에 정상적으로 토큰을 지불한것을 증명하여 nft를 민팅받는다
        - 로그인/회원가입
            - 로그인/회원가입 시 사용자의 정보와 로그인 유무, 서버와 컨트랙트 주소를 redux state에 담는다.
            - redux-persist를 통해 새로고침 시에 redux state값을 잃지 않는다.
        - NFT 발행 페이지
            - 각각의 파트 파일들을 form/data로 받아 서버에 보내준 뒤 파츠 작업이 끝나면 nft의 메타정보를 넘겨준다.
        - 클럽내의 민팅된 모든 NFT 전체보기 페이지
            - 서버에서 보내준 각각의 CID와 NFTID를 조합시겨 주소를 만든 뒤, 이를 axios로 NFT정보를 받아와 NFT를 보여준다.
        - 클럽 메인 페이지
            - 현재 클럽의 정보(ex 카테고리,클럽이름,클럽id등)을 redux-toolkit과 persist로 관리한다.
        - 게시글 보기 페이지
            - 좋아요를 눌러 좋아요 수를 변화시키고, 댓글을 작성할수 있다.
        - 기타 기능 밑 api통신 작업
            - main,user,club,nft
        - 웹디자인
            - .메인 페이지
            - 클럽 메인 페이지
            - 게시글 보기 페이지
            - 게시글 작성 페이지
            - NFT 발행 페이지
            - 클럽내의 민팅된 모든 NFT 전체보기 페이지
        
- 이재명
