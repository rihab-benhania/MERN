import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Import de l'action applyPromoCode
import { addItem, removeItem, clearCart, applyPromoCode } from '../redux/cartSlice';

export default function Cart() {
  // Extraction de discountPercent depuis le Store Redux
  const { items, totalCount, totalPrice, discountPercent } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //  État local pour contrôler la saisie du champ texte
  const [promoInput, setPromoInput] = useState('');

  //  Calcul du montant total après déduction de la remise
  const discountedPrice = totalPrice * (1 - discountPercent / 100);

  return (
    <div className="cart-card">
      <div className="cart-header">
        <h3>Mon Panier Redux</h3>
        {items.length > 0 && (
          <button onClick={() => dispatch(clearCart())}>Vider</button>
        )}
      </div>
      {items.length === 0 ? (
        <p>Le panier est actuellement vide.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-row">
              <span>
                {item.name} ({item.price} DT x {item.quantity})
              </span>
              <div>
                <button onClick={() => dispatch(removeItem(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addItem(item))}>+</button>
              </div>
            </div>
          ))}

          {/*  Zone de saisie du code promo et bouton Appliquer */}
          <div style={{ margin: '14px 0', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Code promo (ex: POLY2027)"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid var(--bord)',
              }}
            />
            <button
              className="principal"
              onClick={() => dispatch(applyPromoCode(promoInput.trim()))}
            >
              Appliquer
            </button>
          </div>

          <p>
            Nombre total d'articles : <strong>{totalCount}</strong>
          </p>
          <p>
            Montant Total : <strong>{totalPrice} DT</strong>
          </p>

          {/* 6. Affichage conditionnel du montant remisé en vert */}
          {discountPercent > 0 && (
            <p className="remise">
              Montant remisé (-{discountPercent}%) : {discountedPrice} DT
            </p>
          )}
        </>
      )}
    </div>
  );
}