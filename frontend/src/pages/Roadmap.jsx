const ROADMAP = [
  {
    month: 'Январь — Февраль',
    icon: '📋',
    title: 'Подготовка и консультация',
    color: '#C62828',
    steps: [
      'Первичная консультация с менеджером',
      'Определение подходящих университетов',
      'Прохождение квиза подбора программы',
      'Оценка уровня китайского языка (HSK)',
    ]
  },
  {
    month: 'Март',
    icon: '📁',
    title: 'Сбор документов',
    color: '#E65100',
    steps: [
      'Загранпаспорт (срок действия от 2 лет)',
      'Аттестат / диплом с переводом и апостилем',
      'Медицинская справка (форма JW202)',
      'Фотографии 35×45 мм на белом фоне',
      'Мотивационное письмо на китайском/английском',
    ]
  },
  {
    month: 'Апрель',
    icon: '📨',
    title: 'Подача заявки на грант',
    color: '#F57F17',
    steps: [
      'Регистрация на платформе CSC (csc.edu.cn)',
      'Заполнение анкеты на грант',
      'Подача документов в университет',
      'Оплата вступительного взноса',
    ]
  },
  {
    month: 'Май — Июнь',
    icon: '⏳',
    title: 'Ожидание результатов',
    color: '#1565C0',
    steps: [
      'Рассмотрение заявки университетом',
      'Получение письма о зачислении (Admission Letter)',
      'Получение визовой анкеты JW201/JW202',
      'Уведомление о результатах гранта',
    ]
  },
  {
    month: 'Июль',
    icon: '🛂',
    title: 'Оформление визы',
    color: '#2E7D32',
    steps: [
      'Подача документов в консульство КНР',
      'Получение студенческой визы X1/X2',
      'Бронирование авиабилетов',
      'Оформление медицинской страховки',
    ]
  },
  {
    month: 'Август',
    icon: '✈️',
    title: 'Вылет и заселение',
    color: '#6A1B9A',
    steps: [
      'Перелёт в Китай',
      'Регистрация в университете',
      'Заселение в общежитие',
      'Медицинский осмотр в Китае',
      'Начало учёбы 🎉',
    ]
  },
]

function Roadmap() {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#C62828', marginBottom: '8px' }}>🗺️ Roadmap поступления в китайский вуз</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Пошаговый план от первой консультации до начала учёбы
      </p>

      <div style={{ position: 'relative' }}>
        {/* Вертикальная линия */}
        <div style={{
          position: 'absolute',
          left: '28px',
          top: '0',
          bottom: '0',
          width: '3px',
          background: 'linear-gradient(to bottom, #C62828, #6A1B9A)',
          borderRadius: '3px'
        }} />

        {ROADMAP.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative' }}>
            {/* Иконка */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              flexShrink: 0,
              zIndex: 1,
              boxShadow: `0 0 0 4px #fff, 0 0 0 6px ${item.color}33`
            }}>
              {item.icon}
            </div>

            {/* Контент */}
            <div style={{
              flex: 1,
              background: '#fff',
              borderRadius: '12px',
              padding: '16px 20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              border: `1px solid ${item.color}33`
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: item.color,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {item.month}
              </span>
              <h3 style={{ margin: '4px 0 12px', color: '#1a1a1a' }}>{item.title}</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {item.steps.map((step, j) => (
                  <li key={j} style={{ color: '#555', fontSize: '14px', marginBottom: '4px', lineHeight: '1.5' }}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #C62828, #E65100)',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        color: '#fff',
        marginTop: '16px'
      }}>
        <p style={{ fontSize: '20px', margin: '0 0 8px', fontWeight: 'bold' }}>
          Готовы начать путь?
        </p>
        <p style={{ margin: '0 0 16px', opacity: 0.9 }}>
          Запишитесь на бесплатную консультацию прямо сейчас
        </p>
        <a href="/apply" style={{
          display: 'inline-block',
          padding: '12px 28px',
          background: '#fff',
          color: '#C62828',
          borderRadius: '8px',
          fontWeight: 'bold',
          textDecoration: 'none',
          fontSize: '15px'
        }}>
          Оставить заявку 🚀
        </a>
      </div>
    </div>
  )
}

export default Roadmap
