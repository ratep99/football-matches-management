import React from 'react';

const CardSection = ({ title, cards, onAddCard, onDeleteCard }) => (
  <div className="mb-6 border-2 rounded-lg p-5 m-2 shadow-md bg-white border-[#000071]">
    <h3 className="text-2xl font-bold text-center mb-4" style={{ color: '#000071' }}>{title}</h3>
    {cards.map((card) => (
      <div
        key={card.cardId}
        className="flex items-center justify-between mb-3 p-3 rounded-lg border"
        style={{ borderColor: '#000071', backgroundColor: '#f9f9f9' }}
      >
        <span className="font-semibold text-gray-800">{card.player.name} - {card.type} - {card.time}'</span>
        <button
          className="bg-transparent hover:bg-[#ff0000] text-[#ff0000] font-semibold hover:text-white py-1 px-3 border border-[#ff0000] rounded-lg transition-colors duration-300"
          onClick={() => onDeleteCard(card.cardId)}
        >
          Delete
        </button>
      </div>
    ))}
    <button
      className="mt-4 w-full bg-[#000071] hover:bg-[#ff0000] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
      onClick={onAddCard}
    >
      Add Card
    </button>
  </div>
);

export default CardSection;
