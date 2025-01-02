export default function LoginPrompt() {
  return (
    <div className="p-6 bg-gray-900/50 border-t border-gray-700">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-2xl text-gray-200 font-medium text-center sm:text-left">
          Please login to continue the conversation
        </span>
      </div>
    </div>
  );
}
