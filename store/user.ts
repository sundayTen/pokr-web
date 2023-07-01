import { create } from 'zustand';

interface UserTokenStore {
  userToken: string | null;
  changeUserToken: (data: string | null) => void;
}

const userStore = create<UserTokenStore>((set) => ({
  userToken: null,
  changeUserToken: (data: string | null) => set({ userToken: data }),
}));

export default userStore;
