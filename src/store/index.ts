import { AppStore } from "./interfaces";
import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: (): AppStore => ({
    userName: "",
    token: "",
  }),
  actions: {
    /**
     * ログイン処理
     *
     * @param {string} loginId ログインID
     * @param {string} password パスワード
     * @return {Promise<boolean>} ログイン結果
     */
    async login(loginId: string, password: string): Promise<boolean> {
      let isSuccess = false;
      if (loginId === password) {
        this.userName = "ログイン 太郎";
        this.token = "token-1234";
        isSuccess = true;
      }
      return isSuccess;
    },
    /**
     * ログアウト
     */
    logout() {
      this.$reset();
    },
  },
});
