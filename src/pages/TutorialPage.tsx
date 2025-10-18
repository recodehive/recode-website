import TutorialCompletion from '../components/tutorialCompletion';

const TutorialPage = () => (
  <div>
    <h1>My Tutorial</h1>
    {/* Tutorial content here */}
    <TutorialCompletion tutorialTitle="Git Basics" onComplete={() => console.log('Tutorial done!')} />
  </div>
);

