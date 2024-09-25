import React, { useState, useRef, useEffect } from "react";
import "./chatPopup.scss";

interface Message {
  sender: "user" | "reader";
  content: string;
}

const responses = [
  "Hãy bình tĩnh, mọi việc rồi sẽ ổn thỏa.",
  "Lá bài cho thấy bạn cần tập trung vào cảm xúc của mình.",
  "Tương lai của bạn có nhiều tiềm năng!",
  "Bạn sẽ gặp một người quan trọng trong thời gian tới.",
  "Hãy cân nhắc kỹ trước khi đưa ra quyết định.",
  "Năng lượng tích cực đang đến với bạn.",
  "Hãy tin vào bản thân, bạn có thể vượt qua thử thách này.",
  "Đừng lo lắng quá, mọi thứ sẽ sáng tỏ vào thời điểm thích hợp.",
  "Cần phải buông bỏ quá khứ để tiến về phía trước.",
  "Những cơ hội mới đang mở ra cho bạn, hãy đón nhận chúng.",
  "Lá bài khuyên bạn nên kiên nhẫn và chờ đợi thời điểm thích hợp.",
  "Hãy lắng nghe trực giác của bạn, nó sẽ dẫn dắt bạn đúng hướng.",
  "Một sự thay đổi lớn đang đến gần, hãy chuẩn bị tinh thần.",
  "Mối quan hệ của bạn đang có dấu hiệu tốt, hãy tiếp tục vun đắp.",
  "Bạn cần dành thời gian để nghỉ ngơi và lấy lại năng lượng.",
];

function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // User's message
      setMessages([...messages, { sender: "user", content: newMessage }]);
      setNewMessage("");

      // Response from the tarot reader
      setTimeout(() => {
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        setMessages((prev) => [
          ...prev,
          { sender: "reader", content: randomResponse },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={`chat-popup ${isOpen ? "open" : ""}`}>
      <div className="chat-popup__header" onClick={toggleChat}>
        Chat with Tarot Reader
      </div>
      {isOpen && (
        <div className="chat-popup__content">
          <div className="chat-popup__messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-popup__message chat-popup__message--${message.sender}`}
              >
                {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-popup__input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPopup;
