import React from "react";

const Card = ({ data }) => {
  const { dt_txt, main, weather } = data;
  const hora = dt_txt.split(" ")[1].slice(0, 5);

  return (
    <section>
      <p>{hora}</p>
      <p>{weather[0].description}</p>
      <p>{main.temp}ºC</p>
    </section>
  );
};

export default Card;