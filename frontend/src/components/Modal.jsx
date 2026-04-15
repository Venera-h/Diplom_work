function Modal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '28px',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px', right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: '#888'
          }}
        >✕</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px' }}>📢</span>
          <div>
            <span style={{
              background: '#2196F3',
              color: '#fff',
              borderRadius: '6px',
              padding: '2px 10px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>ВАЖНО</span>
            <h3 style={{ margin: '4px 0 0', color: '#1565C0' }}>Новый экзамен на гранты Китая</h3>
          </div>
        </div>

        <div style={{ background: '#f0fff4', borderLeft: '4px solid #4CAF50', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#2e7d32' }}>✅ Время есть! Паниковать не стоит</p>
        </div>

        {[
          { icon: '📅', text: 'С 2028 года экзамен станет обязательным для всех' },
          { icon: '⏳', text: '2,5 года на подготовку' },
          { icon: '🔄', text: 'Гибкая система — несколько попыток' },
          { icon: '📝', text: 'До 5 раз в год' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
            <span>{item.icon}</span>
            <span style={{ fontSize: '14px', color: '#444' }}>{item.text}</span>
          </div>
        ))}

        <div style={{ margin: '14px 0' }}>
          <strong>💰 Стоимость:</strong>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#555' }}>
            450 юаней — за 1 экзамен<br />
            700 юаней — за 2 и более экзаменов
          </p>
        </div>

        <div style={{ background: '#fff3e0', borderLeft: '4px solid #FF9800', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#e65100' }}>⚠️ Главная сложность</p>
          <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
            Все задания на <strong>китайском языке</strong>. Начните углублённое изучение заранее — это самое важное вложение времени и сил.
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            background: '#1565C0',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >Понятно, закрыть</button>
      </div>
    </div>
  )
}

export default Modal
