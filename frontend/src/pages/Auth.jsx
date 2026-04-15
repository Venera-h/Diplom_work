import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [tab, setTab] = useState('login')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    axios.post('http://127.0.0.1:8000/api/auth/login', { login, password })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user_id', response.data.user_id)
        navigate('/dashboard')
      })
      .catch(() => setError('Неверный логин или пароль'))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')
    if (password !== password2) {
      setError('Пароли не совпадают')
      return
    }
    axios.post('http://127.0.0.1:8000/api/auth/register', { login, password })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user_id', response.data.user_id)
        navigate('/dashboard')
      })
      .catch(() => setError('Пользователь уже существует'))
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '32px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      background: '#fff'
    }}>
      {/* Вкладки */}
      <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '2px solid #eee' }}>
        {['login', 'register'].map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setError('') }}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px',
              color: tab === t ? '#1565C0' : '#aaa',
              borderBottom: tab === t ? '2px solid #1565C0' : '2px solid transparent',
              marginBottom: '-2px'
            }}
          >
            {t === 'login' ? 'Войти' : 'Регистрация'}
          </button>
        ))}
      </div>

      <form onSubmit={tab === 'login' ? handleLogin : handleRegister}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={e => setLogin(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />
        {tab === 'register' && (
          <input
            type="password"
            placeholder="Повторите пароль"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            style={inputStyle}
          />
        )}
        {error && <p style={{ color: 'red', margin: '0 0 12px' }}>{error}</p>}
        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          background: '#1565C0',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          {tab === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  marginBottom: '12px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '14px',
  boxSizing: 'border-box'
}

export default Auth
