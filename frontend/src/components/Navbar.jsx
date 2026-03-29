import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Главная </Link>
      <Link to="/programs">Программы </Link>
      <Link to="/login">Войти</Link>
      <Link to="/register"> Регистрация</Link>
      <Link to="/dashboard">Личный кабинет</Link>
    </nav>
  )
}

export default Navbar
