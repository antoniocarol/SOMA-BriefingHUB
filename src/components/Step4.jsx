"use client";
import React from "react";

export default function Step4({ formData, handleInputChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Concorrência</h2>
      <div>
        <label htmlFor="competitors" className="block text-lg font-medium text-gray-700">
          Quem são seus principais concorrentes?
        </label>
        <input
          id="competitors"
          name="competitors"
          type="text"
          placeholder="Ex.: Lista de concorrentes"
          value={formData.competitors || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="strongestCompetitor" className="block text-lg font-medium text-gray-700">
          Concorrente mais forte:
        </label>
        <input
          id="strongestCompetitor"
          name="strongestCompetitor"
          type="text"
          placeholder="Ex.: Nome do concorrente"
          value={formData.strongestCompetitor || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="differential" className="block text-lg font-medium text-gray-700">
          Diferencial que destaca a empresa dos concorrentes:
        </label>
        <input
          id="differential"
          name="differential"
          type="text"
          placeholder="Ex.: Foco em inovação, atendimento personalizado, etc."
          value={formData.differential || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
}