import React from 'react';
import { NavLink } from 'react-router-dom';
import './discographyPage.css';

const Discography = () => {
  return (
    <div className="discography-container">
      {/* Сетка изображений для вкладок */}
      <NavLink to="cowboysfromhell" className="discography-cell">
        <img src="cell1.jpg" alt="Album 1" />
      </NavLink>
      <NavLink to="vulgardisplayofpower" className="discography-cell">
        <img src="cell2.jpg" alt="Album 2" />
      </NavLink>
      <NavLink to="farbeyonddriven" className="discography-cell">
        <img src="cell3.jpg" alt="Album 3" />
      </NavLink>
      <NavLink to="thegreatsoutherntrendkill" className="discography-cell">
        <img src="cell4.jpg" alt="Album 4" />
      </NavLink>
      <NavLink to="officallive101proof" className="discography-cell">
        <img src="cell5.jpg" alt="Album 5" />
      </NavLink>
      <NavLink to="reinventingthesteel" className="discography-cell">
        <img src="cell6.jpg" alt="Album 6" />
      </NavLink>
      <NavLink to="3vulgarvideosfromhell" className="discography-cell">
        <img src="cell7.jpg" alt="Album 7" />
      </NavLink>
      <NavLink to="greatesthits" className="discography-cell">
        <img src="cell8.jpg" alt="Album 8" />
      </NavLink>
      <NavLink to="decadeofdomination" className="discography-cell">
        <img src="cell9.jpg" alt="Album 9" />
      </NavLink>
      <NavLink to="thecompletestudiocollectionsbox" className="discography-cell">
        <img src="cell10.jpg" alt="Album 10" />
      </NavLink>
    </div>
  );
};

export default Discography;
