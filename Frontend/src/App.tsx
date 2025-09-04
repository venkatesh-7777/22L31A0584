import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ItemDetailPage from './pages/ItemDetailPage';
import CreateItemPage from './pages/CreateItemPage';
import EditItemPage from './pages/EditItemPage';
import { Log } from '../../LoggingMiddleware/src/logger';
import './styles/global.css';

const App: React.FC = () => {
console.log("Log function available:", typeof Log === 'function');

// Then add a test log
useEffect(() => {
  console.log("Testing log function...");
  try {
    Log('frontend', 'info', 'page', 'Testing log function');
    console.log("Log function called successfully");
  } catch (error) {
    console.error("Error using Log function:", error);
  }
}, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/items/new" element={<CreateItemPage />} />
            <Route path="/items/edit/:id" element={<EditItemPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;