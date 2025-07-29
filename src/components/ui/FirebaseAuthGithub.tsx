import React, { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { GithubAuthProvider, signInWithPopup, User } from 'firebase/auth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: GithubAuthProvider.PROVIDER_ID,
      // You can add scopes and custom parameters here if needed
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false, // Prevents redirect
  },
};

const FirebaseAuthGithub: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => setUser(user as User));
    return () => unregisterAuthObserver();
  }, []);

  if (user) {
    return (
      <div style={{ textAlign: 'center' }} className='flex justify-center items-center gap-5 p-0'>
        <img src={user.photoURL || ''} alt="avatar" style={{ width: 48, borderRadius: '50%', border: '2px solid #000' }} />
        <br />
        <button
          onClick={() => auth.signOut()}
          className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-1 rounded flex items-center gap-2 transition-colors duration-200 shadow-md font-semibold"
        >
          <svg height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign out
        </button>
      </div>
    );
  }

  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('GitHub sign-in error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }} className='flex justify-center items-center gap-5 p-0'>
      <button onClick={handleGithubSignIn} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
        <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
        Sign in with GitHub
      </button>
    </div>
  );
};

export default FirebaseAuthGithub; 