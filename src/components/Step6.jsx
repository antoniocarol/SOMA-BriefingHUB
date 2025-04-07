"use client";
import React from "react";

export default function Step6({ formData, handleInputChange }) {
  const traits = [
    "Inovadora", "Determinada", "Forte", "Agressiva", "Discreta", "Delicada",
    "Elegante", "Moderna", "Feliz", "Alegre", "Divertida", "Simples", "Tradicional",
    "Rústica", "Popular", "Ousada", "Transparente", "Chamativa", "Profissional",
    "Séria", "Calma", "Sutil", "Diferente", "Corajosa", "Amorosa", "Romântica",
    "Amigável", "Convidativa", "Radical", "Digital", "Antiga", "Nostálgica",
    "Persistente", "Arrojada",
  ];

  return (
    <div className="space-y-4 pl-1">
      <h2 className="text-xl font-semibold text-gray-800">Identidade Visual</h2>
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Personalidade da Marca:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {traits.map((trait) => (
            <label key={trait} className="flex items-center">
              <input
                type="checkbox"
                name={`trait-${trait}`}
                checked={formData[`trait-${trait}`] || false}
                onChange={handleInputChange}
                className="h-5 w-5 accent-green-600 focus:ring-2 focus:ring-green-500 border border-gray-300 rounded transition-colors"
                aria-label={trait}
              />
              <span className="ml-2 text-lg text-gray-800">{trait}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="brandCharacteristics" className="block text-lg font-medium text-gray-700">
          Três principais características da marca:
        </label>
        <input
          id="brandCharacteristics"
          name="brandCharacteristics"
          type="text"
          placeholder="Ex.: Diferente, Ambiciosa, Inovadora"
          value={formData.brandCharacteristics || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="nonBrandCharacteristics" className="block text-lg font-medium text-gray-700">
          Características que não têm relação com a marca:
        </label>
        <input
          id="nonBrandCharacteristics"
          name="nonBrandCharacteristics"
          type="text"
          placeholder="Ex.: Fragilidade, Ser Igual, Conservadorismo"
          value={formData.nonBrandCharacteristics || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
}
