'use client'

import React, { useState } from 'react';

function Shiritori() {
    const [inputValue, setInputValue] = useState('');
    const [playerTurn, setPlayerTurn] = useState(1);
    const [wordPool, setwordPool] = useState<string[]>(['tahsin', 'amin']);
    const [errorMsg, setErrorMsg] = useState('');
    const [wordsPlayer1, setWordsPlayer1] = useState<string[]>(['tahsin']);
    const [wordsPlayer2, setWordsPlayer2] = useState<string[]>(['amin']);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (wordPool.includes(inputValue)) {
            setErrorMsg(`The word '${inputValue}', has already been used!`)
        } else {
            setErrorMsg('');
            console.log('Form submitted with value:', inputValue);
            setWordsPlayer1([...wordsPlayer1, inputValue])
            setwordPool([...wordPool, inputValue]);
            setInputValue('');
            setPlayerTurn(prev => prev == 1 ? 2 : 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div className='flex justify-center items-center'>
            <div>
                <div className='flex gap-10'>
                    <div className={`p-2 player-1 ${playerTurn == 1 ? 'bg-gray-200' : ''} `}>
                        {wordsPlayer1.map((word, index) => {
                            return (
                                <div key={index}>{word}</div>
                            )
                        })}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleChange}
                                className='border-black'
                                placeholder="Enter something"
                            />
                            <button type="submit">Submit</button>
                        </form>

                    </div>

                    <div className={`p-2 player-2 ${playerTurn == 2 ? 'bg-gray-200' : ''} `}>
                        Player 2
                        {wordsPlayer2.map((word, index) => {
                            return (
                                <div key={index}>{word}</div>
                            )
                        })}
                    </div>

                </div>
                {errorMsg && <p>{errorMsg}</p>}
            </div>
        </div>
    );
}

export default Shiritori;