import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { HostAppLayout } from './layouts/HostAppLayout';
import { GuestWebLayout } from './layouts/GuestWebLayout';

// Host Screens
import { HomeScreen } from './screens/host/HomeScreen';
import { CategoryScreen } from './screens/host/CategoryScreen';
import { MeetingInfoScreen } from './screens/host/MeetingInfoScreen';
import { ThemeScreen } from './screens/host/ThemeScreen';
import { ProfileScreen } from './screens/host/ProfileScreen';
import { DatePickerScreen } from './screens/host/DatePickerScreen';
import { TimeSetupScreen } from './screens/host/TimeSetupScreen';
import { InvitePreviewScreen } from './screens/host/InvitePreviewScreen';
import { ShareScreen } from './screens/host/ShareScreen';
import { DashboardScreen } from './screens/host/DashboardScreen';
import { PostMeetingScreen } from './screens/host/PostMeetingScreen';
import { MeetingsScreen } from './screens/host/MeetingsScreen';
import { CalendarTabScreen } from './screens/host/CalendarTabScreen';
import { MyPageScreen } from './screens/host/MyPageScreen';

import { PlaceSetupScreen } from './screens/host/PlaceSetupScreen';
import { ConfirmPlanScreen } from './screens/host/ConfirmPlanScreen';
import { ConfirmedShareScreen } from './screens/host/ConfirmedShareScreen';

// Guest Screens
import { InviteLandingScreen } from './screens/guest/InviteLandingScreen';
import { GuestNicknameScreen } from './screens/guest/GuestNicknameScreen';
import { GuestAttendanceScreen } from './screens/guest/GuestAttendanceScreen';
import { GuestDateVoteScreen } from './screens/guest/GuestDateVoteScreen';
import { GuestPreferenceScreen } from './screens/guest/GuestPreferenceScreen';
import { GuestPlacePreferenceScreen } from './screens/guest/GuestPlacePreferenceScreen';
import { GuestCompleteScreen } from './screens/guest/GuestCompleteScreen';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Default redirect to Host App Home */}
        <Route path="/" element={<Navigate to="/app" replace />} />

        {/* Host App Flow */}
        <Route path="/app" element={<HostAppLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="meetings" element={<MeetingsScreen />} />
          <Route path="calendar" element={<CalendarTabScreen />} />
          <Route path="me" element={<MyPageScreen />} />
          <Route path="create/category" element={<CategoryScreen />} />
          <Route path="create/info" element={<MeetingInfoScreen />} />
          <Route path="create/place" element={<PlaceSetupScreen />} />
          <Route path="create/dates" element={<DatePickerScreen />} />
          <Route path="create/time" element={<TimeSetupScreen />} />
          <Route path="create/theme" element={<ThemeScreen />} />
          <Route path="create/profile" element={<ProfileScreen />} />
          <Route path="create/preview" element={<InvitePreviewScreen />} />
          <Route path="create/share" element={<ShareScreen />} />
          <Route path="meetings/demo/dashboard" element={<DashboardScreen />} />
          <Route path="meetings/demo/confirm" element={<ConfirmPlanScreen />} />
          <Route path="meetings/demo/confirmed-share" element={<ConfirmedShareScreen />} />
          <Route path="meetings/demo/post-meeting" element={<PostMeetingScreen />} />
        </Route>

        {/* Guest Web Flow */}
        <Route path="/invite" element={<GuestWebLayout />}>
          <Route path="demo" element={<InviteLandingScreen />} />
          <Route path="demo/nickname" element={<GuestNicknameScreen />} />
          <Route path="demo/attendance" element={<GuestAttendanceScreen />} />
          <Route path="demo/dates" element={<GuestDateVoteScreen />} />
          <Route path="demo/place" element={<GuestPlacePreferenceScreen />} />
          <Route path="demo/preferences" element={<GuestPreferenceScreen />} />
          <Route path="demo/complete" element={<GuestCompleteScreen />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

