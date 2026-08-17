export type PriceItem = {
  service: string;
  price: string;
};

export type ServicePack = {
  name: string;
  includes: string;
  price: string;
};

export const priceItems: PriceItem[] = [
  { service: "Sofá de 1 lugar / poltrona", price: "35 €" },
  { service: "Sofá de 2 lugares", price: "55 €" },
  { service: "Sofá de 3 lugares", price: "70 €" },
  { service: "Sofá de 4 lugares", price: "85 €" },
  { service: "Lugar extra", price: "+15 €" },
  { service: "Chaise longue", price: "+10 €" },
  { service: "Colchão de solteiro", price: "35 €" },
  { service: "Colchão de casal", price: "50 €" },
  { service: "Colchão king size", price: "60 €" },
  { service: "Cabeceira de cama", price: "20 €" },
  { service: "Tapetes pequenos", price: "desde 25 €" },
  { service: "Carpetes", price: "desde 5 €/m²" },
  { service: "Impermeabilização de sofá", price: "desde 45 €" },
  { service: "Remoção de pelos de animais", price: "+10 €" },
];

export const servicePacks: ServicePack[] = [
  { name: "Pack Sofá + Colchão", includes: "Sofá + colchão de casal", price: "105 €" },
  { name: "Pack Duplo", includes: "Sofá + 2 colchões", price: "125 €" },
  { name: "Pack Casa Fresca", includes: "Sofá de 3 lugares + colchão de casal + 1 tapete", price: "145 €" },
  { name: "Pack Família", includes: "Sofá de 4 lugares + 2 colchões + 1 tapete", price: "175 €" },
];

export const ironingOffer = {
  title: "Engomadoria ao domicílio",
  price: "desde 15 €/hora",
  details: [
    "Mínimo de serviço: 2 horas",
    "Camisas e peças delicadas incluídas no tempo de serviço",
    "Deslocação incluída dentro da zona habitual de atendimento",
  ],
} as const;

export const pricingNotice =
  "Os preços são indicativos. O tamanho, o tecido, o estado da peça, manchas, acessos e localização podem alterar o valor final, sempre confirmado antes do serviço.";
