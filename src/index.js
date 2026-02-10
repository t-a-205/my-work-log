import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#333' }}>🚀 우리 회사 업무일지 웹사이트</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>와! 드디어 첫 페이지가 열렸어!</p>
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', display: 'inline-block' }}>
        지금 이 화면이 보인다면 배포 성공이야! 🎉
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);