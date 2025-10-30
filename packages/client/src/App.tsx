import './App.css';
import ReviewList from './components/reviews/ReviewList';

export const App = () => {
   return (
      <div className="p-8 h-screen w-full">
         {/* <ChatBot /> */}
         <ReviewList productId={6} />
      </div>
   );
};

export default App;
