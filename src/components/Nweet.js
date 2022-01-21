import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  // Nweet component는 두개의 state 를 가짐 ; editing ( 수정을 하고 있는 지 아닌 지를 설정) / NewNweet ( 글 문구 작성 )
  // editing 이 true 면 NewNweet를 작성함

  const [editing, setEditing] = useState(false); //  editing 모드냐 아니냐 보기 위한
  const [newNweet, setNewNweet] = useState(nweetObj.text); // 수정을 위한 텍스트를 위한 변수

  // 함수 생성 ! 삭제 버튼 onclick 했을 때 이거 실행되게 해주기 ! > onClick={onDeleteClick}
  const onDeleteClick = async () => {
    const ok = window.confirm("글 진짜 삭제 할거야 ?"); // user 확인 하고 진짜 삭제할 건지 물어봄
    if (ok) {
      // ok면 트윗 삭제
      dbService.doc(`nweets/${nweetObj.id}`).delete(); // dbService.doc 실행
      // collection 안에 document 가 있음 > doc 안에 collection(nweets)를 써줌
      // + 아이디 지정(그 버튼이 지정하는 id를 가진 글이 삭제가 되어야하니까) = 삭제를 해주는 데 이 아이디를 가진 글을 삭제해줘
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet);
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      // 위와 설명 동일
      text: newNweet, // 이제 최종 업데이트 !
    });
    setEditing(false);
  };
  const onChange = (event) => {
    // 이거 없으면 수정 버튼 눌러도 빈칸에 작성이 안됌 -> 수정을 위한 빈칸에 작성하려면 이게 있어야함
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? ( // 수정하고 있으면 보여줄 form
        <>
          {isOwner && ( // 주인이면 (글 작성자면) 버튼을 볼 수 있음
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="트윗 수정"
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="수정 완료" />
              </form>
              <button onClick={toggleEditing}>수 정 취 소</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭 제</button>
              <button onClick={toggleEditing}>수 정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
