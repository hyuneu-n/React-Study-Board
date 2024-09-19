const API_BASE_URL = "http://localhost:8080/api"; // API의 기본 URL

// 전체 게시글 조회
export const fetchPosts = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?category=${category}`, {
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
export const fetchPostById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
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

// 게시글 작성
export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

// 게시글 수정
export const updatePost = async (id, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to update post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
  }
};

// 게시글 삭제
export const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }

    return true; // 성공 시 true 반환
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

    return await response.json(); // JSON 형식의 응답 받기
  } catch (error) {
    console.error('Error logging in:', error);
  }
};