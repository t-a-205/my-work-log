import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [logs, setLogs] = useState([]);
  const [text, setText] = useState('');
  const [location, setLocation] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 모드 전환용

  // 1. 위치 정보 가져오기 함수
  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        alert("위치 정보를 가져왔습니다!");
      });
    } else {
      alert("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
    }
  };

  // 2. 일지 저장 함수
  const handleSave = () => {
    if (!text) return alert("내용을 입력해주세요!");
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      content: text,
      loc: location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "위치 정보 없음",
      mapUrl: location ? `https://www.google.com/maps?q=${location.lat},${location.lng}` : null
    };
    setLogs([newLog, ...logs]);
    setText('');
    setLocation(null);
    alert("업무일지가 저장되었습니다!");
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #eee', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#333' }}>{isAdmin ? "🕵️ 관리자 모드" : "📝 업무일지 작성"}</h2>
        <button onClick={() => setIsAdmin(!isAdmin)} style={{ fontSize: '12px', cursor: 'pointer' }}>
          {isAdmin ? "작성모드로" : "관리자로 로그인"}
        </button>
      </div>

      {!isAdmin ? (
        /* 작성자 화면 */
        <div>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="오늘 어떤 업무를 하셨나요?"
            style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px', boxSizing: 'border-box' }}
          />
          <button onClick={getMyLocation} style={{ width: '100%', padding: '10px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '8px', marginBottom: '5px', cursor: 'pointer' }}>
            📍 현재 위치 기록하기
          </button>
          <button onClick={handleSave} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            일지 저장하기
          </button>
        </div>
      ) : (
        /* 관리자 화면 */
        <div style={{ marginTop: '20px' }}>
          {logs.length === 0 ? <p style={{ color: '#999' }}>등록된 일지가 없습니다.</p> : 
            logs.map(log => (
              <div key={log.id} style={{ padding: '15px', borderBottom: '1px solid #eee', textAlign: 'left' }}>
                <small style={{ color: '#007bff' }}>{log.date}</small>
                <p style={{ margin: '5px 0', fontWeight: '500' }}>{log.content}</p>
                <div style={{ fontSize: '13px', color: '#666' }}>
                   위치: {log.loc} {log.mapUrl && <a href={log.mapUrl} target="_blank" rel="noreferrer" style={{ marginLeft: '10px', color: '#28a745' }}>[지도보기]</a>}
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);