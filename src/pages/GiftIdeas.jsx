export default function GiftIdeas() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">
        🎁 Perfect Gift Ideas
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Find the best personalized gift ideas for your match based on their
        interests!
      </p>

      {/* Placeholder Cards for Gift Ideas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Customized Jewelry", emoji: "💍" },
          { name: "Experience Gift (Concert, Spa, etc.)", emoji: "🎫" },
          { name: "Subscription Box (Food, Books, etc.)", emoji: "📦" },
          { name: "Tech Gadgets", emoji: "📱" },
          { name: "Personalized Photo Album", emoji: "📸" },
          { name: "DIY Handmade Gifts", emoji: "🛠️" },
        ].map((gift, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <span className="text-4xl mb-2">{gift.emoji}</span>
            <p className="text-lg font-semibold">{gift.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
