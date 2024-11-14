import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/layout/Navbar';
import { useGameState } from './hooks/useGameState';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { gameState } = useGameState();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Dashboard gameState={gameState} />
    </div>
  );
}