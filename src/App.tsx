/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OpeningGiftScreen } from './components/OpeningGiftScreen';
import { GreetingCardView } from './components/GreetingCardView';
import { FireworksCanvas } from './components/FireworksCanvas';
import { FloatingParticles } from './components/FloatingParticles';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [theme, setTheme] = useState('gold');
  const [message, setMessage] = useState(
    'May this Diwali bring endless happiness, prosperity, success, peace and new opportunities into your life. May your home always shine with love and positivity. Wishing you and your family a very Happy and Blessed Diwali! ✨'
  );

  // Parse URL parameters on load for shareable personalized greetings
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    const fromParam = params.get('from');
    const msgParam = params.get('msg');
    const themeParam = params.get('theme');

    if (toParam) setToName(toParam);
    if (fromParam) setFromName(fromParam);
    if (msgParam) setMessage(msgParam);
    if (themeParam) setTheme(themeParam);
  }, []);

  const handleUpdateGreeting = (
    newTo: string,
    newFrom: string,
    newMsg: string,
    newTheme: string
  ) => {
    setToName(newTo);
    setFromName(newFrom);
    setMessage(newMsg);
    setTheme(newTheme);

    // Update URL without page reload
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    if (newTo) params.set('to', newTo);
    if (newFrom) params.set('from', newFrom);
    if (newMsg) params.set('msg', newMsg);
    if (newTheme) params.set('theme', newTheme);

    const newUrl = `${baseUrl}?${params.toString()}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0813] text-amber-50 relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Background Interactive Fireworks Canvas */}
      <FireworksCanvas autoLaunch={true} intensity="medium" interactive={true} />

      {/* Floating Golden Dust & Marigold Petals */}
      <FloatingParticles />

      {/* Persistent Audio Controls (Mute/Unmute & Raga Selector) */}
      <AudioPlayer />

      {/* Screen 1: Opening Surprise Gift Screen */}
      {!isOpen ? (
        <OpeningGiftScreen
          toName={toName}
          fromName={fromName}
          onOpenGift={() => setIsOpen(true)}
        />
      ) : (
        /* Screen 2: Main Happy Diwali Page */
        <GreetingCardView
          toName={toName}
          fromName={fromName}
          message={message}
          theme={theme}
          onUpdateGreeting={handleUpdateGreeting}
        />
      )}
    </div>
  );
}
