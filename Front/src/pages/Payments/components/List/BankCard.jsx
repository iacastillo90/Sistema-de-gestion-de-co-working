function BankCard({ card, onMakeDefault, onDelete }) {
  const brandClass = {
    'Visa': 'bank-card-visa',
    'Mastercard': 'bank-card-mastercard',
    'Amex': 'bank-card-amex'
  }[card.brand] || 'bank-card-default-bg';

  const brandIcon = {
    'Visa': 'fa-cc-visa',
    'Mastercard': 'fa-cc-mastercard',
    'Amex': 'fa-cc-amex'
  }[card.brand] || 'fa-credit-card';

  return (
    <div className={`bank-card ${brandClass} h-100`}>
      {card.is_default && <div className="bank-card-default-badge">PREDETERMINADA</div>}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div className="bank-card-chip"></div>
        <i className={`fab ${brandIcon} bank-card-brand-logo`}></i>
      </div>
      <div className="bank-card-number mb-4">
        •••• •••• •••• {card.last4}
      </div>
      <div className="bank-card-footer">
        <div>
          <div className="bank-card-label">Titular</div>
          <div className="bank-card-value">{card.card_holder}</div>
        </div>
        <div className="text-end">
          <div className="bank-card-label">Expira</div>
          <div className="bank-card-value">
            {String(card.exp_month).padStart(2, '0')}/{String(card.exp_year).slice(-2)}
          </div>
        </div>
      </div>

      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-75 opacity-0 hover-overlay transition-opacity p-3" style={{ zIndex: 10, borderRadius: '20px' }}>
        {!card.is_default && (
          <button className="btn btn-sm btn-light w-100 mb-2 fw-bold" onClick={() => onMakeDefault(card._id)}>
            Marcar como predeterminada
          </button>
        )}
        <button className="btn btn-sm btn-danger w-100 fw-bold" onClick={() => onDelete(card._id)}>
          Eliminar tarjeta
        </button>
      </div>
      <style>{`
        .hover-overlay:hover { opacity: 1 !important; }
        .transition-opacity { transition: opacity 0.2s ease-in-out; }
      `}</style>
    </div>
  );
}

export default BankCard;
