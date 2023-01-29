import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const FullPizza: React.FC = () => {
  // ukazujemy ze moze jedynie sie ukazywac typ: obj z zadanymi takimi polami
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: "",
    title: "",
    price: 0,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const URL = "https://639f1d625eb8889197f4b7be.mockapi.io/items/" + id;

    async function fetchPizza() {
      // dobre pisanie jest, jesli przy zaprosach lapie sie errory
      // znak dobrego programisty
      try {
        const { data } = await axios.get(URL);

        setPizza(data);
      } catch (error) {
        alert("Error during the get request");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container container__pizza">
      <img src={pizza.imageUrl} alt="pizza image" />
      <div className="container__pizza_div">
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} eu.</h4>
        <Link to="/">
          <button className="button button--outline button--add container__pizza_div_btn">
            <span>Back</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
