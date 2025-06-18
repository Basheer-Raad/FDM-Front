<script lang="ts" setup>
import { computed, ref } from "vue";
// import { socialMedias } from "@/components/authentication/utils.ts";
import { apiService } from "@/app/service/httpService/apiService";
import appConfigs from "@/app/appConfig.ts";
// import { UserType } from "@/app/service/httpService/types.ts";
import { useRouter } from "vue-router";
import { LAYOUT_TYPES } from "@/layouts/types.ts";
import logoDarkMain from "@/assets/images/Larsatron_Logo-Eng-light.png";
import logoLight from "@/assets/images/Larsatron_Logo-Eng.png";
import { useLayoutStore } from "@/store/layout";
// import { Mail } from "lucide-vue-next";
// import type { AxiosResponse } from 'axios';

const { COVER, BOXED, MODERN } = LAYOUT_TYPES;
const props = defineProps({
  layout: {
    type: String,
    default: LAYOUT_TYPES.BASIC,
  },
});
const router = useRouter();
const auth = appConfigs.auth;

const form = ref({
  email: { value: "admin@example.com", isValid: true },
  password: { value: "123456", isValid: true },
  isRemember: true,
});

const isSubmitted = ref(false);
const isSucceed = ref(false);
const errorMsg = ref("");

const isValidForm = computed(() => {
  const { email, password, isRemember } = form.value;
  return email.isValid && password.isValid && isRemember;
});

const getTitleColor = computed(() => {
  if (props.layout === BOXED || props.layout === COVER) {
    return "text-purple-500 dark:text-purple-500";
  }
  return "text-custom-500 dark:text-custom-500";
});

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
  };
}

const layoutStore = computed(() => useLayoutStore());
const siteMode = computed(() => layoutStore.value.mode);
const logoMain = computed(() => siteMode.value === 'dark' ? logoDarkMain : logoLight);

const onSignIn = async () => {
  isSubmitted.value = true;
  errorMsg.value = "";
  if (isValidForm.value) {
    try {
      const { password, email } = form.value;
      const payload = {
        password: password.value,
        email: email.value,
      };

      const response = await apiService.post<LoginResponse>("login", payload);
      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', JSON.stringify(response.user.roles[0]));
        isSucceed.value = true;
        router.push({ path: "/" });
      }
    } catch (error: any) {
      errorMsg.value = error.message;
    }
  }
};
</script>
<template>
  <div class="text-center">
    <img :src="logoMain" alt="Logo" class="h-10 mx-auto mb-6" />
    <h4 class="mb-1" :class="getTitleColor">Welcome Larsatron</h4>
    <p class="text-slate-500 dark:text-zink-200">Sign in to continue to FDM.</p>
  </div>

  <div class="mt-10">
    <div
      v-show="isSucceed"
      class="px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50"
    >
      You have <b>successfully</b> signed in.
    </div>
    <TAlert v-show="errorMsg" color="red" bordered class="mb-3">
      {{ errorMsg }}
    </TAlert>
    <div>
      <TValidationInputField
        v-model="form.email"
        label="Email"
        :rules="['required', 'email']"
        :submit="isSubmitted"
        placeholder="Enter your email"
      />
      <TValidationInputField
        v-model="form.password"
        label="Password"
        type="password"
        :rules="['required']"
        :submit="isSubmitted"
        placeholder="Enter password"
      />
      <TCheckbox v-model="form.isRemember" id="sign-in-remember">
        <span class="text-base font-medium"> Remember me </span>
      </TCheckbox>
      <div
        v-if="isSubmitted && !form.isRemember"
        class="mt-1 text-sm text-red-500"
      >
        Please check the "Remember me" before submitting the form.
      </div>
    </div>
    <div class="mt-10">
      <TButton class="w-full" @click="onSignIn"> Sign In </TButton>
    </div>
    <div
      class="relative text-center my-9 before:absolute before:top-3 before:left-0 before:right-0 before:border-t before:border-t-slate-200 dark:before:border-t-zink-500"
    >
      <h5
        class="inline-block px-2 py-0.5 text-sm bg-white text-slate-500 dark:bg-zink-600 dark:text-zink-200 rounded relative"
      ></h5>
    </div>
  </div>
</template>
