import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  // Hooks ; email / setEmail
  const [password, setPassword] = useState("");
  // Hooks ; password / setPassword
  const onChange = (event) => {
    const {
      target: { name, value },
      // event내에서 내가 타겟한 부분 = name, value
      // 밑(input)에서 name 을 각각 지정해줬었음 그걸 사용
      // 밑(input)의 value = 키보드에서 입력한 값 = 빈칸에 입력한 값
    } = event;
    if (name === "email") {
      // name이 이메일이면 = 쓴 칸의 이름이 이메일이면
      setEmail(value); // state 인 email을 변경해라 (새로운 값을 줘라)
    } else if (name === "password") {
      // 쓴 칸의 이름이 비밀번호면
      setPassword(value); // state 인 password를 변경해라 (새로운 값을 줘라)
    }
  };
  // 기본적으로 알고 있어야 할 것 :
  // 내가 input을 변경할 때마다 onChagne function이 호출됨
  // + onChange function은 내가 인풋에 입력한 값들을 토대로 저장시킴 => value 를 통해서 !!
  // input.value를 통해서 빈칸에 쓴 값을 가져온다 -> state에 저장한다는 것이 중요함 ~ value !!!

  const onSubmit = (event) => {
    // event ; 무슨 일(=input이 변경)이 일어났는가 !
    event.preventDefault();
  };
  // onSubmit에서 한 것 :
  // 이게 없으면 ( = html만을 사용해서 form을 submit 하면 )
  // submit 버튼을 누르면 빈칸 안에 쓴 값이 사라짐 = 리액트의 코드 + state 가 사라짐
  // -> 이걸 막기 위해서 onSubmit = event.preventDefault(); 기본 default (사라지는 것)을 실행하지 않게 설정
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email} // 우리가 칸에 쓰는 거 ! ; 여기서 value를 얻는 거지
          onChange={onChange}
          // onchange 필수 ! ; 뭔갈 바꿀 때 이용
          // 값이 바뀔 때 마다 onChange를 씀 !
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange} // onchange 필수 !
        />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
