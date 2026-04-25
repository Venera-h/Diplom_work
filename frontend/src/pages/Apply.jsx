import { useState } from 'react'
import axios from 'axios'

const TOKEN = import.meta.env.VITE_BOT_TOKEN
const CHAT_ID = '889936049'
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

const validate = (form) => {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Введите ваше имя'
  } else if (form.name.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа'
  }

  const phoneRegex = /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/
  const telegramRegex = /^@[a-zA-Z0-9_]{3,}$/
  if (!form.contact.trim()) {
    errors.contact = 'Введите Telegram или телефон'
  } else if (!phoneRegex.test(form.contact) && !telegramRegex.test(form.contact)) {
    errors.contact = 'Введите корректный телефон (+7XXXXXXXXXX) или Telegram (@username)'
  }

  return errors
}

function SuccessModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '40px',
        maxWidth: '400px', width: '100%', textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
        <h3 style={{ color: '#2e7d32', margin: '0 0 12px', fontSize: '22px' }}>
          Заявка принята!
        </h3>
        <p style={{ color: '#555', marginBottom: '24px', lineHeight: '1.6' }}>
          Спасибо! Мы получили вашу заявку и свяжемся с вами в течение <strong>5 минут</strong>.
        </p>
        <div style={{
          background: '#f0fff4', borderRadius: '10px', padding: '12px',
          marginBottom: '24px', fontSize: '14px', color: '#2e7d32'
        }}>
          ✅ Уведомление отправлено менеджеру
        </div>
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '14px', background: '#C62828',
            color: '#fff', border: 'none', borderRadius: '10px',
            fontSize: '15px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}

function Apply() {
  const [form, setForm] = useState({
    name: '', contact: '', program: 'Языковой лагерь', level: 'Нулевой', message: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    const text = `<b>📩 Новая заявка с сайта AI Kitai!</b>\n\n` +
      `<b>Имя:</b> ${form.name}\n` +
      `<b>Контакт:</b> ${form.contact}\n` +
      `<b>Программа:</b> ${form.program}\n` +
      `<b>Уровень китайского:</b> ${form.level}\n` +
      `<b>Вопрос:</b> ${form.message || '—'}`

    axios.post(URI_API, { chat_id: CHAT_ID, parse_mode: 'html', text })
      .then(() => {
        setShowSuccess(true)
        setForm({ name: '', contact: '', program: 'Языковой лагерь', level: 'Нулевой', message: '' })
      })
      .catch(() => setErrors({ submit: 'Ошибка отправки. Попробуйте ещё раз.' }))
      .finally(() => setLoading(false))
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

      <h2 style={{ color: '#C62828', marginBottom: '8px' }}>Оставить заявку</h2>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Заполните форму — мы свяжемся с вами в течение 5 минут
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <input
            name="name"
            type="text"
            placeholder="Ваше имя *"
            value={form.name}
            onChange={handleChange}
            style={{ ...inputStyle, borderColor: errors.name ? '#C62828' : '#ddd' }}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <input
            name="contact"
            type="text"
            placeholder="Telegram (@username) или телефон (+7XXXXXXXXXX) *"
            value={form.contact}
            onChange={handleChange}
            style={{ ...inputStyle, borderColor: errors.contact ? '#C62828' : '#ddd' }}
          />
          {errors.contact && <p style={errorStyle}>{errors.contact}</p>}
        </div>

        <select name="program" value={form.program} onChange={handleChange} style={{ ...inputStyle, marginBottom: '16px' }}>
          <option>Языковой лагерь</option>
          <option>Бакалавриат</option>
          <option>Языковые курсы</option>
          <option>Магистратура</option>
        </select>

        <select name="level" value={form.level} onChange={handleChange} style={{ ...inputStyle, marginBottom: '16px' }}>
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
          style={{ ...inputStyle, resize: 'vertical', marginBottom: '16px' }}
        />

        {errors.submit && <p style={errorStyle}>{errors.submit}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '14px', background: '#C62828',
            color: '#fff', border: 'none', borderRadius: '8px',
            fontSize: '15px', fontWeight: 'bold',
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
  width: '100%', padding: '10px 12px', border: '1px solid #ddd',
  borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
}

const errorStyle = {
  color: '#C62828', fontSize: '12px', margin: '4px 0 0'
}

export default Apply
