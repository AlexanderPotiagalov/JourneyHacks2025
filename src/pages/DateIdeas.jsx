export default function DateIdeas() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">🍽️ Date Ideas</h1>
      <p className="text-gray-700 text-lg mb-6">
        Need inspiration for the perfect date? Try these ideas!
      </p>

      {/* Placeholder Cards for Date Ideas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Picnic at the Park", emoji: "🌳" },
          { name: "Cooking Together", emoji: "👨‍🍳" },
          { name: "Movie Night", emoji: "🎬" },
          { name: "Amusement Park Date", emoji: "🎢" },
          { name: "Museum or Art Gallery", emoji: "🖼️" },
          { name: "Hiking & Adventure", emoji: "🥾" },
        ].map((date, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <span className="text-4xl mb-2">{date.emoji}</span>
            <p className="text-lg font-semibold">{date.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
