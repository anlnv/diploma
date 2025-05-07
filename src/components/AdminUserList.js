import React, { useState, useEffect } from 'react';
import './AdminUserList.css';

const AdminUserList = () => {
  const [users, setUsers] = useState([]); // Состояние для хранения пользователей
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(''); // Состояние ошибки

  // Загрузка данных с бэка
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://213.171.29.113:5000/user/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при загрузке пользователей');
        }

        const data = await response.json();

        // Фильтруем пользователей: исключаем роль "admin"
        const filteredUsers = data.filter((user) => user.role !== 'admin');
        setUsers(filteredUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Произошла ошибка при загрузке данных');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Функция для изменения роли пользователя через бэкенд
  const toggleExpertRole = async (userId, currentRole) => {
    const newRole = currentRole === 'expert' ? 'user' : 'expert';

    try {
        const token = localStorage.getItem('token');
      const response = await fetch('http://213.171.29.113:5000/user/change-role', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          role: newRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при изменении роли');
      }

      // Обновляем локальное состояние после успешного запроса
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error('Ошибка при изменении роли:', err.message);
      alert('Не удалось изменить роль пользователя');
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-user-list">
      <h2 className="admin-title">Список пользователей</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Email</th>
            <th>Эксперт</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={user.role === 'expert'}
                    onChange={() => toggleExpertRole(user.id, user.role)}
                  />
                  <span className="slider"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;