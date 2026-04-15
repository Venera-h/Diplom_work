import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CATEGORIES = [
  { tag: 'университеты', label: '🎓 Университеты', desc: 'Всё о поступлении в китайские вузы' },
  { tag: 'путешествия', label: '✈️ Путешествия', desc: 'Интересные места и маршруты' },
  { tag: 'мемы', label: '😄 Мемы', desc: 'Шутим про Китай и учёбу' },
  { tag: 'знакизодиака', label: '♈ Знаки зодиака', desc: 'Зодиакальный контент с восточным флером' },
  { tag: 'вопросответ', label: '❓ Вопрос-ответ', desc: 'Полезные гайды и ваши вопросы' },
  { tag: 'отзывы', label: '⭐ Отзывы', desc: 'Истории студентов и родителей' },
  { tag: 'услуги', label: '💼 Услуги', desc: 'Наши предложения' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleCategory = (tag) => {
    setOpen(false)
    navigate(`/news?category=${tag}`)
  }

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 24px',
      background: '#1565C0',
      flexWrap: 'wrap',
      position: 'relative'
    }}>
      <Link to="/" style={linkStyle}>Главная</Link>
      <Link to="/universities" style={linkStyle}>Университеты</Link>
      <Link to="/programs" style={linkStyle}>Программы</Link>
      <Link to="/packages" style={linkStyle}>Пакеты услуг</Link>
      <Link to="/news" style={linkStyle}>Новости</Link>

      {/* Выпадающее меню категорий */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: open ? '#fff' : 'transparent',
            color: open ? '#1161bcff' : '#fff',
            border: '1px solid #fff',
            borderRadius: '6px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Категории {open ? '▲' : '▼'}
        </button>

        {open && (
          <div style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            minWidth: '260px',
            zIndex: 100,
            overflow: 'hidden'
          }}>
            {CATEGORIES.map(cat => (
              <div
                key={cat.tag}
                onClick={() => handleCategory(cat.tag)}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f7ff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ fontWeight: 'bold', color: '#1565C0' }}>{cat.label}</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{cat.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
        <Link to="/auth" style={linkStyle}>Войти</Link>
      </div>
    </nav>
  )
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500'
}

export default Navbar
