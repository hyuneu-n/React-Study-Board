// import logo from './logo.svg';
// import React, {useState} from 'react';
// import './App.css';
// import Modal from 'react-modal';

// function App() {
//   let data;
//   let [title, changeTitle] = useState(['Sample Sentence 1', 'Sample Sentence 2', 'Sample Sentence 3']);
//   let [like, likeFunction] = useState(0);
//   let [bad, badFunction] = useState(0);
//   let [showUI, UIFunc] = useState(false);
//   let [modal, modalFunc] = useState(false);

//   return (
//     <>
//     <div className="App">
//     	<div className="black-nav">
//     		<div>Hyuneun's Board</div>
//     		<div> { data } </div>
// 	  </div>
//     </div>
//     <div className="list">
//         <h3> {title[0]} <span onClick={() => { likeFunction(like + 1) }}> 👍🏻 </span> {like}</h3>
//         <p>24.07.09</p>
//         <hr />
//       </div>

//       <div className="list">
//         <h3> {title[1]} <span onClick={() => { badFunction(bad - 1) }}> 👎🏻 </span> {bad}</h3>
//         <p>24.07.10</p>
//         <hr />
//       </div>
//       <div className="list">
//         <h3> {title[2]} </h3>
//         <p>24.07.11</p>
//         <hr/>
//       </div>
//       <div>
        
//       {
//       modal === true
//       ? <Modal />
//       : null}
//     <button onClick={() => { UIFunc(true)} }>Open</button>
//     <button onClick={() => {modalFunc(!modal)}}>Btn</button>
//       {
//           modal === true
//           ? <Modal />
//           : null
//       }
//     </div>
//     </>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';

function App() {
  let [title, setTitle] = useState(['Sample Sentence 1', 'Sample Sentence 2', 'Sample Sentence 3']);
  let [like, setLike] = useState(0);
  let [bad, setBad] = useState(0);
  let [modal, setModal] = useState(false);

  return (
    <div className="App">
      <Header />
      <Container title={title} like={like} setLike={setLike} bad={bad} setBad={setBad} modal={modal} setModal={setModal} />
      <Footer />
    </div>
  );
}

export default App;