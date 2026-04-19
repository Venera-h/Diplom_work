import { useState } from 'react'
import axios from 'axios'

const TOKEN = import.meta.env.VITE_BOT_TOKEN
const CHAT_ID = '889936049'
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

function Apply() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    program: 'Языковой лагерь',
    level: 'Нулевой',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const text = `<b>📩 Новая заявка с сайта AI Kitai!</b>\n\n` +
      `<b>Имя:</b> ${form.name}\n` +
      `<b>Контакт:</b> ${form.contact}\n` +
      `<b>Программа:</b> ${form.program}\n` +
      `<b>Уровень китайского:</b> ${form.level}\n` +
      `<b>Вопрос:</b> ${form.message || '—'}`

    axios.post(URI_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text
    })
      .then(() => {
        setStatus('success')
        setForm({ name: '', contact: '', program: 'Языковой лагерь', level: 'Нулевой', message: '' })
      })
      .catch(() => setStatus('error'))
      .finally(() => setLoading(false))
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ color: '#C62828', marginBottom: '8px' }}>Оставить заявку</h2>
      <p style={{ color: '#666', marginBottom: '24px' }}>Заполните форму — мы свяжемся с вами в течение 5 минут</p>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="contact"
          type="text"
          placeholder="Telegram или телефон"
          value={form.contact}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <select name="program" value={form.program} onChange={handleChange} style={inputStyle}>
          <option>Языковой лагерь</option>
          <option>Бакалавриат</option>
          <option>Языковые курсы</option>
        </select>

        <select name="level" value={form.level} onChange={handleChange} style={inputStyle}>
          <option>Нулевой</option>
          <option>HSK 1</option>
          <option>HSK 2</option>
          <option>HSK 3</option>
          <option>HSK 4</option>
          <option>HSK 5</option>
          <option>HSK 6</option>
        </select>

        <textarea
          name="message"
          placeholder="Ваш вопрос (необязательно)"
          value={form.message}
          onChange={handleChange}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        {status === 'success' && (
          <p style={{ color: 'green', marginBottom: '12px' }}>✅ Заявка отправлена! Скоро с вами свяжутся.</p>
        )}
        {status === 'error' && (
          <p style={{ color: 'red', marginBottom: '12px' }}>❌ Ошибка отправки. Попробуйте ещё раз.</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: '#C62828',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </button>

        <p style={{ fontSize: '12px', color: '#aaa', marginTop: '12px', textAlign: 'center' }}>
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных (ФЗ-152)
        </p>
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

export default Apply
