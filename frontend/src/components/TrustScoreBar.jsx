export default function TrustScoreBar({ score }) {
  return (
    <div>
      <div className="w-full bg-gray-200 h-3 rounded">
        <div
          className={`h-3 rounded ${
            score > 75 ? "bg-green-600" : score > 50 ? "bg-yellow-500" : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-sm mt-1">{score}/100</p>
    </div>
  );
}
