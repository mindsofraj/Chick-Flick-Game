import React, { Children, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { fetchHeroineImages } from "./api/fetchActress";
import Loader from "./components/Loader";

const App = () => {
  const [popularActress, setPopularActress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [count, setCount] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);

  // Fetching random pages of heroines from api during compoent mount
  const fetchImage = async () => {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * (500 - 1 + 1) + 1);
    const res = await fetchHeroineImages(randomPage);
    if (res.code == "ERR_NETWORK") {
      setErrorMsg("Please Check Your Network Connection!");
    } else {
      if (res.length == 8) {
        const shuffledCards = [...res, ...res]
          .map((heroine) => ({
            ...heroine,
            matched: false,
            uniqueId: Math.random(),
          }))
          .sort(() => Math.random() - 0.5);
        setPopularActress(shuffledCards);
        setLoading(false);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  const handleClick = (id) => {
    choiceOne ? setChoiceTwo(id) : setChoiceOne(id);
    setTurns((prev) => prev + 1);
  };

  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  // Compare Choice
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      let choiceOneId = null;
      let choiceTwoId = null;

      choiceOneId = popularActress.filter((heroine) => {
        const values = Object.values(heroine);
        if (values[9] == choiceOne) {
          return heroine;
        }
      })[0].id;
      choiceTwoId = popularActress.filter((heroine) => {
        const values = Object.values(heroine);
        if (values[9] == choiceTwo) {
          return heroine;
        }
      })[0].id;

      if (choiceOneId === choiceTwoId) {
        if (count == 8) {
          if (turns <= 25) {
            setMsg(`You took only ${turns} turns, You are a Genius!`);
          } else {
            setMsg(`You took ${turns} turns, Keep Sharpening!`);
          }
          setTurns(0);
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } else {
          setCount(count + 1);
        }

        setPopularActress((prevCards) => {
          return prevCards.map((heroine) => {
            if (heroine.id === choiceOneId) {
              return { ...heroine, matched: true };
            } else {
              return heroine;
            }
          });
        });

        resetChoice();
      } else {
        setTimeout(() => {
          resetChoice();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      {errorMsg || msg ? (
        <div className="errorMsg">
          {errorMsg}
          {msg}
        </div>
      ) : (
        <div className="wrapper">
          {loading && (
            <div className="loader">
              <Loader />
            </div>
          )}
          {!loading && (
            <div className="header">
              <span className="title">Chick Flick</span>
              <div className="countBox">
                <label htmlFor="count">TURNS</label>
                <span className="count">{turns}</span>
              </div>
            </div>
          )}
          <div
            className="cards"
            style={loading ? { display: "none" } : { display: "grid" }}
          >
            {!loading &&
              popularActress.map((heroine, i) => (
                <Card
                  key={i}
                  name={heroine.name}
                  matched={
                    heroine.uniqueId === choiceOne ||
                    heroine.uniqueId === choiceTwo ||
                    heroine.matched
                  }
                  handleClick={() => {
                    handleClick(heroine.uniqueId);
                  }}
                  disabled={disabled}
                  src={`https://image.tmdb.org/t/p/w500/${heroine.profile_path}`}
                />
              ))}
          </div>
          {!loading && (
            <div className="footer">
              <a href="https://www.youtube.com/mindsofraj" target="_blank">
                ©MINDS OF RAJ 2023
              </a>
              <span>. All rights reserved</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
