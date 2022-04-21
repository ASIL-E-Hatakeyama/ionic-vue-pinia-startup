import { AppStore } from "./interfaces";
import { defineStore } from "pinia";
import { Storage } from "@capacitor/storage";

export const useAppStore = defineStore("appStore", {
  state: (): AppStore => ({
    userName: "",
    token: "",
  }),
  getters: {
    idLogined: (state) => state.token !== "",
  },
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
      // TODO APIとか呼んでチェックを行う
      // とりあえずAPI成功パターン(ログインID = パスワード)で作る
      if (loginId === password) {
        this.setLoginInfo("ログイン 太郎", "token-1234");
        isSuccess = true;
      }
      return isSuccess;
    },
    /**
     * 初期起動で前回起動時のToken情報があれば、
     * APIにてTokenを再発行する(戻りはログイン処理と同じものを返してもらう)
     * 期限が切れていた場合、ログイン状態をリセットする
     *
     * @return {*}  {Promise<boolean>} ログイン情報が残っているかどうか
     */
    async initLoginCheck(): Promise<boolean> {
      const { value } = await Storage.get({ key: "token" });
      if (value && value !== "") {
        // TODO APIとか呼んでチェックを行う
        // とりあえずAPI成功パターンで作る
        this.setLoginInfo("ログイン 太郎", "token-1234");
        return true;
      } else {
        await this.logout();
        return false;
      }
    },
    async setLoginInfo(userName: string, token: string) {
      this.userName = userName;
      this.token = token;
      await Storage.set({ key: "token", value: token });
    },
    /**
     * ログアウト
     */
    async logout() {
      this.$reset();
      await Storage.remove({ key: "token" });
    },
  },
});
