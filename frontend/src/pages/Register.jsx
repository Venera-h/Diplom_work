import { useState } from 'react'
import axios from 'axios'

function Register() {
  const [login, setLogin] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/auth/register', { login, password: password1 })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user_id', response.data.user_id)
        alert('Вы вошли!')
      })

      .catch(() => setError('Неверный логин или пароль'))
  }

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password1}
            onChange={e => setPassword1(e.target.value)}
          />
        </div>
         <div>
          <input
            type="password"
            placeholder="Повторите пароль"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default Register
