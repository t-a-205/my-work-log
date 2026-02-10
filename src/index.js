import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  // 1. 상태(State) 만들기: 입력창의 글자와 일기 목록을 저장하는 변수야.
  const [task, setTask] = useState(""); // 현재 쓰고 있는 글
  const [logs, setLogs] = useState([]); // 저장된 일기 목록 (배열)

  // 2. 저장 버튼을 눌렀을 때 실행될 함수
  const handleSave = () => {
    if (task.trim() === "") return; // 빈 칸이면 저장 안 함!
    setLogs([...logs, { id: Date.now(), text: task }]); // 목록에 추가
    setTask(""); // 입력창 비우기
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>📝 나의 업무일지</h1>
      
      {/* 입력창 */}
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="오늘 어떤 일을 하셨나요?"
        style={{ padding: '10px', width: '70%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      
      {/* 저장 버튼 */}
      <button 
        onClick={handleSave}
        style={{ padding: '10px 20px', marginLeft: '5px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        저장
      </button>

      <hr style={{ margin: '30px 0' }} />

      {/* 목록 표시창 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {logs.length === 0 ? <p>아직 기록이 없어요. 첫 일기를 써보세요!</p> : null}
        {logs.map((log) => (
          <li key={log.id} style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'left' }}>
            ✅ {log.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);