import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from './Modal'; 
const ProtectedRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.user?.token); 
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!token) {
      setModalOpen(true);
    }
  }, [token]);

  if (!token) {
    return (
      <div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
        <Navigate to="/login" replace />
      </div>
    );
  }

  return <Component />;
};

export default ProtectedRoute;
