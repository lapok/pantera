import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainWindow from './main-window';
import NewsPage from './NewsPage';
import Discography from './discographyPage';
import Tours from './toursPage';
import Layout from './Layout';
import { useState, useEffect } from 'react';


// Импорты для вкладок с дискографии

import CfhPage from './albumTabs/cowboysFromHellPage';
import VdpPage from './albumTabs/vulgarDisplayOfPower';
import FbdPage from './albumTabs/farBeyondDriven';
import GstPage from './albumTabs/theGreatSouthernTrendkill';
import OflpPage from './albumTabs/officalLive101Proof';
import RtsPage from './albumTabs/reinventingthesteel';
import TVVFHPage from './albumTabs/threeVulgarVideosFromHell';
import GHitsPage from './albumTabs/greatestHits';
import DODPage from './albumTabs/decadeOfDomination';
import TCSCPage from './albumTabs/theCompleteStudioCollections';
import NotFoundPage from './NotFoundPage';

// Импорты для вкладок об артистах

import AboutDimebag from './aboutDimebag';
import AboutPhilip from './aboutPhilip';
import AboutRex from './aboutRex';
import AboutVinnie from './aboutVinnie';

function App() {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [showAddNewsForm, setShowAddNewsForm] = useState(false);

  const handleNewsAdded = (newNews) => {
    setNews((prevNews) => [newNews, ...prevNews.slice(0, 1)]);
  };


  return (
    <Router>
      <Routes>
        {/* Обертка Layout для всех страниц */}
        <Route path="/" element={
          <Layout
            user={user}
            onProfileClick={(userToView) => {
              // Логика для профиля
            }}
            onAuthClick={() => {
              // Логика для авторизации
            }}
            news={news}
            showAddNewsForm={showAddNewsForm}
            setShowAddNewsForm={setShowAddNewsForm}
            handleNewsAdded={handleNewsAdded}
          />
        }>
          {/* Главная страница */}
          <Route index element={<MainWindow />} />

          <Route path='*' element={<NotFoundPage />} />
          
          {/* Страница новостей */}
          <Route path="news" element={<NewsPage />} />
          
          {/* Страница дискографии */}
          <Route path="discography" element={<Discography />} />
            {/* Страницы альбомов */}
            <Route path="discography/cowboysfromhell" element={<CfhPage />} />
            <Route path="discography/vulgardisplayofpower" element={<VdpPage />} />
            <Route path="discography/farbeyonddriven" element={<FbdPage />} />
            <Route path="discography/thegreatsoutherntrendkill" element={<GstPage />} />
            <Route path="discography/officallive101proof" element={<OflpPage />} />
            <Route path="discography/reinventingthesteel" element={<RtsPage />} />
            <Route path="discography/3vulgarvideosfromhell" element={<TVVFHPage />} />
            <Route path="discography/greatesthits" element={<GHitsPage />} />
            <Route path="discography/decadeofdomination" element={<DODPage />} />
            <Route path="discography/thecompletestudiocollectionsbox" element={<TCSCPage />} />

          {/* Страница туров */}

          <Route path='tours' element={<Tours />} />

          {/* Страницы участников */}

          <Route path="dimebagdarrell" element={<AboutDimebag />} />
          <Route path="philiphanselmo" element={<AboutPhilip />} />
          <Route path="rexbrown" element={<AboutRex />} />
          <Route path="vinniepaul" element={<AboutVinnie />} />
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
