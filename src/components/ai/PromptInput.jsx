
import React, { useState } from 'react';

const PromptInput = ({ onSubmit, placeholder = 'Ask AI anything...' }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="card-base p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:outline-none"
        />

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default PromptInput;