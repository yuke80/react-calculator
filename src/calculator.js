import React, { useState } from "react";
import "./App.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");
  
  const handleButtonClick = (value) => {
    if (!isNaN(value) || value === ".") {
      // 数字または小数点がクリックされた場合、状況に応じて現在の値と表示内容を更新します
      if (value === "." && currentValue.includes(".")) return;
      setCurrentValue((prevValue) => prevValue + value);
      setDisplay((prevDisplay) => {
        if (prevDisplay === "0" || operator === "=") {
          return value;
        } else {
          return prevDisplay + value;
        }
      });

      if (operator === "=") {
        // 以前の演算子が "=" の場合、現在の値と演算子をリセットします
        setCurrentValue(value);
        setOperator("");
      }
    } else if (value === "AC") {
      // "AC" ボタンがクリックされた場合、すべての状態をリセットします
      setDisplay("0");
      setCurrentValue("");
      setPreviousValue("");
      setOperator("");
    } else if (value === "+/-") {
      // "+/-" ボタンがクリックされた場合、現在の値の符号を切り替えます
      setCurrentValue((prevValue) => (parseFloat(prevValue) * -1).toString());
      setDisplay((prevDisplay) => (parseFloat(prevDisplay) * -1).toString());
    } else if (value === "%") {
      // "%" ボタンがクリックされた場合、現在の値を100で割ります
      setCurrentValue((prevValue) => (parseFloat(prevValue) / 100).toString());
      setDisplay((prevDisplay) => (parseFloat(prevDisplay) / 100).toString());
    } else if (value === "=") {
      // "=" ボタンがクリックされた場合、計算を実行し表示内容を更新します
      if (previousValue !== "") {
        let result = operate(previousValue, currentValue, operator);
        setDisplay(result.toString());
        setCurrentValue("");
        setPreviousValue(result.toString());
      }
    } else {
      // "="以外の演算子ボタンがクリックされた場合、現在の状態に応じて計算操作を実行します
      if (currentValue !== "") {
        if (previousValue !== "") {
          let result = operate(previousValue, currentValue, operator);
          setDisplay(result.toString() + value);
          setCurrentValue("");
          setPreviousValue(result.toString());
        } else {
          setDisplay((prevDisplay) => prevDisplay + value);
          setPreviousValue(currentValue);
          setCurrentValue("");
        }
      }
      //クリックされた演算子が新しい演算子として設定します
      setOperator(value);
    }
  };

  const operate = (val1, val2, op) => {
    let num1 = parseFloat(val1);
    let num2 = parseFloat(val2);
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "×":
        return num1 * num2;
      case "÷":
        return num1 / num2;
      default:
        return num2;
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={() => handleButtonClick("AC")}>AC</button>
        <button onClick={() => handleButtonClick("+/-")}>+/-</button>
        <button onClick={() => handleButtonClick("%")}>%</button>
        <button onClick={() => handleButtonClick("÷")}>÷</button>
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick("×")}>×</button>
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("+")}>+</button>
        <button onClick={() => handleButtonClick("0")}>0</button>
        <button onClick={() => handleButtonClick(".")}>.</button>
        <button onClick={() => handleButtonClick("=")}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
