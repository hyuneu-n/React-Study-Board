import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../data/api';

function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginData = { loginId: loginId, password: password }; // 백엔드 요구에 맞게 필드명 수정
      const response = await loginUser(loginData);

      if (response && response.accessToken) {
        localStorage.setItem('token', response.accessToken); // Access Token 저장
        localStorage.setItem('refreshToken', response.refreshToken); // Refresh Token 저장 (필요시)
        localStorage.setItem('nickname', response.nickname); // 닉네임 저장
        console.log('로그인 성공:', response);
        navigate('/');
      } else {
        throw new Error('로그인 실패: 유효한 토큰이 없습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error.message); // 구체적인 에러 메시지 출력
    }
  };

  return (
    <div className="container mt-4">
      <h2>로그인</h2>
      <div className="mb-3">
        <label htmlFor="loginId">아이디</label>
        <input
          type="text"
          id="loginId"
          className="form-control"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}

export default LoginPage;
