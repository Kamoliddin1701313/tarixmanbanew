import { useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-0125",
          messages: [
            {
              role: "system",
              content: "Siz O‘zbekiston tarixi bo‘yicha mutaxassissiz.",
            },
            ...newMessages.slice(-6),
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const reply = res.data.choices[0].message.content;
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      setInput("");
    } catch (err) {
      if (err.response?.status === 429) {
        alert("Juda tez-tez so‘rov yuborilyapti. Iltimos, biroz kuting.");
      } else {
        alert("Xatolik: " + err.message);
      }
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sun'iy intellekt bilan suhbat</h2>
      <div style={{ marginBottom: 20 }}>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <textarea
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Savolingizni yozing..."
        style={{ width: "100%" }}
      />
      <button onClick={handleSend}>Yuborish</button>
    </div>
  );
};

export default ChatPage;
