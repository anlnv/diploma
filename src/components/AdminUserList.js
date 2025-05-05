import React, { useState } from 'react';
import './AdminUserList.css';

const AdminUserList = () => {
  // Фиктивный список пользователей
  const initialUsers = [
    { id: 1, name: 'Иван', surname: 'Иванов', email: 'ivan@example.com', role: 'admin' },
    { id: 2, name: 'Петр', surname: 'Петров', email: 'petr@example.com', role: 'user' },
    { id: 3, name: 'Сидор', surname: 'Сидоров', email: 'sidor@example.com', role: 'expert' },
    { id: 4, name: 'Анна', surname: 'Кузнецова', email: 'anna@example.com', role: 'user' },
    { id: 5, name: 'Мария', surname: 'Смирнова', email: 'maria@example.com', role: 'user' },
  ];

  // Фильтруем пользователей: исключаем роль "admin"
  const [users, setUsers] = useState(initialUsers.filter((user) => user.role !== 'admin'));

  // Функция для изменения роли пользователя с помощью тумблера
  const toggleExpertRole = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, role: user.role === 'expert' ? 'user' : 'expert' }
          : user
      )
    );
  };

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
                    onChange={() => toggleExpertRole(user.id)}
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