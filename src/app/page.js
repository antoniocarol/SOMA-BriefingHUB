"use client";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

import WelcomeScreen from "@/components/WelcomeScreen";
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
  // Estado para a tela de boas-vindas
  const [showWelcome, setShowWelcome] = useState(true);

  // Estados do formulário
  const [currentStep, setCurrentStep] = useState(1);
  const stepsTotal = 8;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Estados dinâmicos do Step3
  const [metas, setMetas] = useState([""]);
  const [valores, setValores] = useState([{ placeholder: "Ambição", value: "" }]);
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

  // Estado de loading e notificações
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Função para exibir notificações
  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
  }, []);

  // Handlers para metas
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

  // Handlers para valores
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

  // Handler para canais de comunicação
  const handleToggleChannel = useCallback((index) => {
    setChannels((prev) =>
      prev.map((channel, i) =>
        i === index ? { ...channel, checked: !channel.checked } : channel
      )
    );
  }, []);

  // Handler para inputs genéricos
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

  // Handler para enviar o formulário
  const handleSubmit = useCallback(async () => {
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
      setIsLoading(true);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        showNotification("error", errorData.message || "Erro ao enviar o formulário");
        return;
      }
      setIsSubmitted(true);
      showNotification("success", "Formulário enviado com sucesso!");
      console.log("Payload enviado:", payload);
    } catch (error) {
      console.error(error);
      showNotification("error", "Erro ao enviar o formulário");
    } finally {
      setIsLoading(false);
    }
  }, [formData, metas, valores, channels, showNotification]);

  const handleNextStep = useCallback(() => {
    if (currentStep === 1) {
      if (!formData.companyName || formData.companyName.trim() === "") {
        showNotification("error", "Por favor, preencha o nome da empresa para continuar.");
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
    if (!showWelcome && currentStep === 1) {
      // Se estiver no primeiro step do formulário e não estiver na tela de welcome, retorna para a tela de boas-vindas
      setShowWelcome(true);
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep, showWelcome]);

  // Foco automático no primeiro campo de cada step
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

  // Configuração do swipe para navegação entre steps
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextStep(),
    onSwipedRight: () => handlePrevStep(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Render do conteúdo do step atual (para o formulário)
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
        return <Step2 formData={formData} handleInputChange={handleInputChange} />;
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
        return <Step4 formData={formData} handleInputChange={handleInputChange} />;
      case 5:
        return <Step5 formData={formData} handleInputChange={handleInputChange} />;
      case 6:
        return <Step6 formData={formData} handleInputChange={handleInputChange} />;
      case 7:
        return <Step7 formData={formData} handleInputChange={handleInputChange} />;
      case 8:
        return <Step8 formData={formData} handleInputChange={handleInputChange} />;
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

  /**
   * Render condicional do conteúdo à direita (Welcome, Formulário ou Thank You),
   * usando a mesma estrutura de “caixa” para manter os botões no mesmo lugar.
   */
  const renderContent = useMemo(() => {
    // 1) WelcomeScreen
    if (showWelcome && !isSubmitted) {
      return (
        <div className="w-full h-full flex flex-col justify-between px-2 md:px-8 py-4 md:py-6">
          {/* Conteúdo centralizado */}
          <div className="flex-1 flex items-center justify-center">
            <WelcomeScreen />
          </div>

          {/* Barra de botões */}
          <div className="flex items-center justify-between mt-4 md:mt-8">
            <div /> {/* Espaço para alinhamento */}
            <button
              type="button"
              onClick={() => setShowWelcome(false)}
              className="bg-green-500 text-white py-3 px-6 text-lg font-medium rounded-md shadow-md transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer"
            >
              Iniciar Briefing
            </button>
          </div>
        </div>
      );
    }
    // 2) ThankYouScreen
    else if (isSubmitted) {
      return (
        <div className="w-full h-full flex flex-col justify-between px-2 md:px-8 py-4 md:py-6">
          {/* Conteúdo centralizado */}
          <div className="flex-1 flex items-center justify-center">
            <ThankYouScreen />
          </div>

          {/* Barra de botões */}
          <div className="flex items-center justify-between mt-4 md:mt-8">
            <div />
            <button
              type="button"
              onClick={() => {
                console.log("Fechando ou redirecionando...");
              }}
              className="bg-green-500 text-white py-3 px-6 text-lg font-medium rounded-md shadow-md transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      );
    }
    // 3) Formulário (Steps)
    else {
      return (
        <form className="w-full h-full flex flex-col justify-between px-2 md:px-8 py-4 md:py-6">
          {/* Indicadores de etapa */}
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: stepsTotal }).map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx + 1 === currentStep ? "bg-green-800" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          {/* Área do conteúdo do Step */}
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

          {/* Barra de botões (Back, Continue/Submit) */}
          <div className="flex items-center justify-between mt-4 md:mt-8">
            <button
              type="button"
              onClick={handlePrevStep}
              className="border border-green-500 bg-transparent text-green-500 py-3 px-6 text-lg font-medium rounded-md shadow-sm transition duration-300 ease-in-out hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer"
              disabled={isLoading}
              aria-label="Voltar"
            >
              Back
            </button>
            <div className="flex gap-2 md:gap-4">
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500 mr-2" />
                  <span className="text-green-600">Enviando...</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-green-500 text-white py-3 px-6 text-lg font-medium rounded-md shadow-md transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer"
                  aria-label={currentStep === stepsTotal ? "Enviar" : "Continuar"}
                >
                  {currentStep === stepsTotal ? "Submit" : "Continue"}
                </button>
              )}
            </div>
          </div>
        </form>
      );
    }
  }, [
    showWelcome,
    isSubmitted,
    currentStep,
    stepsTotal,
    isLoading,
    renderStepContent,
    swipeHandlers,
  ]);

  // Layout principal com banner à esquerda e conteúdo (Welcome, Formulário ou ThankYou)
  return (
    <>
      {notification && <Toast notification={notification} onClose={() => setNotification(null)} />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.97 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 p-4 my-4"
        style={{
          minHeight: "80vh",
          maxHeight: "90vh",
          opacity: "98%",
          height: "80%",
        }}
      >
        {/* Banner com animação slide-up */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="relative justify-center flex md:w-[45%] h-40 md:h-full mb-6 md:mb-0 responsivity_image"
          style={{
            background: "url(/images/banner.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "14px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3.3 }}
            className="letterLogo"
            style={{
              background: "url(/images/somaLettersLogo.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></motion.div>
        </motion.div>

        {/* Área de Conteúdo (WelcomeScreen, Formulário ou ThankYouScreen) */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.6 }}
          className="w-full md:w-[55%] flex justify-start overflow-hidden items-center"
          style={{ padding: "0 1rem" }}
        >
          {renderContent}
        </motion.div>
      </motion.main>
    </>
  );
}
