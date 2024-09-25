const API_BASE_URL = "http://localhost:8080/api"; // API의 기본 URL

// 토큰 가져오기 함수 (localStorage에서 가져오기)
const getToken = () => localStorage.getItem('token');

// 전체 게시글 조회 (카테고리별)
export const fetchPostsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${category}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// 특정 게시글 조회
export const fetchPostById = async (category, id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${category}/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

export const createPost = async (postData) => {
  try {
    const token = getToken(); // 토큰을 localStorage에서 가져옴
    console.log('Token used for creating post:', token); // 토큰 로그 추가

    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post. Status code: ${response.status}`);
    }

    const data = await response.json();
    console.log('Post created successfully:', data); // 요청 성공 시 로그 확인
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};
// 게시글 수정
export const updatePost = async (id, postData) => {
  try {
    const token = getToken();
    console.log('Token used for updating post:', token); // 토큰 로그 추가
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 토큰 추가
        'Cache-Control': 'no-cache', // 캐시 무효화 헤더 추가
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update post. Status code: ${response.status}`);
    }

    const data = await response.json();
    console.log('Post updated successfully:', data); // 요청 성공 시 로그
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
  }
};

// 게시글 삭제
export const deletePost = async (id) => {
  try {
    const token = getToken();
    console.log('Token used for deleting post:', token); // 토큰 로그 추가
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // 토큰 추가
        'Cache-Control': 'no-cache', // 캐시 무효화 헤더 추가
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete post. Status code: ${response.status}`);
    }

    console.log('Post deleted successfully'); // 요청 성공 시 로그
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

// 회원가입
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

// 로그인
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData), // loginId와 password 전달
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    
    // 로그인 성공 시 토큰과 사용자 정보 (예: 닉네임 또는 아이디)를 localStorage에 저장
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ id: data.login_id, nickname: data.nickname }));

    return data; // JSON 형식의 응답 받기
  } catch (error) {
    console.error('Error logging in:', error);
  }
};