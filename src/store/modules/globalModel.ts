import { defineStore } from "pinia";
// import { store } from "/@/store";

interface globalState {
    collapsed: Boolean;
}

export const useGlobalModel = defineStore({
    id: "global-model",
    state: (): globalState => ({
        collapsed: false,
    }),
    getters: {
        getCollapsed() {
            return this.collapsed;
        },
    },
    actions: {
        toggleMenu(bool: boolean) {
            this.collapsed = bool;
        }
    },
});

// export function useGlobalModelHook() {
//     return useGlobalModel(store);
// }
