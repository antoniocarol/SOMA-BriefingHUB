"use client";
import React from "react";

export default function Step7({ formData, handleInputChange }) {
  const characteristics = [
    "Sério", "Divertido", "Básico", "Complexo", "Vibrante", "Neutro",
    "Moderno", "Tradicional", "Elegante", "Popular", "Digital", "Físico",
    "Conservador", "Ousado", "Masculino", "Feminino", "Leve", "Robusto",
    "Empresarial", "Humano",
  ];

  return (
    <div className="space-y-4 pl-1">
      <h2 className="text-xl font-semibold text-gray-800">Escala de Características da Marca</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-gray-800">
          <thead>
            <tr>
              <th className="px-2 py-1 border border-gray-300">Característica</th>
              {[1, 2, 3, 4, 5].map((num) => (
                <th key={num} className="px-2 py-1 border border-gray-300 text-center">
                  {num}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {characteristics.map((carac, index) => {
              const groupName = carac.toLowerCase().replace(/\s/g, "");
              return (
                <tr key={carac} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-2 py-1 border border-gray-300">{carac}</td>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <td key={num} className="px-2 py-1 border border-gray-300 text-center">
                      <input
                        type="radio"
                        name={groupName}
                        value={num}
                        checked={formData[groupName] === String(num)}
                        onChange={handleInputChange}
                        aria-label={`${carac} - ${num}`}
                        className="cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}