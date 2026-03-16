import { useEffect, useState } from 'react'
import axios from 'axios'

function Programs() {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8001/programs/') //запрос к бэкенду для получения списка программ
      .then(response => {
        console.log(response.data)
        setPrograms(response.data)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <h2>Каталог программ</h2>
      {programs.length === 0 && <p>Программ пока нет</p>}
      {programs.map(program => (
        <div key={program.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '12px 0' }}>
          <h3>{program.title}</h3>
          <p>{program.description}</p>
          <p>Длительность: {program.duration_months} мес.</p>
          <p>Цена: {program.price} ₽</p>
        </div>
      ))}
    </div>
  )
}

export default Programs
