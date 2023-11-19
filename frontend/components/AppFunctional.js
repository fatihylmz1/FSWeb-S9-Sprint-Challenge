import React, { useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
// const initialMessage = ''
// const initialEmail = ''
// const initialSteps = 0
// const initialIndex = 4 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [location, setLocation] = useState([2, 2]);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState("");

  function reset() {
    setLocation([2, 2]);
    setStep(0);
    setMessage("");
  }

  function onChange(evt) {

    setForm(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    let data = {
      x: location[0],
      y: location[1],
      steps: step,
      email: form,
    };
    setForm(evt.target.value);
    axios.post("http://localhost:9000/api/result", data)
      .then((response) => {
        console.log('Başarıyla alındı:', response.data);
        setMessage(response.data.message);
      })
      .catch((error) => {

        console.error('İstek başarısız:', error);

      });
  }

  function up() {
    setMessage("");
    if (location[1] > 1) {
      setLocation([location[0], location[1] - 1]);
      setStep(step + 1);
    } else {
      setMessage("Yukarıya gidemezsiniz");
    }
  }

  function right() {
    setMessage("");
    if (location[0] < 3) {
      setLocation([location[0] + 1, location[1]]);
      setStep(step + 1);
    } else {
      setMessage("Sağa gidemezsiniz");
    }
  }

  function down() {
    setMessage("");
    if (location[1] < 3) {
      setLocation([location[0], location[1] + 1]);
      setStep(step + 1);
    } else {
      setMessage("Aşağıya gidemezsiniz");
    }
  }

  function left() {
    setMessage("");
    if (location[0] > 1) {
      setLocation([location[0] - 1, location[1]]);
      setStep(step + 1);
    } else {
      setMessage("Sola gidemezsiniz");
    }
  }
  const initialIndex = (location[1] - 1) * 3 + location[0] - 1;

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({location.join(", ")})</h3>
        <h3 id="steps">{step} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === initialIndex ? ' active' : ''}`}>
              {idx === initialIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={left}>SOL</button>
        <button id="up" onClick={up}>YUKARI</button>
        <button id="right" onClick={right}>SAĞ</button>
        <button id="down" onClick={down}>AŞAĞI</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="email girin" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
