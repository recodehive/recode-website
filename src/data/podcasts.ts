// All Podcasts page content lives here. Empty strings are never rendered on the page:
// an empty text field hides that element, an empty link hides that button.

export type SpotifyKind = 'episode' | 'show';

export type OwnEpisode = {
  id: string;
  number: string;
  title: string;
  date: string;
  duration: string;
  summary: string;
  spotifyId: string;
  // Spotify embeds differ for a single episode and a whole show
  spotifyKind: SpotifyKind;
  notesUrl?: string;
};

export type Topic = 'AI & Tech' | 'Communication' | 'Science';

export type Pick = {
  id: string;
  show: string;
  initials: string;
  color: 'violet' | 'amber' | 'blue';
  title: string;
  meta: string;
  duration: string;
  topic: Topic;
  why: string;
  spotifyId: string;
};

export const show = {
  name: 'The Comeback Code',
  host: 'Nomad Brains',
  description: '', // TODO(sanjay): one or two sentences about the show
  frequency: '', // TODO(sanjay): for example "week" or "two weeks"
  links: {
    spotify: 'https://open.spotify.com/show/6oPJ7ZBlN7y34yiSMguIda',
    youtube: '', // TODO(sanjay): YouTube channel or playlist URL
    apple: '', // TODO(sanjay): Apple Podcasts URL
  },
};

export const ownEpisodes: OwnEpisode[] = [
  {
    id: 'own1',
    number: '01',
    title: 'Reset Frequency',
    date: 'Apr 19',
    duration: '32:13',
    summary: '', // TODO(sanjay): short summary of the episode
    // The existing ID on the old page is a Spotify show ID, so it uses the show embed.
    // TODO(sanjay): swap in the single-episode ID and set spotifyKind to 'episode' if you prefer.
    spotifyId: '6oPJ7ZBlN7y34yiSMguIda',
    spotifyKind: 'show',
  },
];

export const picks: Pick[] = [
  {
    id: 'pick1',
    show: 'Modern Wisdom',
    initials: 'MW',
    color: 'violet',
    title: 'A Masterclass in Storytelling with Will Storr',
    meta: '#944 · May 22 · 1:27:37',
    duration: '1:27:37',
    topic: 'Communication',
    why: '', // TODO(sanjay): what listeners will take away
    spotifyId: '20oNPNibv9YFK89wgYfAdK',
  },
  {
    id: 'pick2',
    show: 'Figuring Out',
    initials: 'FO',
    color: 'amber',
    title: "A Neuroscientist's Guide to 10X Your Focus and Memory with Dr Sahar Yousef",
    meta: 'FO559', // TODO(sanjay): add the release date and duration
    duration: '',
    topic: 'Science',
    why: '', // TODO(sanjay): what listeners will take away
    spotifyId: '34EFm7MNHYQzYaa7KBwTCv',
  },
  {
    id: 'pick3',
    show: 'Figuring Out',
    initials: 'FO',
    color: 'blue',
    title: 'Andrew Huberman on the Science of Peak Performance, Motivation and Sleep',
    meta: 'FO556', // TODO(sanjay): add the release date and duration
    duration: '',
    topic: 'Science',
    why: '', // TODO(sanjay): what listeners will take away
    spotifyId: '4mRaJOxCdMpxL6aBDOMNAO',
  },
];
