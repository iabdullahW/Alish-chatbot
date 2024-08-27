import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { role: 'system', content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Chat Alish</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key press
          placeholder="Type your message..."
        />
        <button className='mr-2' onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;



// import  { useState } from 'react';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessage = { role: 'user', content: input };
//     setMessages([...messages, newMessage]);
//     setInput('');

//     try {
//       const response = await fetch('http://localhost:3000/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await response.json();
//       const botMessage = { role: 'system', content: data.response };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error fetching chatbot response:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-xl p-4 bg-gradient-to-r from-[#8F2AF6] to-[#5713AC] rounded-lg shadow-lg">
//         <div className="space-y-4">
//           {messages.map((msg, index) => (
//             <div key={index} className={p-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}}>
//               <span className="block">{msg.content}</span>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-grow p-2 rounded-l-lg focus:outline-none text-black"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-[#8F2AF6] p-2 rounded-r-lg hover:bg-[#5713AC]"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

