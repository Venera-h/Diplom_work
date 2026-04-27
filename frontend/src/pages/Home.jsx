import FAQ from './FAQ'
import nataliaPhoto from '../assets/main.png'

function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Блок об основателе */}
      <div style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        background: '#f9f9f9',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <img
          src={nataliaPhoto}
          alt="Основатель"
          style={{ width: '200px', height: '260px', borderRadius: '12px', objectFit: 'cover', border: '3px solid #2196F3' }}
        />
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h2 style={{ margin: '0 0 6px' }}>Наталья</h2>
          <p style={{ margin: '0 0 8px', color: '#2196F3', fontWeight: 'bold' }}>Основатель · Шанхай, Китай 🇨🇳</p>
          <p style={{ margin: '0 0 8px', color: '#555', maxWidth: '500px' }}>
            Живу в Шанхае уже 13 лет. Этот канал — ваш надёжный ориентир в мире китайского образования, культуры и повседневной жизни.
          </p>
          <p style={{ margin: '0', color: '#555', maxWidth: '500px' }}>
            Здесь будет полезно тем, кто:<br/>
            🌟 Хочет учиться в Китае (языковые курсы, бакалавриат, лагеря)<br/>
            🌟 Интересуется жизнью в Шанхае<br/>
            🌟 Любит разборы, мемы, советы и немного магии из рубрики с гороскопами
          </p>
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #e8f4fd, #d0e8f7)',
        border: '2px solid #2196F3',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '32px' }}>📢</span>
          <div>
            <span style={{
              background: '#2196F3',
              color: 'white',
              borderRadius: '6px',
              padding: '2px 10px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>ВАЖНО</span>
            <h2 style={{ margin: '4px 0 0', color: '#1565C0' }}>Новый экзамен на гранты Китая</h2>
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '16px',
          borderLeft: '4px solid #4CAF50'
        }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#2e7d32' }}>✅ Время есть! Паниковать не стоит</p>
          <p style={{ margin: '0', color: '#555' }}>
            Новый обязательный экзамен на правительственные гранты Китая вызвал ажиотаж,
            но у будущих абитуриентов есть достаточно времени на подготовку.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          {[
            { icon: '📅', text: 'С 2028 года экзамен станет обязательным для всех' },
            { icon: '⏳', text: '2,5 года на подготовку' },
            { icon: '🔄', text: 'Несколько попыток — экзамен гибко организован' },
            { icon: '📝', text: 'До 5 раз в год' },
          ].map((item, i) => (
            <div key={i} style={{
              background: '#f0f7ff',
              borderRadius: '8px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: '1 1 200px'
            }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px' }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ margin: '0 0 8px', color: '#1565C0' }}>💰 Стоимость</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '10px 16px' }}>
              <strong>450 юаней</strong> — за 1 экзамен
            </div>
            <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '10px 16px' }}>
              <strong>700 юаней</strong> — за 2 и более экзаменов
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ margin: '0 0 8px', color: '#1565C0' }}>📚 Что сдавать?</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '12px 16px', flex: '1 1 200px' }}>
              <p style={{ margin: '0 0 6px', fontWeight: 'bold' }}>🎭 Гуманитарные</p>
              <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>Китайский язык<br />Математика (школьный уровень)</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '12px 16px', flex: '1 1 200px' }}>
              <p style={{ margin: '0 0 6px', fontWeight: 'bold' }}>🔬 Технические и научные</p>
              <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>Китайский язык + Математика<br />+ Химия и/или Физика</p>
            </div>
          </div>
        </div>

        <div style={{
          background: '#fff3e0',
          borderRadius: '10px',
          padding: '14px 16px',
          borderLeft: '4px solid #FF9800'
        }}>
          <p style={{ margin: '0 0 6px', fontWeight: 'bold', color: '#e65100' }}>⚠️ Главная сложность</p>
          <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>
            Все задания на <strong>китайском языке</strong>. Без уверенного владения языком
            вы можете не понять вопрос, даже зная правильный ответ.
            Начните углублённое изучение китайского заранее — это самое важное вложение времени и сил.
          </p>
        </div>
      </div>

      <FAQ />

    </div>
  )
}

export default Home
