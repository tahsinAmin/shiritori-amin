'use client'

import { useState } from "react";

export default function Home() {
  const player = 1;
  const [word, setWord] = useState('');
  const [word2, setWord2] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'player-1') {
      setWord(value);
    } else {
      setWord2(value);
    }
  }

  const handleSubmit = () => {

  }
  return (
    <div className="flex gap-10">
      <form onSubmit={handleSubmit} className={`column-one border border-black h-[50vh] ${player === 1 ? "bg-green-500" : "bg-red-500"}`}>
        <div className="">Player 1</div>
        <input type="text" name={'player-1'} value={word} onChange={handleChange} />
      </form>
      <div className={`column-two border border-black h-[50vh] ${player === 1 ? "bg-green-500" : "bg-red-500"}`}>
        <div className="">Player 2</div>
        <input type="text" name={'player-2'} value={word2} onChange={handleChange} />
      </div>
    </div>
  );
}
