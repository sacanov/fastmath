<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { settingsSharp } from "ionicons/icons";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  name: string;
  checked: boolean;
  modalHeight: "high" | "low";
  isOpen: boolean;
}>();

const emit = defineEmits(["reset", "update:checked", "dismiss", "openModal"]);

const checked = ref(props.checked);

const isOpen = ref(props.isOpen);

watchEffect(() => {
  isOpen.value = props.isOpen;
});

const handler = (ev: any) => {
  checked.value = ev.detail.checked;
  emit("update:checked", ev.detail.checked);
};

const ok = () => {
  emit("dismiss", props.name);
};
</script>
<template>
  <IonCard>
    <IonCardTitle>
      <IonCheckbox
        justify="space-between"
        :checked="checked"
        @ion-change="handler"
        :data-testid="`${name.toLowerCase()}-check`"
        >{{ props.name }}</IonCheckbox
      >
    </IonCardTitle>
    <IonCardContent>
      <div class="card-content">
        <slot name="card-content"></slot>
      </div>

      <IonButton
        @click="$emit('openModal')"
        expand="block"
        class="open-options"
        :data-testid="`open-${props.name.toLowerCase()}-options`"
      >
        <IonIcon :icon="settingsSharp"></IonIcon>
      </IonButton>
    </IonCardContent>
  </IonCard>
  <IonModal ref="modal" :is-open="isOpen" :class="props.modalHeight">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="$emit('reset')">reset</IonButton>
        </IonButtons>
        <IonTitle>{{ props.name }}</IonTitle>
        <IonButtons slot="end">
          <IonButton :strong="true" @click="ok">ok</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent :scrollY="false">
      <div class="props-content">
        <slot name="options"></slot>
      </div>
    </IonContent>
  </IonModal>
</template>

<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.card-content > * {
  margin: 5px auto 0 auto;
}
.props-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.props-content > * {
  margin: 5px auto;
}
h1 {
  font-weight: bold;
}
ion-button.open-options {
  height: 16px;
  margin-top: 15px;
  --background: var(--on-primary-container);
}
ion-buttons ion-button {
  --color: var(--on-secondary);
}
ion-card {
  border-radius: 15px;
  padding: 0.3rem;
  --background: var(--primary-container);
  --color: var(--text-color-variant);
}
ion-card.ios {
  margin: 10px auto;
}
ion-card-content {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
ion-card-title {
  padding-left: 14px;
  padding-right: 0.7rem;
  margin-top: 5px;
  --color: var(--on-primary-container);
}
ion-checkbox {
  --border-radius: 5px;
}
ion-content {
  --padding-start: 1rem;
  --padding-bottom: 0.5rem;
  --padding-top: 0.5rem;
  --padding-end: 1rem;
}
ion-icon {
  font-size: 24px;
}
ion-header ion-toolbar {
  --background: var(--ion-color-secondary);
  --color: var(--on-secondary);
}
ion-modal {
  --border-radius: 15px;
}
ion-modal.ios {
  --min-width: 100%;
}
ion-modal.high {
  --height: 20rem;
}
ion-modal.low {
  --height: 14rem;
}
ion-modal ion-content {
  --background: var(--secondary-container);
  --color: var(--on-secondary-container);
}
@media screen and (min-width: 325px) {
  ion-modal.ios {
    --min-width: 325px;
  }
  ion-modal.low {
    --height: 13rem;
  }
  ion-modal.high {
    --height: 18rem;
  }
}
@media screen and (min-width: 576px) {
  ion-card {
    height: 13rem;
  }
}
@media screen and (min-width: 27em) {
  ion-modal {
    --min-width: 27rem;
    --width: auto;
  }
  ion-modal.ios {
    --min-width: 27rem;
  }
  ion-modal.low {
    --height: 13rem;
  }
  ion-modal.high {
    --height: 16rem;
  }
}
</style>
