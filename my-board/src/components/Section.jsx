import React from 'react';

function Section({ title, index, like, setLike, bad, setBad }) {
  return (
    <div className="list">
      <h3> 
        {title} 
        <span onClick={() => setLike(like + 1)}> 👍🏻 </span> {like}
        <span onClick={() => setBad(bad - 1)}> 👎🏻 </span> {bad}
      </h3>
      <p>{`24.07.${index + 9}`}</p>
      <hr />
    </div>
  );
}

export default Section;