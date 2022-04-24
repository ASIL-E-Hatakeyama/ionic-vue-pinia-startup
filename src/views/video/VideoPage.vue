<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Dash Bord</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="main-video-wrap">
        <video
          v-if="myStream"
          :srcObject.prop="myStream"
          id="remoteVideo"
          autoplay
        ></video>
      </div>
      <video
        v-if="myStream"
        :srcObject.prop="myStream"
        id="myVideo"
        autoplay
      ></video>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-buttons>
          <ion-button @click="connectMyCamera"> マイカメラ接続 </ion-button>
          <ion-button @click="stopMyCamera"> 停止する </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="settingsOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { settingsOutline } from "ionicons/icons";
import { ref } from "vue";
const myStream = ref<MediaStream>();
const connectMyCamera = async () => {
  const deviceInfos = await navigator.mediaDevices.enumerateDevices();
  if (!deviceInfos || deviceInfos.length === 0) {
    alert("使えるデバイスがありません。");
    return;
  }

  const videoInfos = deviceInfos.filter((info) => info.kind === "videoinput");
  if (!videoInfos || videoInfos.length === 0) {
    alert("使えるデバイスがありません。");
    return;
  }
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      myStream.value = stream;
    })
    .catch(() => alert("カメラ情報取得に失敗しました。"));
};
const stopMyCamera = async () => {
  if (myStream.value) {
    let tracks = myStream.value.getTracks();
    tracks.forEach((track) => track.stop());
    myStream.value = undefined;
  }
};
</script>

<style scoped lang="scss">
#main-video-wrap {
  position: relative;
  width: 100vw;
  height: 100%;
  overflow: hidden;

  #remoteVideo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    min-width: 100%;
    min-height: 100%;
  }
}
#myVideo {
  position: fixed;
  bottom: 50px;
  right: 5px;
  width: 150px;
  height: 200px;
}
</style>
