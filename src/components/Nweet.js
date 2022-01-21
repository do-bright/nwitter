import React from "react";

const Nweet = ({ nweetObj, isOwner }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
      <>
        <button>삭 제</button>
        <button>수 정</button>
      </>
    )}
  </div>
);

export default Nweet;
