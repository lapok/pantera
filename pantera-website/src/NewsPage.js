import React, { useEffect, useState } from 'react';
import './main-window.css';
import './NewsPage.css';
import AuthModal from './AuthModal';
import UserProfileModal from './userProfileModal';
import CreatePostModal from './CreatePostModal';

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewUser, setViewUser] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/news');
      const data = await res.json();
      setPosts(data);
      setLoading(false);  // Убираем индикатор загрузки, когда посты загружены
    } catch (err) {
      console.error('Ошибка загрузки новостей:', err);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Ошибка при загрузке профиля');

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error('Ошибка при загрузке пользователя:', err);
      localStorage.removeItem('token');
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`);
      
      if (!res.ok) throw new Error('Не удалось загрузить профиль пользователя');
      
      const userData = await res.json();
      setViewUser(userData);
      setShowProfile(true);
    } catch (err) {
      console.error('Ошибка при загрузке профиля пользователя:', err);
      alert('Не удалось загрузить профиль пользователя');
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${postId}`);
      const data = await res.json();
      setComments((prev) => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error('Ошибка загрузки комментариев:', err);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Необходимо авторизироваться');

    try {
      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: postId, content: newComment[postId] }),
      });

      if (!res.ok) throw new Error('Ошибка при добавлении комментария');

      setNewComment((prev) => ({ ...prev, [postId]: '' }));
      fetchComments(postId);
    } catch (err) {
      console.error(err);
      alert('Не удалось добавить комментарий');
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Необходимо авторизироваться');

    if (!window.confirm('Удалить комментарий?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Ошибка удаления');

      fetchComments(postId);
    } catch (err) {
      console.error(err);
      alert('Не удалось удалить комментарий');
    }
  };

  const handleAvatarClick = (comment) => {
    fetchUserProfile(comment.user_id);
  }

  const handleEditComment = async (commentId, postId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Необходимо авторизироваться');

    try {
      const res = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editedComment }),
      });

      if (!res.ok) throw new Error('Ошибка редактирования');

      setEditingCommentId(null);
      setEditedComment('');
      fetchComments(postId);
    } catch (err) {
      console.error(err);
      alert('Не удалось отредактировать комментарий');
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Необходимо авторизироваться');
  
    if (!window.confirm('Удалить пост?')) return;
  
    try {
        const res = await fetch(`http://localhost:5000/api/news/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Ошибка удаления поста');
        }
        
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Полная ошибка:', err);
        alert(`Не удалось удалить пост: ${err.message}`);
      }
  };

  const handleCommentClick = (commentUser) => {
    fetchUserProfile(commentUser.user_id);
  }

  const handleCloseProfile = () => {
    setViewUser(null);
    setShowProfile(false);
  }

  const handleEditPost = (post) => {
    setPostToEdit(post);
    setShowCreateModal(true);
  };


  const handlePostCreated = (newPost, isEdit = false) => {
    console.log('Получен новый или обновленный пост:', newPost);
    
    if (isEdit) {
        // Это обновление существующего поста
        setPosts(prevPosts => 
            prevPosts.map(post => post.id === newPost.id ? newPost : post)
        );
    } else {
        // Это новый пост
        setPosts(prevPosts => [newPost, ...prevPosts]);
    }
    
    // Закрываем модальное окно и сбрасываем postToEdit
    setShowCreateModal(false);
    setPostToEdit(null);
  };

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => fetchComments(post.id));
    }
  }, [posts]);

  return (
    <>

      <div className="news-page">
        <h1>Новости</h1>

        {user?.role === 'admin' && (
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <button onClick={() => {
                setPostToEdit(null);
                setShowCreateModal(true);
                }}>➕ Добавить пост</button>
          </div>
        )}

        {loading ? (
          <p style={{ color: '#888', textAlign: 'center' }}>Загрузка...</p>
        ) : posts.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center' }}>Пока новостей нет.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              {post.image_url && post.image_url.length > 0 ? (
                JSON.parse(post.image_url).map((url, index) => (
                  <img 
                    key={index}
                    src={`http://localhost:5000${url}`}
                    alt={`post-image-${index}`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ))
              ) : (
                <p>Изображение не доступно</p>
              )}

              <p>{post.content}</p>

              <div className="post-meta">
                <span>Дата создания: {new Date(post.created_at).toLocaleString('ru-RU')}</span>
                {post.updated_at && post.updated_at !== post.created_at && (
                  <span> | Последнее редактирование: {new Date(post.updated_at).toLocaleString('ru-RU')}</span>
                )}
              </div>

              {user?.role === 'admin' && (
                <div className='post-actions'>
                    <button onClick={() => handleEditPost(post)}>Редактировать</button>
                    <button onClick={() => handleDeletePost(post.id)}>Удалить</button>
                </div>
              )}

              <div className="comments-section">
                <h3>Комментарии</h3>
                <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                  <textarea
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment((prev) => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Оставьте комментарий"
                    required
                  />
                  <button type="submit">Отправить</button>
                </form>

                {(comments[post.id] || []).map((comment) => (
                  <div key={comment.id} className="comment">
                      <div className="comment-meta">
                          <span 
                              className="comment-author" 
                              onClick={() => handleAvatarClick(comment)} // Здесь вызываем обработчик клика по аватарке
                          >
                              {comment.username}
                              {comment.role && <span className="role-prefix"> [{comment.role}]</span>}
                          </span>
                          <span className="comment-time">
                              {new Date(comment.created_at).toLocaleString('ru-RU')}
                          </span>
                      </div>

                    {editingCommentId === comment.id ? (
                      <>
                        <textarea
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                        />
                        <div className="comment-actions">
                          <button onClick={() => handleEditComment(comment.id, post.id)}>
                            Сохранить
                          </button>
                          <button
                            onClick={() => {
                              setEditingCommentId(null);
                              setEditedComment('');
                            }}
                          >
                            Отмена
                          </button>
                        </div>
                      </>
                    ) : (
                      <p>{comment.content}</p>
                    )}

                    {(user?.id === comment.user_id || user?.role === 'admin') && (
                      <div className="comment-actions">
                        <button onClick={() => handleDeleteComment(comment.id, post.id)}>
                          Удалить
                        </button>
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditedComment(comment.content);
                          }}
                          style={{ display: editingCommentId === comment.id ? 'none' : 'inline-block' }}
                        >
                          Редактировать
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSwitch={() => setIsRegisterMode((prev) => !prev)}
        isRegisterMode={isRegisterMode}
        onLoginSuccess={fetchUser}
      />

      <UserProfileModal
        isOpen={showProfile}
        onClose={handleCloseProfile}
        user={user}
        onLogout={() => {
          localStorage.removeItem('token');
          setUser(null);
          setShowProfile(false);
        }}
        viewUser={viewUser}
      />

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
        postToEdit={postToEdit}
      />
    </>
  );
};

export default NewsPage;