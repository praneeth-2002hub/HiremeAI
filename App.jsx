
import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hello! I'm Praneeth's AI assistant. Ask me about his skills, education, projects or professional background."
    }
  ])
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!question.trim() || loading) return

    const userQuestion = question.trim()

    setMessages(prev => [
      ...prev,
      { role: 'user', text: userQuestion }
    ])

    setQuestion('')
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: userQuestion
        })
      })

      if (!response.ok) {
        throw new Error('Backend request failed')
      }

      const data = await response.json()

      setMessages(prev => [
        ...prev,
        { role: 'bot', text: data.answer }
      ])

    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: 'Unable to connect to the AI assistant. Please try again.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
  <div className="space-background">
    <div className="stars"></div>
    <span className="comet comet-one"></span>
    <span className="comet comet-two"></span>
    <span className="comet comet-three"></span>
    <div className="planet">
  <div className="planet-shadow"></div>
</div>
  </div>
      <header className="navbar">
        <h2>Hireme<span>ai</span></h2>
        <p>AI-powered candidate profile</p>
      </header>

      <main className="main-container">
        <section className="profile-card">
          <div className="avatar">P</div>
          <h2>P Praneeth Yuvraj</h2>
          <p className="subtitle">Candidate Profile</p>

          <div className="profile-section">
            <h3>About</h3>
            <p>
              Explore my education, technical skills, projects
              and experience through my AI assistant.
            </p>
          </div>

          <div className="profile-section">
            <h3>Technical Skills</h3>
            <div className="skills">
              {['Python',
  'SQL',
  'Azure OpenAI',
  'Prompt Engineering',
  'RAG',
  'Agentic AI',
  'FastAPI',
  'REST APIs',
  'Azure AI Search',
  'Embeddings',
  'Pytest',
  'Docker',
  'Git'
 ].map(skill => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h3>Education</h3>
            <p>Bachelor's Degree · 2020–2024</p>
          </div>
        </section>

        <section className="chat-card">
          <div className="chat-header">
            <div>
              <h2>Ask Hiremeai</h2>
              <p>Your AI candidate assistant</p>
            </div>
            <span className="status">● Online</span>
          </div>

          <div className="chat-body">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.role === 'user' ? 'user-message' : 'bot-message'}
              >
                {message.text}
              </div>
            ))}

            {loading && (
               <div className="bot-message typing-indicator">
    <span></span>
    <span></span>
    <span></span>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask something about the candidate..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage()
              }}
            />

            <button onClick={sendMessage} disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
