<template>
  <ion-page>
    <ion-content>
      <Card style="width: 90vw; margin: 50px auto">
        <template #header>
          <div style="text-align: center">
            <img
              alt="企業ロゴとか？"
              src="/assets/icon/icon.png"
              style="width: 30%"
            />
          </div>
        </template>
        <template #title>
          <div style="text-align: center">Login</div>
        </template>
        <template #content>
          <div style="text-align: center">
            <span class="p-input-icon-left">
              <i class="pi pi-id-card" />
              <InputText
                type="text"
                v-model="inputForm.loginId"
                placeholder="login id"
              />
            </span>
            <div style="margin-top: 1rem">
              <Password
                v-model="inputForm.password"
                toggleMask
                :feedback="false"
              />
            </div>
          </div>
        </template>
        <template #footer>
          <div style="text-align: center">
            <Button
              icon=" pi pi-check"
              label="Login"
              @click="doLogin"
              :disabled="!isClickBtn"
            />
            <Button
              icon="pi pi-times"
              label="Cancel"
              @click="reset"
              :disabled="!isClickBtn"
              class="p-button-secondary"
              style="margin-left: 0.5em"
            />
          </div>
        </template>
      </Card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import router from "@/router/index";
import { useAppStore } from "@/store/index";
import {
  alertController,
  IonContent,
  IonPage,
  onIonViewWillEnter,
} from "@ionic/vue";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { computed, reactive } from "vue";
const appStore = useAppStore();

const inputForm = reactive({
  loginId: "",
  password: "",
});
const isClickBtn = computed(() => inputForm.loginId && inputForm.password);

onIonViewWillEnter(() => {
  appStore.logout();
  reset();
});

const doLogin = async () => {
  if (await appStore.login(inputForm.loginId, inputForm.password)) {
    reset();
    router.push("/top");
  } else {
    const alert = await alertController.create({
      header: "エラー",
      message: "ログインID・パスワードが間違っています。",
      buttons: ["OK"],
    });
    await alert.present();
  }
};
const reset = () => {
  inputForm.loginId = "";
  inputForm.password = "";
};
</script>
