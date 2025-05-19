import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";

const WeatherList = () => {
  const [city, setCity] = useState([]);
  const [values, setValues] = useState({ city: "" });
  const inputRef = useRef("");

  useEffect(() => {
    const getCity = async () => {
      const resp = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=Madrid&appid=c6df16e7c05fc8b9db3d4f29609df70f&units=metric&lang=es'
      );
      const data = await resp.json();
      setCity(data.list); // todas las  entradas
    };

    getCity();
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${values.city}&appid=c6df16e7c05fc8b9db3d4f29609df70f&units=metric&lang=es`
    );
    const data = await resp.json();
    setCity(data.list);
  };

  // Agrupar las franjas por día
  const agruparPorDia = () => {
    const dias = {};

    city.forEach((item) => {
      const fecha = item.dt_txt.split(" ")[0]; 
      if (!dias[fecha]) {
        dias[fecha] = [];
      }
      dias[fecha].push(item);
    });

    return dias;
  };

  const renderCardsAgrupadas = () => {
    const dias = agruparPorDia();

    return Object.entries(dias).map(([fecha, items], i) => (
      <div key={i}>
        <h2>{fecha}</h2>
        {items.map((item, j) => (
          <Card key={j} data={item} />
        ))}
      </div>
    ));
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
        <label htmlFor="city">Ciudad</label><br />
        <input
          type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
        />
        {values.city ? (
          <button type="submit">Buscar ciudad</button>
        ) : (
          <b>Rellena el campo para poder enviar</b>
        )}
      </form>

        {renderCardsAgrupadas()}
    </>
  );
};

export default WeatherList;