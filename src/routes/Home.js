import { useEffect, useState } from "react";
import React from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); // form 을 위한 state
  // submit 할 때 dbService.collection("nweets")
  // 어떤 collection에 내 데이터를 저장할 지 지정하는 건 매우 중요함 nweet 뿐만 아니라 photo video등 다른 여러 콜렉션들이 필요할 수도 있으니까
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        // onSnapshot ; 무슨 일(글 지우기, 업데이트, 수정 등)이 있을 때 알림 받기 위함
        // 새로운 스냅샷 받을 때 배열 만듦
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // 배열 마다 있는 정보 = id, data()
        })); // 트윗들 리스트들
        setNweets(nweetArray);
      });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      // 트위터 작성할 때 data.now + userId 까지 추가
    });
    setNweet("");
    // add ; 명시된 데이터를 담은 새로운 documents를 collection에 추가 + id는 자동
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="글을 입력하세요"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(
          // map을 통해 각각의 nweet를 Component로 생성
          (nweet) => (
            <Nweet // Nweet 컴포넌트는 nweetObj 와 isOwner 를 가짐
              key={nweet.id}
              nweetObj={nweet} // nweetObj : nweet의 모든 데이터
              isOwner={nweet.creatorId === userObj.uid}
              // isOwner : 로그인한 사람 = 글작성자냐 아니냐
              // userObj.uid 랑 nweet을 만든 사람(nweet.cretorId)랑 같냐 같으면 true
              /*userObj 는 그럼 어디서 나와 ? Home의 props 에서 나옴 -> 
              Home의 props는 router.js로 받음 -> router는 App.js에 의해서 같은 userObj.prop을 받음*/
            />
          )
        )}
      </div>
    </div>
  );
};
export default Home;
