'use client'

import React, { useState } from 'react';

function Shiritori() {

    const [playerTurn, setPlayerTurn] = useState(1);
    const [wordPool, setWordPool] = useState<string[]>(['tahsin', 'amin']);
    const [errorMsg, setErrorMsg] = useState('');

    const [wordsPlayer1, setWordsPlayer1] = useState<string[]>(['tahsin']);
    const [score1, setScore1] = useState(100);
    const [inputValue1, setInputValue1] = useState('');

    const [wordsPlayer2, setWordsPlayer2] = useState<string[]>(['amin']);
    const [score2, setScore2] = useState(100);
    const [inputValue2, setInputValue2] = useState('');


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (wordPool.includes(inputValue1)) {
            setErrorMsg(`The word '${inputValue1}', has already been used!`)
        } else {
            setErrorMsg('');
            console.log('Form submitted with value:', inputValue1);
            setWordsPlayer1([...wordsPlayer1, inputValue1]);
            setWordPool([...wordPool, inputValue1]);
            setScore1(score => score - 10);
            setInputValue1('');
            setPlayerTurn(prev => prev == 1 ? 2 : 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue1(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (wordPool.includes(inputValue2)) {
            setErrorMsg(`The word '${inputValue2}', has already been used!`)
        } else {
            setErrorMsg('');
            console.log('Form submitted with value:', inputValue2);
            setWordsPlayer2([...wordsPlayer1, inputValue2]);
            setWordPool([...wordPool, inputValue2]);
            setScore2(score => score - 10);
            setInputValue2('');
            setPlayerTurn(prev => prev == 1 ? 2 : 1);
        }
    };

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue2(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div className='flex justify-center items-center'>
            <div>
                <div className='flex gap-10'>
                    <div className={`p-2 player-1 ${playerTurn == 1 ? 'bg-gray-200' : ''} `}>
                        <h1>Score: {score1}</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={inputValue1}
                                onChange={handleChange}
                                className='border-black'
                                placeholder="Enter something"
                            />
                            <button type="submit">Submit</button>
                        </form>
                        {wordsPlayer1.map((word, index) => {
                            return (
                                <div key={index}>{word}</div>
                            )
                        })}
                    </div>

                    <div className={`p-2 player-2 ${playerTurn == 2 ? 'bg-gray-200' : ''} `}>
                        <h1>Score: {score2}</h1>
                        <form onSubmit={handleSubmit2}>
                            <input
                                type="text"
                                value={inputValue2}
                                onChange={handleChange2}
                                className='border-black'
                                placeholder="Enter something"
                            />
                            <button type="submit">Submit</button>
                        </form>
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