import { ref, reactive, readonly, type Ref } from "vue";

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  policy: boolean;
}

export interface UseContactFormConfig {
  onSuccess?: (data: ContactFormData) => void;
  onError?: (error: Error) => void;
  apiEndpoint?: string;
  accessKey?: string;
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  isSubmitting: Readonly<Ref<boolean>>;
  isSuccess: Readonly<Ref<boolean>>;
  serverError: Readonly<Ref<string | null>>;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

export const useContactForm = (config: UseContactFormConfig = {}): UseContactFormReturn => {
  const formData = reactive<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    policy: false,
  });

  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const serverError = ref<string | null>(null);

  const handleChange = (field: keyof ContactFormData, value: string | boolean) => {
    formData[field] = value as never;
    if (serverError.value) {
      serverError.value = null;
    }
  };

  const resetForm = () => {
    Object.assign(formData, {
      name: "",
      email: "",
      company: "",
      message: "",
      policy: false,
    });
    serverError.value = null;
    isSuccess.value = false;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      serverError.value = "Please fill in all required fields";
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      serverError.value = "Please enter a valid email address (e.g. user@example.com)";
      return;
    }

    if (formData.message.length < 10) {
      serverError.value = "Message must be at least 10 characters long";
      return;
    }

    isSubmitting.value = true;
    serverError.value = null;

    try {
      const endpoint = config.apiEndpoint || "https://api.web3forms.com/submit";
      const payload = config.accessKey
        ? {
            ...formData,
            access_key: config.accessKey,
            from_name: formData.name,
            email: formData.email,
            message: formData.message,
          }
        : formData;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error sending message");
      }

      isSuccess.value = true;
      config.onSuccess?.(formData);

      setTimeout(() => {
        resetForm();
      }, 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error sending message";
      serverError.value = errorMessage;
      config.onError?.(error as Error);
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    formData,
    isSubmitting: readonly(isSubmitting),
    isSuccess: readonly(isSuccess),
    serverError: readonly(serverError),
    handleSubmit,
    resetForm,
  };
};
