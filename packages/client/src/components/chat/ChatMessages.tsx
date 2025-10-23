import { useEffect, useRef, type ClipboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
   content: string;
   role: 'user' | 'bot';
};

type Props = {
   messages: Message[];
};

const getRoleColor = (role: string) =>
   `px-3 py-1 rounded-xl ${role == 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black self-start text-left'}`;

const ChatMessages = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   const onCopyMessage = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };

   return (
      <div className="flex flex-col gap-3">
         {messages.map((message, index) => (
            <div
               onCopy={onCopyMessage}
               key={index}
               ref={index === messages.length - 1 ? lastMessageRef : null}
               className={getRoleColor(message.role)}
            >
               <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
