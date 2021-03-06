<template>
  <ion-app>
    <ion-router-outlet id="main-content"></ion-router-outlet>
    <ion-menu
      content-id="main-content"
      type="overlay"
      :swipeGesture="false"
      v-if="isLogined"
    >
      <ion-content>
        <ion-list id="inbox-list">
          <ion-list-header>{{ store.userName }}</ion-list-header>
          <ion-note>hi@ionicframework.com</ion-note>
          <ion-menu-toggle
            :autoHide="false"
            v-for="(p, i) in appPages"
            :key="i"
          >
            <ion-item
              @click="selectedIndex = i"
              router-direction="root"
              :router-link="p.url"
              lines="none"
              detail="false"
              class="hydrated"
              :class="{ selected: selectedIndex === i }"
            >
              <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-menu-toggle :autoHide="false">
            <ion-item
              lines="none"
              detail="false"
              class="hydrated"
              @click="doLogout"
            >
              <ion-label>Logout</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
  </ion-app>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/store/index";
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  alertController,
} from "@ionic/vue";
import {
  mailOutline,
  mailSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import { computed, ref } from "vue";
import router from "./router";
const store = useAppStore();
const isLogined = computed(() => store.idLogined);

const selectedIndex = ref(0);
const appPages = [
  {
    title: "Inbox",
    url: "/folder/Inbox",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Video",
    url: "/video",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "404",
    url: "/404",
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
];

const path = window.location.pathname.split("folder/")[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex(
    (page) => page.title.toLowerCase() === path.toLowerCase()
  );
}

const doLogout = async () => {
  const alert = await alertController.create({
    message: "ログアウトしますがよろしいですか？",
    buttons: [
      {
        text: "OK",
        handler: async () => {
          await store.logout();
          router.replace("/");
        },
      },
      {
        text: "Cancel",
      },
    ],
  });
  alert.present();
};
</script>

<style scoped lang="scss">
ion-menu {
  ion-content {
    --background: var(--ion-item-background, var(--ion-background-color, #fff));
  }

  .md {
    ion-content {
      --padding-start: 8px;
      --padding-end: 8px;
      --padding-top: 20px;
      --padding-bottom: 20px;
    }

    ion-list {
      padding: 20px 0;
    }

    ion-note {
      margin-bottom: 30px;
    }

    ion-list-header,
    ion-note {
      padding-left: 10px;
    }

    ion-list#inbox-list {
      border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
    }

    ion-list#inbox-list ion-list-header {
      font-size: 22px;
      font-weight: 600;

      min-height: 20px;
    }

    ion-list#labels-list ion-list-header {
      font-size: 16px;

      margin-bottom: 18px;

      color: #757575;

      min-height: 26px;
    }

    ion-item {
      --padding-start: 10px;
      --padding-end: 10px;
      border-radius: 4px;
    }

    ion-item.selected {
      --background: rgba(var(--ion-color-primary-rgb), 0.14);
    }

    ion-item.selected ion-icon {
      color: var(--ion-color-primary);
    }

    ion-item ion-icon {
      color: #616e7e;
    }

    ion-item ion-label {
      font-weight: 500;
    }
  }

  .ios {
    ion-content {
      --padding-bottom: 20px;
    }

    ion-list {
      padding: 20px 0 0 0;
    }

    ion-note {
      line-height: 24px;
      margin-bottom: 20px;
    }

    ion-item {
      --padding-start: 16px;
      --padding-end: 16px;
      --min-height: 50px;
    }

    ion-item.selected ion-icon {
      color: var(--ion-color-primary);
    }

    ion-item ion-icon {
      font-size: 24px;
      color: #73849a;
    }

    ion-list#labels-list ion-list-header {
      margin-bottom: 8px;
    }

    ion-list-header,
    ion-note {
      padding-left: 16px;
      padding-right: 16px;
    }

    ion-note {
      margin-bottom: 8px;
    }
  }
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
