<template>
  <ion-page>
    <ion-content :fullscreen="true"></ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import router from "@/router/index";
import { useAppStore } from "@/store/index";
import { IonContent, IonPage, onIonViewDidEnter } from "@ionic/vue";

const appStore = useAppStore();
// 初期起動時の画面制御
onIonViewDidEnter(() => {
  // TODO ログイン済みなら初期画面
  // 未ログインならログイン画面
  appStore
    .initLoginCheck()
    .then((isLogined) => router.replace(isLogined ? "/top" : "/login"));
});
</script>
