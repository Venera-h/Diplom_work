import { useEffect, useRef } from 'react'

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
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Новости</h2>
      <p style={{ color: '#666' }}>Последние новости из Telegram канала</p>
      {POST_IDS.map(id => (
        <TelegramPost key={id} postId={id} />
      ))}
    </div>
  )
}

export default News
