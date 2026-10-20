import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

/** Short referral link: recodehive.com/giveaway?ref=<handle>. The giveaway page reads and stores ?ref=. */
export default function GiveawayRedirect(): React.JSX.Element | null {
  const history = useHistory();
  useEffect(() => {
    const search = window.location.search;
    history.replace(`/dashboard${search}#giveaway`);
  }, [history]);
  return null;
}
