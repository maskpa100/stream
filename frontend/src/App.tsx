import React, { useState } from "react";

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const startStream = async () => {
    const response = await fetch("http://localhost:5000/stream");
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => [...prev, chunk]);
      }
    }
  };

  return (
    <div>
      <button onClick={startStream}>Начать стрим</button>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
