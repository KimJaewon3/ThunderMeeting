import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { emailReg, nameReg, nickReg, phoneReg } from "../api/inputValueReg";
import { APIURL } from "../App";
import { StyledCommonButton, StyledInput } from "../App.style";
import ProfileImage from "../component/profileImage";
import { RootState } from "../modules";
import { isSignIn } from "../modules/sign";
import { updateAccessToken } from "../modules/token";
import { deleteUserInfo, updateUserInfo } from "../modules/userInfo";

const StyledMypage = styled.div`
  display: flex;
  > div {
    margin: 20px;
    flex: 1;
  }
  .userinfo-content {
    display: flex;
    align-items: baseline;
    margin-bottom: 50px;
    > :first-child {
      width: 7em;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .mypage-btn-container {
    display: flex;
  }
`;

type TextInput = {
  [key: string]: string;
}

// 수정 불가능 목록 : email sex like 
// 수정 가능 목록 : mbti name nick phone
// 별도 수정 : password

export default function Mypage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  const accessToken = useSelector((state: RootState) => state.tokenReducer.accessToken);
  const [ isModify, setIsModify ] = useState(false);
  const [ verifyAlert, setVerifyAlert ] = useState('');
  const initialTextInput = {
    name: '',
    nick: '',
    mbti: '',
    phone: '',
    sangme: '',
  };
  const [ textInput, setTextInput ] = useState<TextInput>(initialTextInput);

  useEffect(() => {
    setVerifyAlert(verifyInputValue());
  }, [textInput]);

  function verifyInputValue() {
    if (!(nameReg.test(textInput.name))) return '올바른 이름을 입력해주세요';
    if (!(nickReg.test(textInput.nick))) return '올바른 닉네임을 입력해주세요';
    if (!(phoneReg.test(textInput.phone))) return '올바른 번호를 입력해주세요';
    
    return '';
  }

  function handleTextInput(target: string, e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function handleModifyInfo() {
    if (!isModify) {
      setTextInput({
        name: userInfo.name,
        nick: userInfo.nick,
        mbti: userInfo.mbti,
        phone: userInfo.phone,
        sangme: userInfo.sangme,
      });

      setIsModify(!isModify);
    }
  }

  function modifiableInfo(el: string) {
    if (el === 'email' || el === 'sex' || el === 'like') {
      return <div>{userInfo[el]}</div>;
    }

    if (isModify) {
      return <StyledInput onChange={(e)=>handleTextInput(el, e)} value={textInput[el]}/>;
    } else {
      return <div>{userInfo[el]}</div>;
    }
  }

  async function handleSaveInfo() {
    // update
    await APIURL.patch("/account/modifyInfo", {
      id: userInfo.id,
      ...textInput,
    }, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      }
    })
    .then(res => {
      console.log(res.data.data)
      const data = res.data.data;
      // bug
      dispatch(updateUserInfo(data));
      // handleModifyInfo();
      setIsModify(false);
      // token 추가
    })
    .catch(err => {
      alert(err.response.data.message);
      if (err.response.data.data === 'access-token-error') {
        dispatch(updateAccessToken(''));
        dispatch(isSignIn(false));
        dispatch(deleteUserInfo());
        nav('/')
      }
    });
  }

  function handleClickCancel() {
    setIsModify(false);
    setTextInput(initialTextInput);
  }

  return (
    <StyledMypage>
      <div className="mypage-userinfo">
        <div>
          {Object.keys(userInfo).map((el, idx) => {
            if (el === 'id') return;
            return (
              <div key={idx} className='userinfo-content'>
                <div>{el}</div>
                {modifiableInfo(el)}
              </div>
            );
          })}
        </div>

        <p>{verifyAlert}</p>

        <div className="mypage-btn-container">
          {isModify ? (
            <div>
              <StyledCommonButton onClick={handleSaveInfo} disabled={verifyAlert !== ''}>수정 완료</StyledCommonButton>
              <StyledCommonButton onClick={handleClickCancel}>취소</StyledCommonButton>
            </div>
          ) : (
            <StyledCommonButton onClick={handleModifyInfo}>정보 수정</StyledCommonButton>
          )}
          <StyledCommonButton onClick={()=>{nav('/modifyPw')}}>비밀번호 변경</StyledCommonButton>
        </div>
      </div>

      <div>
        <ProfileImage />
      </div>
    </StyledMypage>
  );
}
