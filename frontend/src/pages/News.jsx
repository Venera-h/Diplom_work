import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

const CATEGORY_LABELS = {
  университеты: '🎓 Университеты',
  путешествия: '✈️ Путешествия',
  мемы: '😄 Мемы',
  знакизодиака: '♈ Знаки зодиака',
  вопросответ: '❓ Вопрос-ответ',
  отзывы: '⭐ Отзывы',
  услуги: '💼 Услуги',
}

const POST_IDS = Array.from({ length: 50 }, (_, i) => 50 - i)

function TelegramPost({ postId }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.setAttribute('data-telegram-post', `ai_kitai_service/${postId}`)
    script.setAttribute('data-width', '100%')
    script.setAttribute('data-userpic', 'true')
    script.setAttribute('data-color', '2196F3')
    script.async = true
    ref.current.appendChild(script)
  }, [postId])

  return <div ref={ref} style={{ marginBottom: '16px' }} />
}

function News() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>
        {category ? CATEGORY_LABELS[category] || `#${category}` : 'Все новости'}
      </h2>
      <p style={{ color: '#666' }}>
        {category
          ? `Посты из Telegram канала по теме #${category}`
          : 'Последние новости из Telegram канала @ai_kitai_service'
        }
      </p>
      {POST_IDS.map(id => (
        <TelegramPost key={id} postId={id} />
      ))}
    </div>
  )
}

export default News
