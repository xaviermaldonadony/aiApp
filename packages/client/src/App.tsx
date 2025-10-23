import './App.css';
import ChatBot from './components/chat/ChatBot';

export const App = () => {
   return (
      <div className="p-8 h-screen w-full">
         <ChatBot />
      </div>
   );
};

export default App;
