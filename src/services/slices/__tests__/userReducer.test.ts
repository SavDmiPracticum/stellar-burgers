import reducer, {
  fetchUser,
  getIsAuthChecked,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  setIsAuthChecked,
  updateUser
} from '../userSlice';

const userInfo = {
  email: 'JonDoe@mail.com',
  name: 'Jon Doe'
};

const registerInfo = {
  email: 'JonDoe@mail.com',
  name: 'Jon Doe',
  password: '123456789'
};

const loginInfo = {
  email: 'JonDoe@mail.com',
  password: '123456789'
};

describe('Тест редьюсера пользователя', () => {
  describe('Запрос пользователя', () => {
    test('Запрос пользователя: pending', () => {
      const state = reducer(initialState, fetchUser.pending('pending'));
      expect(state.loginUserError).toBe(null);
    });
    test('Запрос пользователя: fulfilled', () => {
      const state = reducer(
        initialState,
        fetchUser.fulfilled(userInfo, 'fulfilled')
      );
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(userInfo);
    });
    test('Запрос пользователя: rejected', () => {
      const error = 'fetchUser.rejected';
      const state = reducer(
        initialState,
        fetchUser.rejected(new Error(error), 'rejected')
      );
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.loginUserError?.message).toBe(error);
    });
  });

  describe('Регистрация пользователя', () => {
    test('СРегистрация пользователя: pending', () => {
      const state = reducer(
        initialState,
        registerUser.pending('pending', registerInfo)
      );
      expect(state.loginUserError).toBe(null);
    });
    test('Регистрация пользователя: fulfilled', () => {
      const state = reducer(
        initialState,
        registerUser.fulfilled(userInfo, 'fulfilled', registerInfo)
      );
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(userInfo);
      expect(state.loginUserError).toBe(null);
    });
    test('Регистрация пользователя: rejected', () => {
      const error = 'register.rejected';
      const state = reducer(
        initialState,
        registerUser.rejected(new Error(error), 'rejected', registerInfo)
      );
      expect(state.loginUserError?.message).toEqual(error);
      expect(state.user).toEqual({ name: '', email: '' });
    });
  });

  describe('Авторизация пользователя', () => {
    test('Авторизация пользователя: pending', () => {
      const state = reducer(
        initialState,
        loginUser.pending('pending', loginInfo)
      );
      expect(state.loginUserError).toBe(null);
    });
    test('Авторизация пользователя: fulfilled', () => {
      const state = reducer(
        initialState,
        loginUser.fulfilled(userInfo, 'fulfilled', loginInfo)
      );
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(userInfo);
      expect(state.loginUserError).toBe(null);
    });
    test('Авторизация пользователя: rejected', () => {
      const error = 'login.rejected';

      const state = reducer(
        initialState,
        loginUser.rejected(new Error(error), 'rejected', loginInfo)
      );

      expect(state.loginUserError?.message).toEqual(error);
      expect(state.isAuthenticated).toBe(false);
    });
  });
  describe('Выход пользователя', () => {
    test('Выход пользователя: pending', () => {
      const state = reducer(initialState, logoutUser.pending('pending'));
      expect(state).toEqual(initialState);
    });
    test('Выход пользователя: fulfilled', () => {
      const state = reducer(
        initialState,
        logoutUser.fulfilled(undefined, 'fulfilled')
      );
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toEqual({ name: '', email: '' });
      expect(state.isAuthChecked).toBe(true);
      expect(state.loginUserError).toBe(null);
    });
    test('Выход пользователя: rejected', () => {
      const error = 'logoutUser.rejected';
      const state = reducer(
        initialState,
        logoutUser.rejected(new Error(error), 'rejected')
      );
      expect(state.isAuthChecked).toEqual(true);
      expect(state.loginUserError?.message).toEqual(error);
    });
  });
  describe('Обновление пользователя', () => {
    test('Обновление пользователя: pending', () => {
      const state = reducer(
        initialState,
        updateUser.pending('pending', registerInfo)
      );
      expect(state.loginUserError).toBe(null);
    });
    test('Обновление пользователя: fulfilled', () => {
      const state = reducer(
        initialState,
        updateUser.fulfilled(userInfo, 'fulfilled', registerInfo)
      );
      expect(state.loginUserError).toBe(null);
      expect(state.user).toEqual(userInfo);
    });
    test('Обновление пользователя: rejected', () => {
      const error = 'updateUser.rejected';

      const state = reducer(
        initialState,
        updateUser.rejected(new Error(error), 'rejected', registerInfo)
      );

      expect(state.loginUserError?.message).toEqual(error);
    });
  });
  describe('Тест isAuthChecked', () => {
    test('setIsAuthChecked устанавливает true', () => {
      const state = reducer(initialState, setIsAuthChecked(true));
      expect(state.isAuthChecked).toBe(true);
    });
    test('setIsAuthChecked устанавливает false', () => {
      const state = reducer(initialState, setIsAuthChecked(false));
      expect(state.isAuthChecked).toBe(false);
    });
  });
  describe('Тест getIsAuthChecked', () => {
    test('Возвращает true, когда isAuthChecked = true', () => {
      const state = reducer(initialState, setIsAuthChecked(true));
      const rootState = { user: state };
      expect(getIsAuthChecked(rootState)).toBe(true);
    });

    test('Возвращает false, когда isAuthChecked = false', () => {
      const state = reducer(initialState, setIsAuthChecked(false));
      const rootState = { user: state };
      expect(getIsAuthChecked(rootState)).toBe(false);
    });
  });
});
