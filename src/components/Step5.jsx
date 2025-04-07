"use client";
import React from "react";

export default function Step5({ formData, handleInputChange }) {
  return (
    <div className="space-y-4 pl-1">
      <h2 className="text-xl font-semibold text-gray-800">Público-Alvo</h2>
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          Classe social do público:
        </label>
        <div className="flex gap-4">
          {["A", "B", "C", "D", "E"].map((cls) => (
            <label key={cls} className="inline-flex items-center">
              <input
                type="checkbox"
                name={`socialClass-${cls}`}
                checked={formData[`socialClass-${cls}`] || false}
                onChange={handleInputChange}
                className="h-5 w-5 accent-green-600 focus:ring-2 focus:ring-green-500 border border-gray-300 rounded mr-2 transition-colors"
                aria-label={cls}
              />
              <span className="text-lg text-gray-800">{cls}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="gender" className="block text-lg font-medium text-gray-700">
          Gênero predominante do público-alvo:
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender || ""}
          onChange={handleInputChange}
          className="block w-full rounded-lg px-4 py-3 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors appearance-none bg-white pr-10"
        >
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Ambos">Ambos</option>
        </select>
      </div>
      <div>
        <label htmlFor="ageRange" className="block text-lg font-medium text-gray-700">
          Faixa etária do público-alvo:
        </label>
        <input
          id="ageRange"
          name="ageRange"
          type="text"
          placeholder="Ex.: 20-65"
          value={formData.ageRange || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="targetType" className="block text-lg font-medium text-gray-700">
          Tipo de público-alvo:
        </label>
        <select
          id="targetType"
          name="targetType"
          value={formData.targetType || ""}
          onChange={handleInputChange}
          className="block w-full rounded-lg px-4 py-3 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors appearance-none bg-white pr-10"
        >
          <option value="">Selecione</option>
          <option value="Consumidor final">Consumidor final</option>
          <option value="Corporativo">Corporativo</option>
        </select>
      </div>
      <div>
        <label htmlFor="reach" className="block text-lg font-medium text-gray-700">
          Abrangência da empresa:
        </label>
        <select
          id="reach"
          name="reach"
          value={formData.reach || ""}
          onChange={handleInputChange}
          className="block w-full rounded-lg px-4 py-3 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors appearance-none bg-white pr-10"
        >
          <option value="">Selecione</option>
          <option value="Regional">Regional</option>
          <option value="Nacional">Nacional</option>
          <option value="Internacional">Internacional</option>
        </select>
      </div>
    </div>
  );
}
