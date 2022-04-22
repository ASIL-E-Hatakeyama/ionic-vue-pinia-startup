<template>
  <ion-page>
    <ion-content>
      <div id="title">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <h3>お探しのページがありません</h3>
        <h6>
          <router-link to="/login">ログインページ</router-link
          >より再度操作をお願いします。
        </h6>
      </div>
      <div id="wave-wrap">
        <div id="wave"></div>
        <div id="wave-under"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent } from "@ionic/vue";
</script>

<style scoped lang="scss">
ion-content {
  --background: #effffd !important;
}

#title {
  margin-top: 30%;
  text-align: center;

  h1,
  h2,
  h3 {
    padding: 0;
    margin: 0.3rem;
  }
}

#wave-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
}
#wave {
  background-image: url(../../../public/assets/wave.svg);
  background-repeat: repeat-x;
  height: 100px;
  width: 100vw;
}
#wave-under {
  background-color: #4eb1ec;
  width: 100vw;
  height: 100px;
}
</style>
