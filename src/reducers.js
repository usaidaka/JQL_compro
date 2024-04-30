import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import registerReducer, { storedKey as storedRegisterState } from '@pages/Register/reducer';
import routeReducer, { storedKey as storedRouteState } from '@pages/Trip/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import peopleReducer, { storedKey as storedPeopleState } from '@pages/People/reducer';
import connectionReducer, { storedKey as storedConnectionState } from '@pages/Profile/reducer';
import destinationReducer, { storedKey as storedDestinationState } from '@pages/Destination/reducer';
import editPostReducer from '@pages/EditPost/reducer';
import userProfileReducer from '@pages/UserProfile/reducer';
import groupReducer from '@pages/Group/reducer';
import editDestinationReducer from '@pages/EditDestination/reducer';
import dashboardReducer, { storedKey as storedDashboardState } from '@pages/AdminDashboard/reducer';
import nearbyDirectionReducer, { storedKey as storedNearbyDirectionState } from '@pages/NearbyDirection/reducer';

import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  register: { reducer: registerReducer, whitelist: storedRegisterState },
  route: { reducer: routeReducer, whitelist: storedRouteState },
  home: { reducer: homeReducer, whitelist: storedHomeState },
  people: { reducer: peopleReducer, whitelist: storedPeopleState },
  connection: { reducer: connectionReducer, whitelist: storedConnectionState },
  destination: { reducer: destinationReducer, whitelist: storedDestinationState },
  dashboard: { reducer: dashboardReducer, whitelist: storedDashboardState },
  nearbyDirection: { reducer: nearbyDirectionReducer, whitelist: storedNearbyDirectionState },
};

const temporaryReducers = {
  language: languageReducer,
  editPost: editPostReducer,
  userProfile: userProfileReducer,
  group: groupReducer,
  editDestination: editDestinationReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;