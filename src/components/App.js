import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인 여부 판별 못함 (firebase 아직 시작 x)
  const [userObj, setUserObj] = useState(null); //사용자
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 여기서 로그인 여부 판별함 (firebase 사용)
      if (user) {
        setIsLoggedIn(true); // 로그인 했다
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "초기화 중 ...."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
