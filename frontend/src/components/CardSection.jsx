import React, { useEffect, useState } from 'react';
import { getCardsByTeamId, addCard, deleteCard } from '../services/cardService';
import CardModal from './CardModal';

const CardSection = ({ teamId, resultId, teamName }) => {
  const [cards, setCards] = useState([]);
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    fetchCards();
  }, [teamId]);

  const fetchCards = async () => {
    try {
      const fetchedCards = await getCardsByTeamId(teamId);
      setCards(fetchedCards);
    } catch (error) {
      console.error(`Error fetching cards for team ${teamId}:`, error.message);
      setCards([]);
    }
  };

  const handleAddCard = async (newCard) => {
    try {
      const addedCard = await addCard(newCard);
      setCards((prevCards) => [...prevCards, addedCard]);
    } catch (error) {
      console.error('Error adding card:', error.message);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      setCards((prevCards) => prevCards.filter((card) => card.cardId !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error.message);
    }
  };

  return (
    <div className="mb-6 border-2 rounded-lg p-5 m-2 shadow-md bg-white border-[#000071]">
      <h3 className="text-2xl font-bold text-center mb-4" style={{ color: '#000071' }}>
        {teamName} cards
      </h3>
      {cards.length === 0 ? (
        <div>No cards available for this team.</div>
      ) : (
        cards.map((card) => (
          <div
            key={card.cardId}
            className="flex items-center justify-between mb-3 p-3 rounded-lg border"
            style={{ borderColor: '#000071', backgroundColor: '#f9f9f9' }}
          >
            <span className="font-semibold text-gray-800">
              {card.player.name} - {card.type} - {card.time}'
            </span>
            <button
              className="bg-transparent hover:bg-[#ff0000] text-[#ff0000] font-semibold hover:text-white py-1 px-3 border border-[#ff0000] rounded-lg transition-colors duration-300"
              onClick={() => handleDeleteCard(card.cardId)}
            >
              Delete
            </button>
          </div>
        ))
      )}
      <button
        className="mt-4 w-full bg-[#000071] hover:bg-[#ff0000] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        onClick={() => setShowCardModal(true)}
      >
        Add Card
      </button>

      {showCardModal && (
        <CardModal
          teamId={teamId}
          resultId={resultId}
          onClose={() => setShowCardModal(false)}
          onSave={(cardDTO) => handleAddCard(cardDTO)}
        />
      )}
    </div>
  );
};

export default CardSection;
