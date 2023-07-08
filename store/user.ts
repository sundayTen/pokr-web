import { create } from 'zustand';

interface UserTokenStore {
  userToken: string | null;
  isLogin: boolean;
  changeUserToken: (token: string | null) => void;
  setIsLogin: (state: boolean) => void;
}

const userStore = create<UserTokenStore>((set) => ({
  userToken: null,
  isLogin: false,
  changeUserToken: (token: string | null) => set({ userToken: token }),
  setIsLogin: (state: boolean) => set({ isLogin: state }),
}));

export default userStore;
