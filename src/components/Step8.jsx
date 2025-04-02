"use client";
import React from "react";

export default function Step8({ formData, handleInputChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Mapa Mental – Brand</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Lado Esquerdo – Identidade da Marca */}
        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <label htmlFor="typography" className="block text-lg font-medium text-gray-700">
              Typography (Tipografia):
            </label>
            <input
              id="typography"
              name="typography"
              type="text"
              placeholder="Ex.: Fonte Poppins para transmitir modernidade e clareza no digital"
              value={formData.typography || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="primaryPalette" className="block text-lg font-medium text-gray-700">
              Paleta de Cores Proposta – Primária:
            </label>
            <input
              id="primaryPalette"
              name="primaryPalette"
              type="text"
              placeholder="Ex.: Gradiente de azul e roxo, transmitindo inovação e criatividade"
              value={formData.primaryPalette || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="secondaryPalette" className="block text-lg font-medium text-gray-700">
              Paleta de Cores Proposta – Secundária:
            </label>
            <input
              id="secondaryPalette"
              name="secondaryPalette"
              type="text"
              placeholder="Ex.: Tons neutros, como cinza escuro"
              value={formData.secondaryPalette || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="colorPsychology" className="block text-lg font-medium text-gray-700">
              Psicologia das Cores:
            </label>
            <input
              id="colorPsychology"
              name="colorPsychology"
              type="text"
              placeholder="Ex.: Azul – Confiabilidade; Roxo – Criatividade"
              value={formData.colorPsychology || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="concept" className="block text-lg font-medium text-gray-700">
              Concept (Conceito):
            </label>
            <input
              id="concept"
              name="concept"
              type="text"
              placeholder="Ex.: Marca que reflete modernidade tecnológica e inovação, com design fluido e futurista"
              value={formData.concept || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="sensations" className="block text-lg font-medium text-gray-700">
              Sensações Transmitidas:
            </label>
            <input
              id="sensations"
              name="sensations"
              type="text"
              placeholder="Ex.: Confiança, exclusividade, vanguarda tecnológica"
              value={formData.sensations || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="graphicElements" className="block text-lg font-medium text-gray-700">
              Elementos Gráficos:
            </label>
            <input
              id="graphicElements"
              name="graphicElements"
              type="text"
              placeholder="Ex.: Formas geométricas (curvas que transmitem fluidez) e combinação de cores e tipografia que reforçam a identidade"
              value={formData.graphicElements || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Lado Direito – Estrutura da Marca */}
        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <label htmlFor="brandStructure" className="block text-lg font-medium text-gray-700">
              Estrutura da Marca:
            </label>
            <textarea
              id="brandStructure"
              name="brandStructure"
              placeholder="Descreva a estrutura da marca, se necessário"
              value={formData.brandStructure || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
