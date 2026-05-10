import React, { useState, useEffect } from 'react';
import { Screen, MeetingData } from './types';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { MeetingInfoScreen } from './screens/MeetingInfoScreen';
import { ThemeScreen } from './screens/ThemeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DatePickerScreen } from './screens/DatePickerScreen';
import { InvitePreviewScreen } from './screens/InvitePreviewScreen';
import { ShareScreen } from './screens/ShareScreen';
import { GuestRsvpScreen } from './screens/GuestRsvpScreen';
import { ResponseCompleteScreen } from './screens/ResponseCompleteScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { PostMeetingScreen } from './screens/PostMeetingScreen';
import { BottomNav, Toast } from './components/Navigation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [history, setHistory] = useState<Screen[]>(['home']);
  const [meetingData, setMeetingData] = useState<MeetingData>({
    category: '',
    isRecurring: false,
    name: '',
    message: '',
    location: '',
    theme: 'calendar-kiss',
    hostProfile: 'basic',
    candidateDates: [],
  });
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    setHistory((prev) => [...prev, screen]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onCreateClick={() => navigateTo('create-category')} />;
      case 'create-category':
        return (
          <CategoryScreen 
            onBack={goBack} 
            onNext={(cat, rec) => {
              setMeetingData({ ...meetingData, category: cat, isRecurring: rec });
              navigateTo('meeting-info');
            }} 
          />
        );
      case 'meeting-info':
        return (
          <MeetingInfoScreen 
            onBack={goBack} 
            defaultData={meetingData}
            onNext={(data) => {
              setMeetingData({ ...meetingData, ...data });
              navigateTo('theme-selection');
            }}
          />
        );
      case 'theme-selection':
        return (
          <ThemeScreen 
            onBack={goBack} 
            onNext={(theme) => {
              setMeetingData({ ...meetingData, theme });
              navigateTo('profile-picker');
            }}
          />
        );
      case 'profile-picker':
        return (
          <ProfileScreen
            onBack={goBack}
            onNext={(profile) => {
              setMeetingData({ ...meetingData, hostProfile: profile });
              navigateTo('date-picker');
            }}
          />
        );
      case 'date-picker':
        return (
          <DatePickerScreen
            onBack={goBack}
            onNext={(dates) => {
              setMeetingData({ ...meetingData, candidateDates: dates });
              navigateTo('invite-preview');
            }}
          />
        );
      case 'invite-preview':
        return (
          <InvitePreviewScreen
            onBack={goBack}
            data={meetingData}
            onNext={() => navigateTo('link-share')}
          />
        );
      case 'link-share':
        return (
          <ShareScreen 
            onNext={() => navigateTo('host-dashboard')}
            showToast={triggerToast}
          />
        );
      case 'host-dashboard':
        return (
          <DashboardScreen 
            onBack={goBack}
            onNext={() => navigateTo('post-meeting')}
          />
        );
      case 'guest-rsvp':
        return (
          <GuestRsvpScreen
            data={meetingData}
            onNext={(resp) => navigateTo('response-complete')}
          />
        );
      case 'response-complete':
        return (
          <ResponseCompleteScreen
            onReset={() => {
              setHistory(['home']);
              setCurrentScreen('home');
            }}
            onBackToInvite={() => navigateTo('invite-preview')}
          />
        );
      case 'post-meeting':
        return (
          <PostMeetingScreen
            onNext={(action) => {
              if (action === 'later') {
                setHistory(['home']);
                setCurrentScreen('home');
              } else {
                navigateTo('create-category');
              }
            }}
          />
        );
      default:
        return <HomeScreen onCreateClick={() => navigateTo('create-category')} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bg-app overflow-x-hidden relative font-sans text-ink">
      <main className="p-5 min-h-screen">
        {renderScreen()}
      </main>

      {/* Persistent Navigation for Prototype only */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => navigateTo('guest-rsvp')}
          className="bg-black text-white text-[10px] px-2 py-1 rounded-md"
        >
          Guest View
        </button>
      </div>

      {(currentScreen === 'home' || currentScreen === 'host-dashboard') && (
        <BottomNav activeTab={currentScreen} onTabChange={(tab) => {
          if (tab === 'home') navigateTo('home');
          if (tab === 'create') navigateTo('create-category');
        }} />
      )}

      <Toast message={toastMsg} visible={showToast} />
    </div>
  );
}

