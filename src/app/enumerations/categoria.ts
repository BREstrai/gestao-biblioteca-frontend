export const CategoriaEnum = {
    FICCAO: { id: 1, valor: 'FICCAO', descricao: 'Ficção' },
    NAO_FICCAO: { id: 2, valor: 'NAO_FICCAO', descricao: 'Não Ficção' },
    INFANTOJUVENIL: { id: 3, valor: 'INFANTOJUVENIL', descricao: 'Infantojuvenil' },
    ACADEMICOS_E_TECNICOS: { id: 4, valor: 'ACADEMICOS_E_TECNICOS', descricao: 'Acadêmicos e Técnicos' },
    POESIA_E_TEATRO: { id: 5, valor: 'POESIA_E_TEATRO', descricao: 'Poesia e Teatro' },
    ARTE_E_CULTURA: { id: 6, valor: 'ARTE_E_CULTURA', descricao: 'Arte e Cultura' },
    GASTRONOMIA: { id: 7, valor: 'GASTRONOMIA', descricao: 'Gastronomia' },
    ESPORTES_E_LAZER: { id: 8, valor: 'ESPORTES_E_LAZER', descricao: 'Esportes e Lazer' },
    GRAPHIC_NOVELS_E_QUADRINHOS: { id: 9, valor: 'GRAPHIC_NOVELS_E_QUADRINHOS', descricao: 'Graphic Novels e Quadrinhos' },
    ENSAIOS: { id: 10, valor: 'ENSAIOS', descricao: 'Ensaios' },
    GUIAS_E_MANUAIS: { id: 11, valor: 'GUIAS_E_MANUAIS', descricao: 'Guias e Manuais' },
    ESOTERISMO_E_ESPIRITUALIDADE: { id: 12, valor: 'ESOTERISMO_E_ESPIRITUALIDADE', descricao: 'Esoterismo e Espiritualidade' },
    AUTOAJUDA_ESPIRITUAL: { id: 13, valor: 'AUTOAJUDA_ESPIRITUAL', descricao: 'Autoajuda Espiritual' },
    DIDATICOS_E_PARADIDATICOS: { id: 14, valor: 'DIDATICOS_E_PARADIDATICOS', descricao: 'Didáticos e Paradidáticos' },
    LIVROS_DE_REFERENCIA: { id: 15, valor: 'LIVROS_DE_REFERENCIA', descricao: 'Livros de Referência' },
    EROTISMO: { id: 16, valor: 'EROTISMO', descricao: 'Erotismo' },
    LIVROS_INTERATIVOS: { id: 17, valor: 'LIVROS_INTERATIVOS', descricao: 'Livros Interativos' },
    NOVELAS_LITERARIAS: { id: 18, valor: 'NOVELAS_LITERARIAS', descricao: 'Novelas Literárias' }
} as const;

export type CategoriaEnum = typeof CategoriaEnum[keyof typeof CategoriaEnum];