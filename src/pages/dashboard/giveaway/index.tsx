import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import type confettiType from 'canvas-confetti';

const GiveawayPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--',
  });

  const countdownTarget = new Date('2025-08-15T23:59:59').getTime(); // Update the deadline if needed

  // Countdown Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTarget - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Confetti Effect
  useEffect(() => {
    const runConfetti = async () => {
      const module = await import('canvas-confetti');
      const confetti = module.default as typeof confettiType;

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    const timer = setTimeout(runConfetti, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head>
        <title>🎁 RecodeHive Giveaway</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">🎉 RecodeHive Giveaway</h1>
          <p className="text-lg mb-8">Participate now and win exclusive swag, resources, and more!</p>

          <div className="flex justify-center gap-4 text-center mb-12">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
              <div key={unit} className="bg-white/10 px-6 py-4 rounded-xl shadow-md">
                <div className="text-3xl font-bold">{timeLeft[unit as keyof typeof timeLeft]}</div>
                <div className="text-sm uppercase tracking-widest">{unit}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 p-6 rounded-xl shadow-xl mb-10">
            <h2 className="text-2xl font-semibold mb-4">🏆 Leaderboard</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="pb-2">Rank</th>
                  <th className="pb-2">Username</th>
                  <th className="pb-2">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td>1</td>
                  <td>OpenSourcePro</td>
                  <td>1200</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td>2</td>
                  <td>CodeWizard</td>
                  <td>950</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>DevChampion</td>
                  <td>875</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-white text-opacity-60 italic">
            Winners will be announced after the countdown ends. Stay active on the dashboard to climb up the leaderboard!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GiveawayPage;
