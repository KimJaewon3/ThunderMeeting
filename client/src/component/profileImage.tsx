import { S3Client, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand,  } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { useEffect, useState } from "react";
import { APIURL } from "../App";
import { deleteUserInfo, updateProfileImage } from "../modules/userInfo";
import styled from "styled-components";
import loading from "../images/loading.jpg";
import { StyledCommonButton, StyledProfileImgBox } from "../App.style";
import { updateAccessToken } from "../modules/token";
import { isSignIn } from "../modules/sign";
import { useNavigate } from "react-router-dom";

const StyledProfileImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .profileImg-button-container {
    display: flex;
    margin-top: 2em;
    .submit-revoke-btn-container {
      display: flex;
      div {
        margin-left: 1em;
      }
      div:hover {
        color: #03838f;
      }
    }
  }
`;

const s3Config = {
  bucketName: String(process.env.REACT_APP_AWS_BUCKET),
  region: String(process.env.REACT_APP_AWS_DEFAULT_REGION),
  poolId: String(process.env.REACT_APP_AWS_IDENTITY_POOL_ID),
  // accessKeyId: String(process.env.REACT_APP_AWS_ACCESS_KEY_ID),
  // secretAccessKey: String(process.env.REACT_APP_AWS_SECRET_ACCESS_KEY),
};

const s3 = new S3Client({
  region: s3Config.region,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: s3Config.region }),
    identityPoolId: s3Config.poolId,
  }),
});

type PreviewImgType = {
  file: any;
  url: string;
}

export default function ProfileImage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [ isModify, setIsModify ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ previewImg, setPreviewImg ] = useState<PreviewImgType>({ file: null, url: '' });
  const [ alertText, setAlertText ] = useState('');
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  const accessToken = useSelector((state: RootState) => state.tokenReducer.accessToken);

  function choiceImg() {
    URL.revokeObjectURL(previewImg.url);

    const input = document.createElement('input');
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewImg({ file, url });
      setIsModify(true);
    }
  }

  async function submitImg() {
    if (!previewImg.file) {
      return setAlertText('이미지를 선택해주세요.');
    }

    setIsLoading(true);
    const album = await s3.send(
      new ListObjectsCommand({
        Prefix: `${userInfo.email}/`,
        Bucket: s3Config.bucketName,
      })
    );

    if (!album.Contents) {
      // 폴더 없으면 생성
      await s3.send(new PutObjectCommand({
        Bucket: s3Config.bucketName,
        Key: `${userInfo.email}/`,
      }));
    } else {
      // 있으면 기존 폴더 내용 지우기
      for (let i = 1; i < album.Contents.length; i++) {
        await s3.send(new DeleteObjectCommand({
          Bucket: s3Config.bucketName,
          Key: album.Contents[i].Key,
        }));
      } 
    }

    // 이미지 업로드
    const path = `${userInfo.email}/${previewImg.file.name}`;
    const upload = await s3.send(new PutObjectCommand({
      Body: previewImg.file,
      Bucket: s3Config.bucketName,
      Key: path,
    }));

    const url = `https://${s3Config.bucketName}.s3.amazonaws.com/${path}`;
    // db저장
    APIURL.patch('account/profileImg', { url }, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      }
    }).then(res => {
      setIsLoading(false);
      dispatch(updateProfileImage(url));
      revokeChangeImg();
    }).catch(err => {
      alert(err.response.data.message);
      if (err.response.data.data === 'access-token-error') {
        dispatch(updateAccessToken(''));
        dispatch(isSignIn(false));
        dispatch(deleteUserInfo());
        nav('/');
      }
    });
  }

  function revokeChangeImg() {
    URL.revokeObjectURL(previewImg.url);
    setPreviewImg({
      file: null,
      url: '',
    });
    setIsModify(false);
  }

  return (
    <StyledProfileImgContainer>
      <StyledProfileImgBox size="250px">
        {isLoading ? (
          <img src={loading}/>
        ) : (
          isModify ? (
            <img src={previewImg.url}/>
          ) : (
            <img src={userInfo.profileImage}/>
          )
        )}
      </StyledProfileImgBox>
      
      <div className="profileImg-button-container">
        <StyledCommonButton onClick={choiceImg}>이미지 선택</StyledCommonButton>
        {isModify && (
          <div className="submit-revoke-btn-container">
            <div onClick={submitImg}>변경</div>
            <div onClick={revokeChangeImg}>취소</div>
          </div>
        )}
      </div>
      <div>
        {alertText}
      </div>
    </StyledProfileImgContainer>
  );
}
