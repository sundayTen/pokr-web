import { create } from 'zustand';

interface UserTokenStore {
  userToken: string | null;
  changeUserToken: (data: string | null) => void;
}

const userStore = create<UserTokenStore>((set) => ({
  userToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6bnVsbCwibmlja25hbWUiOiJcdWFjMWNcdWJjMWNcdWQ1NThcdWIyOTQgXHVjN2EwXHVjNzkwXHViOWFjIiwiZW1haWwiOm51bGwsImV4cCI6MTY4OTI0NzU1M30.Kc8vSb9vEEZIRlSdM3MJnstnwtTt8r0U9RYeZttsmtM',
  changeUserToken: (data: string | null) => set({ userToken: data }),
}));

export default userStore;
