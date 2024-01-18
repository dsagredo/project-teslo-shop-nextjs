import { create } from 'zustand';
import { State } from '@/interfaces';

export const useStore = create<State>()((set) => ({
    isSideMenu: false,
    openSideMenu: (): void => set({ isSideMenu: true }),
    closeideMenu: (): void => set({ isSideMenu: false }),
}));
