import { useState } from "react";
import { APIURL } from "../App";

export default function ModifyPw() {
  const [ textInput, setTextInput ] = useState({
    oldPw: '',
    newPw: '',
    verifyNewPw: '',
  });
  
  function handleTextInput(target: string, e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  async function handleClickModify() {
    //await APIURL.post()
  }

  function handleClickCancel() {
    
  }

  return (
    <div>
      <div>
        <div>
          <p>기존 비밀번호</p>
          <input onChange={(e)=>handleTextInput('oldPw', e)}></input>
        </div>

        <div>
          <p>새 비밀번호</p>
          <input onChange={(e)=>handleTextInput('newPw', e)}></input>
        </div>

        <div>
          <p>새 비밀번호 확인</p>
          <input onChange={(e)=>handleTextInput('verifyNewPw', e)}></input>
        </div>
      </div>

      <div>
        <button>변경하기</button>
        <button>취소</button>
      </div>
    </div>
    
  );
}