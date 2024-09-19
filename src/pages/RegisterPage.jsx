import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../data/api';

function RegisterPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const registerData = { loginId: loginId, password: password };
      const response = await registerUser(registerData);
      console.log('회원가입 성공:', response);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>회원가입</h2>
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
      <div className="mb-3">
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>
        회원가입
      </button>
    </div>
  );
}

export default RegisterPage;
