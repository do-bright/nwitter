import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  // 애플리케이션은 세개의 State를 가짐 init, isLoggedIn, userObj
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 판별 못함 (firebase 아직 시작 x)
  const [userObj, setUserObj] = useState(null); //사용자
  // 사용자는 가장 상위의 곳(애플리케이션의 가장 윗부분)에 있는게 좋음
  // w ? 사용자는 여러 페이지에서 사용할 확률이 크니까 ex) home, edit profile
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 여기서 로그인 여부 판별함 (firebase 사용)
      // 로그인, 로그아웃 할 때 + 애플리케이션 초기화 할 때 일어남 > 이걸로 firebase는 내 로그인 여부 알게됌

      if (user) {
        // 유저가 있어야 로그인
        //setIsLoggedIn(true); // 로그인 했다
        setUserObj(user); // 로그인 했으니까 유저 정보 setUserObj
      } else {
        setIsLoggedIn(false);
      }

      setInit(true); //Init 항상 true w? 언제든 onAuthStateChanged 가 실행돼야하기 때문
      // 애플리케이션이 시작하고 준비되면 setInit(true)
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        // boolean으로 바로 처리 userObj가 있으면 true -> 로그인 처리
        //<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> // 위에 변수 지정한 걸 파라미터로
        "초기화 중 ...."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

// 이제 라우터(Router.js)로 가면 됌 라우터 ; 스크린에 뿌려주는 거 !!!
export default App;
