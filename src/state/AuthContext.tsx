import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, googleSignIn, logout as firebaseLogout } from '../lib/auth';
import { userProfileRepository } from '../repositories/userProfileRepository';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        // Sync user profile
        const profile = userProfileRepository.getProfile();
        const updates: any = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || undefined,
          photoURL: firebaseUser.photoURL || undefined,
          calendar: {
            ...profile.calendar,
            externalCalendarStatus: profile.calendar?.externalCalendarStatus === 'not_connected' ? 'not_connected' : 'connected',
          },
        };

        // If the display name is the default '호스트' or empty, use the Google displayName
        if ((profile.displayName === '호스트' || !profile.displayName.trim()) && firebaseUser.displayName) {
          updates.displayName = firebaseUser.displayName;
        }

        userProfileRepository.updateProfile(updates);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        
        // Sync user profile
        const profile = userProfileRepository.getProfile();
        const updates: any = {
          uid: res.user.uid,
          email: res.user.email || undefined,
          photoURL: res.user.photoURL || undefined,
          calendar: {
            ...profile.calendar,
            externalCalendarStatus: profile.calendar?.externalCalendarStatus === 'not_connected' ? 'not_connected' : 'connected',
          },
        };
        if ((profile.displayName === '호스트' || !profile.displayName.trim()) && res.user.displayName) {
          updates.displayName = res.user.displayName;
        }
        userProfileRepository.updateProfile(updates);
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await firebaseLogout();
      setUser(null);
      // Remove auth fields from local profile
      userProfileRepository.updateProfile({
        uid: undefined,
        email: undefined,
        photoURL: undefined,
      });
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
