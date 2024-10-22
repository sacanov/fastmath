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
import { ref } from "vue";

const props = defineProps<{
  name: string;
  checked: boolean;
  modalHeight: "high" | "low";
}>();

const checked = ref(props.checked);

const emit = defineEmits(["reset", "change"]);

const modal = ref();

const handler = (ev) => {
  checked.value = ev.detail.checked;
  emit("change", ev.detail.checked);
};

const ok = () => {
  modal.value.$el.dismiss(null, "cancel");
};
</script>
<template>
  <IonCard>
    <IonCardTitle>
      <IonCheckbox
        justify="space-between"
        :checked="checked"
        @ion-change="handler"
        >{{ props.name }}</IonCheckbox
      >
    </IonCardTitle>
    <IonCardContent>
      <div class="card-content">
        <slot name="card-content"></slot>
      </div>

      <IonButton
        :id="`open-${props.name.toLowerCase()}-modal`"
        size="small"
        expand="block"
        class="open-options"
      >
        <IonIcon :icon="settingsSharp"></IonIcon>
      </IonButton>
    </IonCardContent>
  </IonCard>
  <IonModal
    ref="modal"
    :trigger="`open-${props.name.toLowerCase()}-modal`"
    :class="props.modalHeight"
  >
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="$emit('reset')">reset</IonButton>
        </IonButtons>
        <ionTitle>{{ props.name }}</ionTitle>
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
.card-content > * {
  margin: 10px auto;
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
ion-card {
  border-radius: 15px;
  padding: 0.3em;
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
  padding-right: 0.7em;
  margin-top: 5px;
  --color: var(--on-primary-container);
}
ion-checkbox {
  --border-radius: 5px;
}
ion-content {
  --padding-start: 1em;
  --padding-bottom: 0.5em;
  --padding-top: 0.5em;
  --padding-end: 1em;
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
  --height: 20em;
}
ion-modal.low {
  --height: 14em;
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
    --height: 13em;
  }
  ion-modal.high {
    --height: 18em;
  }
}
@media screen and (min-width: 576px) {
  ion-card {
    height: 14em;
  }
}
@media screen and (min-width: 27em) {
  ion-modal {
    --min-width: 27em;
    --width: auto;
  }
  ion-modal.ios {
    --min-width: 27em;
  }
  ion-modal.low {
    --height: 12em;
  }
  ion-modal.high {
    --height: 14em;
  }
}
</style>
