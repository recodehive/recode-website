import React from 'react';
import ClosedView from './ClosedView';
import QuestBoard from './QuestBoard';
import { useNow, usePhase } from './useGiveaway';

/** The dashboard giveaway. Quest board while the giveaway runs, the default design once it closes. */
const GiveawayPage: React.FC = () => {
  const now = useNow();
  const phase = usePhase(now);
  if (phase === 'closed') return <ClosedView />;
  return <QuestBoard now={now} phase={phase} />;
};

export default GiveawayPage;
