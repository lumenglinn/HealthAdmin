import { Effect, Reducer } from 'umi';

// import { createOrUpdateWorker } from '@/services/worker';

export interface UserModelState {
  // currentUser?: CurrentUser;
}

export interface WorkerModelType {
  // namespace: 'user';
  // state: UserModelState;
  // effects: {
  //   fetch: Effect;
  //   fetchCurrent: Effect;
  // };
  // reducers: {
  //   saveCurrentUser: Reducer<UserModelState>;
  //   changeNotifyCount: Reducer<UserModelState>;
  // };
}

const WorkerModel: WorkerModelType = {
  namespace: 'worker',

  state: {
    currentUser: {},
  },

  effects: {
    // *createOrUpdateWorker(_, { call, put }) {
    //   const response = yield call(createOrUpdateWorker, _.payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // }
  },

  reducers: {
    // saveCurrentUser(state, action) {
    //   return {
    //     ...state,
    //     currentUser: action.payload || {},
    //   };
    // },
    // changeNotifyCount(
    //   state = {
    //     currentUser: {},
    //   },
    //   action,
    // ) {
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       notifyCount: action.payload.totalCount,
    //       unreadCount: action.payload.unreadCount,
    //     },
    //   };
    // },
  },
};

export default WorkerModel;
