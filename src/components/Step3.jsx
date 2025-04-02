"use client";
import React from "react";

export default function Step3({
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
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Sobre o Negócio</h2>
      <div>
        <label htmlFor="founded" className="block text-lg font-medium text-gray-700">
          Quando sua empresa começou?
        </label>
        <input
          id="founded"
          name="founded"
          type="text"
          placeholder="Ex.: Ano de Fundação"
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="offerings" className="block text-lg font-medium text-gray-700">
          O que sua empresa oferece?
        </label>
        <input
          id="offerings"
          name="offerings"
          type="text"
          placeholder="Ex.: Serviços de TI, Soluções Digitais, Consultoria, etc."
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Metas dinâmicas */}
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          Metas Alcançáveis:
        </label>
        {metas.map((meta, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              name={`meta-${index}`}
              value={meta}
              onChange={(e) => handleChangeMeta(e.target.value, index)}
              placeholder={`Meta ${index + 1}: Ex.: Se tornar uma empresa rentável`}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
              aria-label={`Meta ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveMeta(index)}
              className="text-sm text-red-500 hover:underline transition-colors"
              aria-label={`Remover meta ${index + 1}`}
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMeta}
          className="text-sm hover:underline"
          style={{ color: "#9eae49" }}
        >
          + Adicionar meta
        </button>
      </div>

      <div>
        <label htmlFor="keywords" className="block text-lg font-medium text-gray-700">
          Palavras-chave que representam sua empresa:
        </label>
        <input
          id="keywords"
          name="keywords"
          type="text"
          placeholder="Ex.: Inovação, Ambição, Tecnologia"
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="consumerProfile" className="block text-lg font-medium text-gray-700">
          Quem é seu consumidor final?
        </label>
        <textarea
          id="consumerProfile"
          name="consumerProfile"
          placeholder="Ex.: Descreva o perfil (ex.: Diversificado, exigente, antenado em tecnologia)"
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
          aria-label="Perfil do consumidor"
        ></textarea>
      </div>

      {/* Valores dinâmicos */}
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          Missão, Visão e Valores da Empresa:
        </label>
        {valores.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              name={`valor-${idx}`}
              placeholder={`${item.placeholder}: Ex.: Descrição`}
              value={item.value}
              onChange={(e) => handleChangeValor(idx, e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
              aria-label={item.placeholder}
            />
            <button
              type="button"
              onClick={() => handleRemoveValor(idx)}
              className="text-sm text-red-500 hover:underline transition-colors"
              aria-label="Remover valor"
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddValor}
          className="text-sm hover:underline"
          style={{ color: "#9eae49" }}
        >
          + Adicionar valor
        </button>
      </div>

      <div>
        <label htmlFor="mainProduct" className="block text-lg font-medium text-gray-700">
          Produto ou Serviço mais forte da marca:
        </label>
        <input
          id="mainProduct"
          name="mainProduct"
          type="text"
          placeholder="Ex.: Nome do Produto/Serviço Principal"
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="idealCustomer" className="block text-lg font-medium text-gray-700">
          Cliente Ideal:
        </label>
        <input
          id="idealCustomer"
          name="idealCustomer"
          type="text"
          placeholder="Ex.: Aquele que valoriza inovação e busca crescimento"
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="customerDoubts" className="block text-lg font-medium text-gray-700">
          Principais Dúvidas e Dores do Cliente ao entrar em contato com a empresa:
        </label>
        <input
          id="customerDoubts"
          name="customerDoubts"
          type="text"
          placeholder="Ex.: Questões sobre preço, confiabilidade, suporte, etc."
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="companyWeakness" className="block text-lg font-medium text-gray-700">
          Aspectos onde a empresa perde para os concorrentes:
        </label>
        <input
          id="companyWeakness"
          name="companyWeakness"
          type="text"
          placeholder="Ex.: Custo, alcance, experiência, etc."
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="brandApplication" className="block text-lg font-medium text-gray-700">
          Onde você gostaria de ver sua marca aplicada?
        </label>
        <input
          id="brandApplication"
          name="brandApplication"
          type="text"
          placeholder="Ex.: Redes Sociais, TV, Internet, etc."
          className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 text-gray-800 transition-colors focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Canais de Comunicação – checkboxes */}
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          Canais de Comunicação da Empresa:
        </label>
        <div className="flex flex-wrap gap-2">
          {channels.map((channel, i) => (
            <label key={channel.name} className="inline-flex items-center">
              <input
                type="checkbox"
                name={`channel-${channel.name}`}
                checked={channel.checked}
                onChange={() => handleToggleChannel(i)}
                className="h-5 w-5 accent-green-600 focus:ring-2 focus:ring-green-500 border border-gray-300 rounded mr-2 transition-colors"
                aria-label={channel.name}
              />
              <span className="text-lg text-gray-800">{channel.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
