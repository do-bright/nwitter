import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); //  editing 모드냐 아니냐 보기 위한
  const [newNweet, setNewNweet] = useState(nweetObj.text); // 수정을 위한 텍스트를 위한 변수
  const onDeleteClick = async () => {
    // 함수 생성 ! 삭제 버튼 onclick 했을 때 이거 실행되게 해주기 ! > onClick={onDeleteClick}
    const ok = window.confirm("글 진짜 삭제 할거야 ?");
    if (ok) {
      // 트윗 삭제
      dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet);
    await dbService.doc(`nweets/${nweetObj.id}`).update({
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
      {editing ? (
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
