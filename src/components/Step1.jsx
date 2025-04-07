"use client";
import React from "react";

export default function Step1({ formData, handleInputChange, error }) {
  return (
    <div className="space-y-4 pl-1">
      <h2 className="text-xl font-semibold text-gray-800">Informações da Empresa</h2>
      <div>
        <label htmlFor="companyName" className="block text-lg font-medium text-gray-700">
          Nome da Empresa*:
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          placeholder="Ex.: Nome da Empresa"
          value={formData.companyName || ""}
          onChange={handleInputChange}
          aria-invalid={error ? "true" : "false"}
          className={`w-full rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors 
            focus:ring-2 focus:ring-green-500 ${error ? "border-red-500" : "border border-gray-300"}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <div>
        <label htmlFor="tagline" className="block text-lg font-medium text-gray-700">
          Tagline do Logotipo:
        </label>
        <input
          id="tagline"
          name="tagline"
          type="text"
          placeholder="Ex.: Sua Ambição, Nossa Missão. Seja Diferente"
          value={formData.tagline || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="slogan" className="block text-lg font-medium text-gray-700">
          Slogan:
        </label>
        <input
          id="slogan"
          name="slogan"
          type="text"
          placeholder="Ex.: Navegando na Excelência, Unindo Ambições"
          value={formData.slogan || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
}