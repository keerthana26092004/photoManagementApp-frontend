import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UploadPage from './components/UploadPage';
import GalleryPage from './components/GalleryPage';
import RegisterPage from './components/RegisterPage'; 
import LoginPage from './components/LoginPage';
import DetailsPage from './components/DetailsPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
       
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/upload" 
            element={<ProtectedRoute component={UploadPage} />} 
          />
          <Route 
            path="/gallery" 
            element={<ProtectedRoute component={GalleryPage} />} 
          />
          <Route 
            path="/photo/:id" 
            element={<ProtectedRoute component={DetailsPage} />} 
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
