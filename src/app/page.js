"use client";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";
import Step6 from "@/components/Step6";
import Step7 from "@/components/Step7";
import Step8 from "@/components/Step8";
import Toast from "@/components/Toast";
import ThankYouScreen from "@/components/ThankYouScreen";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const stepsTotal = 8;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Estados dinâmicos do Step3
  const [metas, setMetas] = useState([""]);
  const [valores, setValores] = useState([
    { placeholder: "Ambição", value: "" },
  ]);
  const [channels, setChannels] = useState([
    { name: "E-mail", checked: false },
    { name: "Site", checked: false },
    { name: "Blog", checked: false },
    { name: "Facebook", checked: false },
    { name: "Instagram", checked: false },
    { name: "Twitter", checked: false },
    { name: "LinkedIn", checked: false },
    { name: "WhatsApp", checked: false },
  ]);

  const handleAddMeta = useCallback(() => {
    setMetas((prev) => [...prev, ""]);
  }, []);

  const handleChangeMeta = useCallback((value, index) => {
    setMetas((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }, []);

  const handleRemoveMeta = useCallback((index) => {
    setMetas((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddValor = useCallback(() => {
    setValores((prev) => [...prev, { placeholder: "", value: "" }]);
  }, []);

  const handleChangeValor = useCallback((index, newValue) => {
    setValores((prev) => {
      const updated = [...prev];
      updated[index].value = newValue;
      return updated;
    });
  }, []);

  const handleRemoveValor = useCallback((index) => {
    setValores((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleToggleChannel = useCallback((index) => {
    setChannels((prev) => {
      const updated = [...prev];
      updated[index].checked = !updated[index].checked;
      return updated;
    });
  }, []);

  const [notification, setNotification] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(() => {
    if (!formData.companyName || formData.companyName.trim() === "") {
      showNotification("error", "O nome da empresa é obrigatório.");
      setErrors((prev) => ({
        ...prev,
        companyName: "Por favor, preencha o nome da empresa.",
      }));
      setCurrentStep(1);
      return;
    }

    const payload = {
      ...formData,
      metas,
      valores,
      channels: channels.filter((ch) => ch.checked).map((ch) => ch.name),
    };

    try {
      setIsSubmitted(true);
      showNotification("success", "Formulário enviado com sucesso!");
      console.log("Payload enviado:", payload);
    } catch (error) {
      console.error(error);
      showNotification("error", "Erro ao enviar o formulário");
    }
  }, [formData, metas, valores, channels, showNotification]);

  const handleNextStep = useCallback(() => {
    if (currentStep === 1) {
      if (!formData.companyName || formData.companyName.trim() === "") {
        showNotification(
          "error",
          "Por favor, preencha o nome da empresa para continuar."
        );
        setErrors((prev) => ({
          ...prev,
          companyName: "Por favor, preencha o nome da empresa.",
        }));
        return;
      }
    }

    if (currentStep < stepsTotal) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentStep, stepsTotal, formData, handleSubmit, showNotification]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const stepContentRef = useRef(null);
  useEffect(() => {
    if (stepContentRef.current) {
      const firstInteractive = stepContentRef.current.querySelector(
        "input, select, textarea, button"
      );
      if (firstInteractive) {
        firstInteractive.focus();
      }
    }
  }, [currentStep]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextStep(),
    onSwipedRight: () => handlePrevStep(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const renderStepContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleInputChange={handleInputChange}
            error={errors.companyName}
          />
        );
      case 2:
        return (
          <Step2 formData={formData} handleInputChange={handleInputChange} />
        );
      case 3:
        return (
          <Step3
            metas={metas}
            handleAddMeta={handleAddMeta}
            handleChangeMeta={handleChangeMeta}
            handleRemoveMeta={handleRemoveMeta}
            valores={valores}
            handleAddValor={handleAddValor}
            handleChangeValor={handleChangeValor}
            handleRemoveValor={handleRemoveValor}
            channels={channels}
            handleToggleChannel={handleToggleChannel}
          />
        );
      case 4:
        return (
          <Step4 formData={formData} handleInputChange={handleInputChange} />
        );
      case 5:
        return (
          <Step5 formData={formData} handleInputChange={handleInputChange} />
        );
      case 6:
        return (
          <Step6 formData={formData} handleInputChange={handleInputChange} />
        );
      case 7:
        return (
          <Step7 formData={formData} handleInputChange={handleInputChange} />
        );
      case 8:
        return (
          <Step8 formData={formData} handleInputChange={handleInputChange} />
        );
      default:
        return null;
    }
  }, [
    currentStep,
    formData,
    handleInputChange,
    errors,
    metas,
    handleAddMeta,
    handleChangeMeta,
    handleRemoveMeta,
    valores,
    handleAddValor,
    handleChangeValor,
    handleRemoveValor,
    channels,
    handleToggleChannel,
  ]);

  if (isSubmitted) {
    return <ThankYouScreen />;
  }

  return (
    <>
      {notification && (
        <Toast
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
      <main
        className="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 p-4 my-4"
        style={{
          minHeight: "80vh",
          maxHeight: "90vh",
          opacity: "98%",
          height: "80%",
        }}
      >
        {/* Lado Esquerdo – Imagem/Banner */}
        <div
          className="relative justify-center flex md:w-[100%] h-40 md:h-full mb-6 md:mb-0 responsivity_image"
          style={{
            background: "url(/images/banner.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "14px",
          }}
        >
          <div
            className="letterLogo"
            style={{
              background: "url(/images/somaLettersLogo.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        {/* Formulário */}
        <div className="w-full md:w-[55%] flex justify-start overflow-hidden">
          <form className="w-full h-full flex flex-col justify-between px-2 md:px-8 py-4 md:py-6">
            {/* Indicadores de etapa */}
            <div className="flex items-center gap-2 mb-4">
              {Array.from({ length: stepsTotal }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${idx + 1 === currentStep ? "bg-green-800" : "bg-gray-300"
                    }`}
                ></div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                ref={stepContentRef}
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex-1 overflow-y-auto pr-1 pb-2 -mr-1"
                style={{ maxHeight: "calc(70vh - 120px)" }}
                {...swipeHandlers}
              >
                {renderStepContent}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-4 md:mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                className="
      border 
      border-green-500 
      bg-transparent 
      text-green-500 
      py-3 
      px-6 
      text-lg 
      font-medium 
      rounded-md 
      shadow-sm 
      transition 
      duration-300 
      ease-in-out 
      hover:bg-green-50 
      focus:outline-none 
      focus:ring-2 
      focus:ring-green-400 
      focus:ring-opacity-75
      cursor-pointer
    "
                disabled={currentStep === 1}
                aria-label="Voltar"
              >
                Back
              </button>
              <div className="flex gap-2 md:gap-4">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="
      bg-green-500 
      text-white 
      py-3 
      px-6 
      text-lg 
      font-medium 
      rounded-md 
      shadow-md 
      transition 
      duration-300 
      ease-in-out 
      hover:bg-green-600 
      focus:outline-none 
      focus:ring-2 
      focus:ring-green-400 
      focus:ring-opacity-75
      cursor-pointer
    "
                  aria-label={
                    currentStep === stepsTotal ? "Enviar" : "Continuar"
                  }
                >
                  {currentStep === stepsTotal ? "Submit" : "Continue"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
