import BankCard from './BankCard';

function TabTarjetas({ cards, handleMakeDefault, handleDeleteCard, setShowCardModal }) {
  return (
    <div className="row g-4">
      {cards.map(card => (
        <div key={card._id} className="col-md-6 col-lg-4">
          <BankCard card={card} onMakeDefault={handleMakeDefault} onDelete={handleDeleteCard} />
        </div>
      ))}

      <div className="col-md-6 col-lg-4">
        <button className="add-card-btn" onClick={() => setShowCardModal(true)}>
          <i className="fas fa-plus-circle"></i>
          <span>Agregar nueva tarjeta</span>
        </button>
      </div>
    </div>
  );
}

export default TabTarjetas;
