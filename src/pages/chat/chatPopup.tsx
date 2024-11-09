import React, { useState, useRef, useEffect } from "react";
import "./chatPopup.scss";

interface Message {
  sender: "user" | "reader";
  content: string;
}

const keywords: Record<string, string> = {
  "The Fool": `
<strong> Ý nghĩa của lá bài The Fool</strong>

<strong>Tình Yêu</strong>  
- <strong>Xuôi</strong>: Khi <strong>The Fool</strong> xuất hiện xuôi trong các vấn đề tình cảm, nó báo hiệu một mối quan hệ mới đầy lãng mạn và đam mê. Đây là thời điểm thích hợp để mở lòng và tận hưởng những cảm xúc tươi mới.
- <strong>Ngược</strong>: <strong>The Fool</strong> ngược cảnh báo về sự vội vàng trong tình cảm, thiếu cam kết hoặc dễ bị lừa dối. Cần thận trọng và suy xét kỹ lưỡng trước khi đưa ra quyết định quan trọng trong chuyện tình cảm.

<strong>Sự Nghiệp</strong>  
- <strong>Xuôi</strong>: <strong>The Fool</strong> xuôi trong bối cảnh công việc mang đến cơ hội thay đổi, thăng tiến hoặc bắt đầu một sự nghiệp mới phù hợp với đam mê. Đây là thời điểm thích hợp để theo đuổi ước mơ và khám phá tiềm năng của bản thân.
- <strong>Ngược</strong>: <strong>The Fool</strong> ngược cho thấy sự thiếu định hướng, bỏ bê công việc hoặc đưa ra quyết định thiếu sáng suốt có thể dẫn đến thất bại. Cần xác định rõ mục tiêu và lập kế hoạch cẩn thận trước khi hành động.

<strong>Sức Khỏe</strong>  
- <strong>Xuôi</strong>: Với <strong>The Fool</strong> xuôi, lá bài này mang đến năng lượng tích cực và sự khởi đầu của một lối sống lành mạnh hơn. Đây là thời điểm thích hợp để bắt đầu một chế độ ăn uống mới, tập thể dục hoặc khám phá các phương pháp chăm sóc sức khỏe khác.
- <strong>Ngược</strong>: <strong>The Fool</strong> ngược cảnh báo về sự thiếu chú ý đến sức khỏe, dễ gặp tai nạn hoặc chấn thương do hành động bốc đồng. Cần thận trọng và lắng nghe cơ thể để tránh những rủi ro không đáng có.
  `,
  "The Magician": `
<strong> Ý nghĩa của lá bài The Magician</strong>

<strong>Tình Yêu</strong>  
- <strong>Xuôi</strong>: <strong>The Magician</strong> xuôi cho thấy bạn đang có sức hấp dẫn mạnh mẽ và dễ dàng thu hút sự chú ý của người khác giới. Hãy tự tin thể hiện bản thân, tạo dựng các mối quan hệ mới và mở lòng với tình yêu.
- Mối quan hệ lãng mạn và nồng nhiệt: Lá bài này cũng báo hiệu một mối quan hệ đầy đam mê, lãng mạn và kết nối sâu sắc. Hãy dành thời gian cho đối phương, thể hiện tình cảm và tạo dựng những kỷ niệm đáng nhớ cùng nhau.

<strong>Sự Nghiệp</strong>  
- <strong>Xuôi</strong>: <strong>The Magician</strong> xuôi báo hiệu rằng bạn đang có cơ hội lớn để thăng tiến trong công việc hoặc gặt hái thành công trong một dự án quan trọng. Hãy nắm bắt cơ hội, thể hiện năng lực và tạo ra kết quả xuất sắc.
- Sử dụng kỹ năng để giải quyết vấn đề: Lá bài này cũng cho thấy khả năng của bạn trong việc sử dụng kỹ năng, kiến thức và sự sáng tạo để giải quyết các vấn đề trong công việc. Hãy tin tưởng vào bản thân và áp dụng tư duy đột phá để tìm ra giải pháp hiệu quả.

<strong>Sức Khỏe</strong>  
- <strong>Xuôi</strong>: <strong>The Magician</strong> xuôi cho thấy bạn đang có sức khỏe tốt, cơ thể dẻo dai và khả năng phục hồi nhanh chóng. Hãy duy trì lối sống lành mạnh và quản lý stress hiệu quả.
- Cần duy trì lối sống lành mạnh: Lá bài này cũng nhắc nhở tầm quan trọng của việc duy trì một lối sống lành mạnh để bảo vệ sức khỏe. Hãy chú ý đến chế độ ăn uống, tập thể dục đều đặn, ngủ đủ giấc và quản lý stress hiệu quả.
  `,
  "The High Priestess": `
<strong> Ý nghĩa của lá bài The High Priestess</strong>

<strong>Tình Yêu:</strong>  
  Khi <strong>The High Priestess</strong> xuất hiện trong các vấn đề tình cảm, nó thường báo hiệu một mối liên kết tâm hồn sâu sắc. Đây là thời điểm để lắng nghe trực giác và tìm hiểu sâu hơn về bản thân cũng như đối phương. Lá bài này cũng có thể cho thấy một giai đoạn tạm lắng để suy ngẫm và cân nhắc về mối quan hệ.

<strong>Sự Nghiệp:</strong>  
  Trong lĩnh vực sự nghiệp, <strong>The High Priestess</strong> thường gợi ý rằng bạn cần khai thác khả năng sáng tạo và trực giác của mình. Đây là lúc để học hỏi thêm kiến thức mới, phát triển kỹ năng và mở rộng tầm nhìn. Lá bài này cũng nhắc nhở bạn lắng nghe tiếng nói nội tâm và tin tưởng vào con đường mình đang theo đuổi.


<strong>Sức Khỏe:</strong>  
  <strong>The High Priestess</strong> xuôi trong lĩnh vực sức khỏe nhấn mạnh tầm quan trọng của việc chăm sóc sức khỏe tinh thần và cảm xúc. Đây là thời điểm để lắng nghe cơ thể, tìm kiếm sự cân bằng nội tâm và thực hành các phương pháp thư giãn như thiền, yoga. Lá bài này cũng gợi ý rằng các vấn đề sức khỏe có thể có nguyên nhân sâu xa từ tinh thần.
  `,
};

const responses = [
  "Hãy bình tĩnh, mọi việc rồi sẽ ổn thỏa.",
  "Tương lai của bạn có nhiều tiềm năng!",
  "Bạn sẽ gặp một người quan trọng trong thời gian tới.",
  "Hãy cân nhắc kỹ trước khi đưa ra quyết định.",
  "Năng lượng tích cực đang đến với bạn.",
  "Hãy tin vào bản thân, bạn có thể vượt qua thử thách này.",
];

function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "user", content: newMessage }]);
      setNewMessage("");

      setIsLoading(true);

      setTimeout(() => {
        const messageContent = newMessage.toLowerCase();

        const tarotResponse = Object.keys(keywords).find((key) =>
          messageContent.includes(key.toLowerCase())
        );

        const responseContent = tarotResponse
          ? keywords[tarotResponse]
          : responses[Math.floor(Math.random() * responses.length)];

        setMessages((prev) => [
          ...prev,
          { sender: "reader", content: responseContent },
        ]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

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
                dangerouslySetInnerHTML={{ __html: message.content }}
              ></div>
            ))}
            {isLoading && (
              <div className="chat-popup__message chat-popup__message--reader">
                Đang suy nghĩ <span className="loading-dot">.</span>
              </div>
            )}
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
