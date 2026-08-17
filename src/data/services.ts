import type { LucideIcon } from "lucide-react";
import { Armchair, BedDouble, CarFront, Grid2X2, Layers3, Shirt, Sofa } from "lucide-react";

export type ServiceId = "sofas" | "cadeiras" | "colchoes" | "carpetes" | "tapetes" | "estofos-automovel" | "engomadoria";

export type Service = {
  id: ServiceId;
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  description: string;
  seoDescription: string;
  icon: LucideIcon;
  priceLabel?: string;
  variants: string[];
  suitableFor: string[];
  benefits: string[];
  considerations: string[];
  processNote: string;
};

export const services: Service[] = [
  {
    id: "sofas",
    slug: "limpeza-de-sofas",
    title: "Limpeza de sofás",
    shortTitle: "Sofás",
    eyebrow: "Conforto recuperado",
    summary: "Tratamento cuidado para higienizar o tecido, trabalhar manchas e revitalizar a aparência do sofá.",
    description: "Cada sofá é avaliado de acordo com o tecido, configuração, utilização e estado. O tratamento procura remover sujidade acumulada e melhorar o aspeto global sem aplicar uma abordagem indiferenciada a todos os materiais.",
    seoDescription: "Limpeza de sofás em Leiria com avaliação do tecido, tratamento cuidado e serviço ao domicílio sempre que as condições o permitam.",
    icon: Sofa,
    priceLabel: "desde 35 €",
    variants: ["1 lugar", "2 lugares", "3 lugares", "4 ou mais lugares", "Com chaise longue", "Modular", "Não sei"],
    suitableFor: ["Sofás de tecido", "Sofás modulares", "Chaise longues", "Sofás-cama"],
    benefits: ["Higienização mais profunda do que a manutenção doméstica", "Tratamento ajustado ao tipo e estado do tecido", "Serviço em casa quando existem condições adequadas"],
    considerations: ["Algumas manchas podem estar fixadas ou ter alterado a cor da fibra", "Tecidos delicados exigem uma avaliação particularmente prudente", "O resultado e a secagem dependem do tecido, ventilação e tratamento"],
    processNote: "Antes de intervir, observamos tecido, manchas, zonas de maior uso e condições de acesso e ventilação.",
  },
  {
    id: "cadeiras",
    slug: "limpeza-de-cadeiras",
    title: "Limpeza de cadeiras e cadeirões",
    shortTitle: "Cadeiras",
    eyebrow: "Detalhe em cada peça",
    summary: "Limpeza especializada de assentos, costas e detalhes estofados, em peças individuais ou conjuntos.",
    description: "Cadeiras de refeição, cadeirões e bancos estofados acumulam marcas de contacto e utilização em áreas pequenas mas exigentes. Adaptamos a abordagem à construção da peça e ao revestimento.",
    seoDescription: "Limpeza de cadeiras e cadeirões em Leiria, com tratamento individualizado de assentos e encostos estofados.",
    icon: Armchair,
    variants: ["Cadeira — apenas assento", "Cadeira — assento e costas", "Cadeirão", "Banco estofado", "Conjunto variado", "Não sei"],
    suitableFor: ["Cadeiras de refeição", "Cadeirões", "Bancos estofados", "Cadeiras de escritório"],
    benefits: ["Tratamento consistente de conjuntos", "Atenção a costuras, rebordos e zonas de contacto", "Possibilidade de combinar várias categorias no mesmo pedido"],
    considerations: ["A estrutura e os acabamentos condicionam a técnica", "Marcas de desgaste não são o mesmo que sujidade", "Peças sem condições no local podem exigir aconselhamento ou recolha"],
    processNote: "A quantidade, o tipo de estofamento e o acesso às diferentes faces ajudam a definir o serviço adequado.",
  },
  {
    id: "colchoes",
    slug: "limpeza-de-colchoes",
    title: "Higienização de colchões",
    shortTitle: "Colchões",
    eyebrow: "Cuidado onde descansa",
    summary: "Higienização cuidada da superfície têxtil, com atenção ao uso, ventilação e características do colchão.",
    description: "A superfície de um colchão beneficia de uma avaliação cuidadosa antes do tratamento. Consideramos tamanho, faces a tratar, tecido, manchas e ventilação do espaço, sem fazer promessas clínicas ou terapêuticas.",
    seoDescription: "Higienização de colchões em Leiria com avaliação do estado, das faces a tratar e das condições de ventilação.",
    icon: BedDouble,
    priceLabel: "desde 35 €",
    variants: ["Individual", "Casal", "Queen size", "King size", "Berço/criança", "Apenas uma face", "Duas faces", "Não sei"],
    suitableFor: ["Colchões de adulto", "Colchões infantis", "Colchões de quarto de hóspedes", "Uma ou duas faces acessíveis"],
    benefits: ["Remoção de sujidade presente na superfície têxtil", "Avaliação das manchas antes do tratamento", "Planeamento de acordo com a ventilação do espaço"],
    considerations: ["Não são comunicados benefícios médicos", "Algumas alterações de cor podem ser permanentes", "O colchão deve permanecer sem uso até estar devidamente seco"],
    processNote: "Indicamos os cuidados posteriores adequados depois de observar o colchão e as condições do quarto.",
  },
  {
    id: "carpetes",
    slug: "limpeza-de-carpetes",
    title: "Limpeza de carpetes",
    shortTitle: "Carpetes",
    eyebrow: "Superfícies amplas, método preciso",
    summary: "Tratamento de carpetes fixas ou de grande dimensão, planeado em função da área, fibra e utilização.",
    description: "A limpeza de uma carpete exige compreender a área, a construção, a sujidade e a forma como o espaço pode ser utilizado durante a intervenção e a secagem.",
    seoDescription: "Limpeza de carpetes em Leiria para habitações e pequenos espaços profissionais, sujeita a avaliação da área e condições do local.",
    icon: Grid2X2,
    priceLabel: "desde 5 €/m²",
    variants: ["Até 10 m²", "11–25 m²", "26–50 m²", "Mais de 50 m²", "Área desconhecida"],
    suitableFor: ["Carpete fixa", "Corredores e zonas de passagem", "Quartos e salas", "Pequenos espaços profissionais"],
    benefits: ["Planeamento por área e intensidade de uso", "Atenção a zonas de passagem e manchas localizadas", "Intervenção articulada com o funcionamento do espaço"],
    considerations: ["É necessário confirmar fibra, fixação e condições do pavimento", "A ventilação influencia a secagem", "Áreas profissionais podem exigir planeamento adicional"],
    processNote: "A área aproximada, os acessos e o tipo de utilização permitem preparar uma avaliação mais útil.",
  },
  {
    id: "tapetes",
    slug: "limpeza-de-tapetes",
    title: "Limpeza de tapetes",
    shortTitle: "Tapetes",
    eyebrow: "Fibras tratadas com critério",
    summary: "Avaliação e limpeza de tapetes de diferentes dimensões, com recolha e entrega quando necessário.",
    description: "Tapetes variam muito em fibra, construção, cor e estabilidade. Por isso, analisamos as características conhecidas e decidimos se o tratamento pode acontecer no local ou se é preferível recolher a peça.",
    seoDescription: "Limpeza de tapetes em Leiria, no local ou com recolha e entrega quando a peça ou o tratamento o exigem.",
    icon: Layers3,
    priceLabel: "desde 25 €",
    variants: ["Pequeno — até 2 m²", "Médio — 2 a 6 m²", "Grande — mais de 6 m²", "Passadeira", "Medida desconhecida"],
    suitableFor: ["Tapetes de sala", "Tapetes de quarto", "Passadeiras", "Peças de dimensões especiais sujeitas a avaliação"],
    benefits: ["Decisão informada entre serviço no local e recolha", "Tratamento adaptado à fibra e construção", "Atenção a franjas, rebordos e estabilidade da cor"],
    considerations: ["Peças delicadas ou de composição desconhecida exigem avaliação", "Nem todos os tapetes podem ser tratados no domicílio", "Danos, descoloração ou desgaste pré-existentes podem permanecer"],
    processNote: "Se não souber o material ou a medida, basta indicar o que conhece; a equipa confirma os restantes detalhes.",
  },
  {
    id: "estofos-automovel",
    slug: "estofos-automovel",
    title: "Limpeza de estofos automóveis",
    shortTitle: "Automóvel",
    eyebrow: "Interior cuidado",
    summary: "Limpeza de bancos e superfícies têxteis do habitáculo, ajustada ao veículo e ao estado dos estofos.",
    description: "O tratamento foca bancos e outras superfícies têxteis indicadas no pedido. O número de lugares, o tipo de utilização e as condições de acesso ao veículo ajudam a preparar a intervenção.",
    seoDescription: "Limpeza de estofos automóveis em Leiria, incluindo bancos e superfícies têxteis do habitáculo sujeitas a avaliação.",
    icon: CarFront,
    variants: ["Bancos dianteiros", "Banco traseiro", "Interior completo — lugares", "Cadeira auto", "Bagageira têxtil", "Outro", "Não sei"],
    suitableFor: ["Bancos em tecido", "Bancos dianteiros e traseiros", "Cadeiras auto sujeitas a avaliação", "Outras superfícies têxteis indicadas"],
    benefits: ["Tratamento focado nos pontos de contacto e utilização", "Possibilidade de indicar odores ou manchas específicas", "Planeamento segundo o veículo e o local"],
    considerations: ["Materiais que não sejam têxteis podem exigir outro tipo de serviço", "A origem e antiguidade das manchas condicionam o resultado", "O veículo necessita de condições adequadas de acesso e ventilação"],
    processNote: "Indique o veículo, os lugares a tratar e as necessidades específicas para receber uma avaliação mais precisa.",
  },
  {
    id: "engomadoria",
    slug: "engomadoria-ao-domicilio",
    title: "Engomadoria ao domicílio",
    shortTitle: "Engomadoria",
    eyebrow: "Roupa cuidada em sua casa",
    summary: "Engomadoria ao domicílio para roupa do dia a dia, camisas e peças delicadas, com um mínimo de duas horas.",
    description: "A engomadoria é realizada no domicílio, com atendimento cuidado e personalizado. O tempo necessário depende da quantidade, do tipo de peças e dos cuidados específicos de cada tecido.",
    seoDescription: "Engomadoria ao domicílio em Leiria, Fátima, Ourém e arredores, desde 15 euros por hora e com serviço mínimo de duas horas.",
    icon: Shirt,
    priceLabel: "desde 15 €/hora",
    variants: ["2 horas — mínimo", "3 horas", "4 horas", "Mais de 4 horas", "Não sei"],
    suitableFor: ["Roupa do dia a dia", "Camisas", "Peças delicadas sujeitas a avaliação", "Serviço regular ou pontual"],
    benefits: ["Serviço no conforto da sua casa", "Camisas e peças delicadas incluídas no tempo contratado", "Deslocação incluída na zona habitual de atendimento"],
    considerations: ["O serviço mínimo é de duas horas", "O volume e o tipo de roupa condicionam o tempo necessário", "Peças com cuidados especiais são avaliadas antes do início"],
    processNote: "Indique a quantidade aproximada, o tipo de peças e a localidade para confirmarmos a duração e a deslocação.",
  },
];

export const serviceIds = services.map((service) => service.id) as [ServiceId, ...ServiceId[]];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}
