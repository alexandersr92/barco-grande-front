"use client";

import { useState } from "react";

// Conversor de moneda del diseño: tabla compra/venta + tabs Córdobas/Dólares.
export default function CurrencyConverter({
  usdBuy,
  usdSell,
}: {
  usdBuy: number;
  usdSell: number;
}) {
  const [want, setWant] = useState<"cordobas" | "dolares">("cordobas");
  const [amount, setAmount] = useState("");

  const value = parseFloat(amount.replace(",", ".")) || 0;
  // Quiero córdobas: entrego US$ → recibo C$ a tasa de compra.
  // Quiero dólares: entrego C$ → recibo US$ a tasa de venta.
  const result = want === "cordobas" ? value * usdBuy : value / usdSell;
  const resultLabel = result.toLocaleString("es-NI", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const today = new Date().toLocaleDateString("es-NI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const tabs = [
    { key: "cordobas" as const, label: "Córdobas" },
    { key: "dolares" as const, label: "Dólares" },
  ];

  return (
    <div className="h-full border border-line p-[30px] md:p-[60px]">
      <h3 className="pb-2.5 text-[28px] leading-[36.4px] tracking-[-1px] text-secondary">
        Conversor de Moneda
      </h3>
      <p className="pb-[9px] text-lg leading-[24.3px] text-muted-light">{today}</p>

      {/* Tabla compra/venta */}
      <div className="flex border border-line bg-surface px-[11px] py-px">
        <div className="flex-1 p-2.5 text-lg leading-[24.3px] text-muted">Compra</div>
        <div className="flex-1 p-2.5 text-lg leading-[24.3px] text-muted">Venta</div>
      </div>
      <div className="flex border-x border-b border-line">
        <div className="flex-1 border-r border-line p-2.5 pl-[21px] text-lg leading-[24.3px] text-muted">
          {usdBuy.toFixed(2)}
        </div>
        <div className="flex-1 p-2.5 text-lg leading-[24.3px] text-muted">
          {usdSell.toFixed(2)}
        </div>
      </div>

      <p className="py-[18px] text-lg leading-[24.3px] text-secondary">Quiero:</p>

      {/* Tabs */}
      <div className="bg-surface px-[5px] pt-2.5">
        <div className="flex">
          {tabs.map((tab) => {
            const active = want === tab.key;
            return (
              <div key={tab.key} className="flex-1 px-[5px] pb-2.5">
                <button
                  type="button"
                  onClick={() => setWant(tab.key)}
                  className={`w-full border px-[17px] pb-[17px] pt-4 text-[17px] leading-7 ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-white text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Formulario */}
      <div className="pt-[30px]">
        <label className="block text-xs font-bold leading-5 text-[#777771]">
          {want === "cordobas" ? "Ingrese el monto en US$" : "Ingrese el monto en C$"}
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-b border-[#777771] bg-transparent py-2.5 pr-[60px] text-base leading-[20.8px] text-black outline-none focus:border-primary"
          />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 px-2.5 text-base text-black">
            {want === "cordobas" ? "USD" : "NIO"}
          </span>
        </div>
      </div>

      <p className="pt-[50px] text-right text-[28px] leading-[36.4px] tracking-[-1px] text-secondary">
        = {resultLabel}
      </p>
    </div>
  );
}
