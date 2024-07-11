import React from 'react';
import Section from './Section';

function Container({ title, like, setLike, bad, setBad, modal, setModal }) {
  return (
    <div className="container">
      {title.map((t, index) => (
        <Section key={index} title={t} index={index} like={like} setLike={setLike} bad={bad} setBad={setBad} />
      ))}
      <div>
        {modal && <div>Modal Content</div>}
        <button onClick={() => setModal(!modal)}>Open Modal</button>
      </div>
    </div>
  );
}

export default Container;