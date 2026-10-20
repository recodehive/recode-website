import React from 'react';
import ClosedView from './ClosedView';
import HalloweenView from './HalloweenView';
import { useNow, usePhase } from './useGiveaway';

/** The dashboard giveaway. Halloween theme while the giveaway runs, the default design once it closes. */
const GiveawayPage: React.FC = () => {
  const now = useNow();
  const phase = usePhase(now);
  if (phase === 'closed') return <ClosedView />;
  return <HalloweenView now={now} phase={phase} />;
};

export default GiveawayPage;
