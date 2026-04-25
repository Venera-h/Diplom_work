import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  {
    id: 'hsk',
    question: 'Какой у вас уровень китайского языка?',
    emoji: '🈶',
    options: [
      { value: '0', label: 'Нулевой — никогда не учил' },
      { value: '1-3', label: 'HSK 1-3 — базовый уровень' },
      { value: '4+', label: 'HSK 4+ — уверенный уровень' },
    ]
  },
  {
    id: 'goal',
    question: 'Какова ваша цель поездки?',
    emoji: '🎯',
    options: [
      { value: 'camp', label: '🏕️ Языковой лагерь' },
      { value: 'bachelor', label: '🎓 Бакалавриат' },
      { value: 'master', label: '📚 Магистратура' },
      { value: 'language', label: '🗣️ Языковые курсы' },
    ]
  },
  {
    id: 'budget',
    question: 'Какой у вас примерный бюджет в год?',
    emoji: '💰',
    options: [
      { value: 'low', label: 'До 200,000 ₽' },
      { value: 'medium', label: '200,000 — 400,000 ₽' },
      { value: 'high', label: 'Более 400,000 ₽' },
    ]
  }
]

const getResult = (answers) => {
  const { hsk, goal, budget } = answers

  if (goal === 'camp') {
    return {
      title: 'Языковой лагерь в Шанхае',
      description: 'Идеальный старт для знакомства с Китаем! Погружение в язык и культуру за короткий срок.',
      emoji: '🏕️',
      city: 'Шанхай',
      duration: '2-4 недели',
      price: 'от 150,000 ₽'
    }
  }

  if (goal === 'language') {
    return {
      title: 'Языковые курсы в Ханчжоу',
      description: 'Интенсивное изучение китайского языка с нуля или для повышения уровня HSK.',
      emoji: '🗣️',
      city: 'Ханчжоу',
      duration: '6-12 месяцев',
      price: 'от 200,000 ₽'
    }
  }

  if (goal === 'bachelor' && budget === 'low') {
    return {
      title: 'Бакалавриат в Сиане',
      description: 'Доступные университеты с высоким качеством образования в историческом городе Китая.',
      emoji: '🎓',
      city: 'Сиань',
      duration: '4 года',
      price: 'от 180,000 ₽/год'
    }
  }

  if (goal === 'bachelor' && (budget === 'medium' || budget === 'high')) {
    return {
      title: 'Бакалавриат в Шанхае',
      description: 'Престижные университеты в деловой столице Китая. Отличные перспективы для карьеры.',
      emoji: '🎓',
      city: 'Шанхай',
      duration: '4 года',
      price: 'от 280,000 ₽/год'
    }
  }

  if (goal === 'master') {
    return {
      title: 'Магистратура в Чэнду',
      description: 'Современные программы магистратуры в быстроразвивающемся технологическом центре Китая.',
      emoji: '📚',
      city: 'Чэнду',
      duration: '2-3 года',
      price: 'от 250,000 ₽/год'
    }
  }

  return {
    title: 'Языковой лагерь в Шанхае',
    description: 'Отличный способ начать знакомство с Китаем и определиться с дальнейшими планами.',
    emoji: '🌟',
    city: 'Шанхай',
    duration: '2-4 недели',
    price: 'от 150,000 ₽'
  }
}

function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [STEPS[step].id]: value }
    setAnswers(newAnswers)

    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setResult(getResult(newAnswers))
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  const progress = ((step) / STEPS.length) * 100

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ color: '#C62828', marginBottom: '8px' }}>🎓 Подбор программы обучения</h2>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Ответьте на 3 вопроса — мы подберём идеальную программу для вас
      </p>

      {!result ? (
        <div>
          {/* Прогресс бар */}
          <div style={{ background: '#eee', borderRadius: '8px', height: '8px', marginBottom: '24px' }}>
            <div style={{
              background: '#C62828',
              height: '8px',
              borderRadius: '8px',
              width: `${progress}%`,
              transition: 'width 0.3s'
            }} />
          </div>

          <p style={{ color: '#999', fontSize: '13px', marginBottom: '8px' }}>
            Вопрос {step + 1} из {STEPS.length}
          </p>

          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{STEPS[step].emoji}</div>
            <h3 style={{ margin: '0 0 24px', fontSize: '20px' }}>{STEPS[step].question}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {STEPS[step].options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  style={{
                    padding: '14px 20px',
                    border: '2px solid #eee',
                    borderRadius: '10px',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '15px',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#C62828'
                    e.currentTarget.style.background = '#fff5f5'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#eee'
                    e.currentTarget.style.background = '#fff'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{ marginTop: '16px', background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}
            >
              ← Назад
            </button>
          )}
        </div>
      ) : (
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>{result.emoji}</div>
          <h3 style={{ color: '#C62828', margin: '0 0 8px', fontSize: '22px' }}>
            Вам идеально подходит:
          </h3>
          <h2 style={{ margin: '0 0 16px' }}>{result.title}</h2>
          <p style={{ color: '#555', marginBottom: '20px' }}>{result.description}</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
            {[
              { icon: '📍', label: result.city },
              { icon: '⏱️', label: result.duration },
              { icon: '💰', label: result.price },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#f9f0f0',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '14px'
              }}>
                {item.icon} {item.label}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/apply')}
            style={{
              width: '100%',
              padding: '14px',
              background: '#C62828',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '12px'
            }}
          >
            Оставить заявку 🚀
          </button>

          <button
            onClick={reset}
            style={{
              width: '100%',
              padding: '12px',
              background: 'none',
              border: '1px solid #ddd',
              borderRadius: '10px',
              fontSize: '14px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            Пройти заново
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
