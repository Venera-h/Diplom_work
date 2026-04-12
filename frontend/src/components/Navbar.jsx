import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Главная </Link>
      <Link to="/programs">Программы </Link>
      <Link to="/login">Войти</Link>
      <Link to="/register"> Регистрация</Link>
      <Link to="/dashboard">Личный кабинет</Link>
      <Link to="/packages">Пакеты услуг</Link>
      <Link to="/universities">Университеты</Link>
      <Link to="/news">Новости</Link>

    </nav>
  )
}

export default Navbar
