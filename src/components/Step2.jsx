"use client";
import React from "react";

export default function Step2({ formData, handleInputChange }) {
  return (
    <div className="space-y-4 pl-1">
      <h2 className="text-xl font-semibold text-gray-800">Sobre Você</h2>
      <div>
        <label htmlFor="role" className="block text-lg font-medium text-gray-700">
          Qual é sua função dentro da empresa?
        </label>
        <input
          id="role"
          name="role"
          type="text"
          placeholder="Ex.: CEO, Fundador, etc."
          value={formData.role || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="marketView" className="block text-lg font-medium text-gray-700">
          Como você enxerga o mercado regional atualmente?
        </label>
        <input
          id="marketView"
          name="marketView"
          type="text"
          placeholder="Ex.: Desafiante, Competitivo, em Desenvolvimento, etc."
          value={formData.marketView || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="projectReasons" className="block text-lg font-medium text-gray-700">
          Quais são os principais motivos para construir este projeto?
        </label>
        <input
          id="projectReasons"
          name="projectReasons"
          type="text"
          placeholder="Ex.: Trazer inovação, expandir o mercado, etc."
          value={formData.projectReasons || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="brandRelation" className="block text-lg font-medium text-gray-700">
          Você possui alguma relação especial com a marca?
        </label>
        <input
          id="brandRelation"
          name="brandRelation"
          type="text"
          placeholder="Ex.: Fundador, Idealizador, Investidor, etc."
          value={formData.brandRelation || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="brandMeaning" className="block text-lg font-medium text-gray-700">
          O nome da sua marca tem algum significado específico?
        </label>
        <input
          id="brandMeaning"
          name="brandMeaning"
          type="text"
          placeholder="Ex.: Representa os idealizadores ou reflete a missão da empresa"
          value={formData.brandMeaning || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
}