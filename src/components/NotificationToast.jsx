import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../redux/uiSlice';

export default function NotificationToast() {
  // 1. Lecture sélective de l'état UI dans Redux
  const { message, visible } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  // 2. Minuterie de 3 secondes pour masquer automatiquement le toast
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);

    // 3. Nettoyage du timer si un nouveau produit est cliqué avant la fin des 3s
    return () => clearTimeout(timer);
  }, [visible, message, dispatch]);

  // 4. Ne rien rendre dans le DOM tant que visible est false
  if (!visible) return null;

  // 5. Rendu avec la classe .toast définie dans index.css
  return <div className="toast">{message}</div>;
}

