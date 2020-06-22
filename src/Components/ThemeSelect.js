import React, { useState } from 'react';

const ThemeSelect = () => {
  const [themeValue, setThemeValue] = useState("light");

   const handleChange = event => {
     let value = event.target.value;
     let root = document.getElementById("root");
      setThemeValue(value);
      root.removeAttribute("class");
      root.classList.add(value);
  };

  return (
    <div className="theme-select">
      Theme:
      <input type="radio" value="light" name="light" onChange={handleChange} checked={themeValue === "light"}/>
      <label>light</label>
      <input type="radio" value="dark" name="dark" onChange={handleChange} checked={themeValue === "dark"}/>
      <label>dark</label>
    </div>
  );

}

export default ThemeSelect;