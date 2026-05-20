export interface Treino {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  habilidade: string;
  urlYoutube: string;
  dicas: string[];
  start?: number;
  end?: number;
}

export interface Posicao {
  id: string;
  nome: string;
  abreviacao: string;
  descricao: string;
  icone: string;
  cor: string;
  treinos: Treino[];
}

export const POSITIONS_DATA: Posicao[] = [
  {
    id: 'armador',
    nome: 'Armador',
    abreviacao: 'PG',
    descricao: 'O maestro da equipe. Controla o ritmo do jogo e distribui as jogadas.',
    icone: '🎯',
    cor: '#FF6B35',
    treinos: [
      {
        id: 'armador-1',
        titulo: 'Drible com mudança de direção',
        descricao: 'Domine o drible cruzado e a inversão de bola para quebrar marcações.',
        duracao: '20 min',
        habilidade: 'Drible',
        urlYoutube: 'https://www.youtube.com/watch?v=3mMH1Kk091g',
        dicas: ['Mantenha os joelhos flexionados', 'Cabeça sempre erguida', 'Proteja a bola com o corpo'],
      },
      {
        id: 'armador-2',
        titulo: 'Visão de jogo e passes',
        descricao: 'Desenvolva a leitura de jogo e a precisão nos passes de assistência.',
        duracao: '30 min',
        habilidade: 'Passe',
        urlYoutube: 'https://www.youtube.com/results?search_query=passes+visao+de+jogo+basquete',
        dicas: ['Faça o passe no tempo certo', 'Veja o companheiro antes de receber', 'Use fintas de passe'],
      },
      {
        id: 'armador-3',
        titulo: 'Arremesso de mid-range',
        descricao: 'Treine o arremesso de média distância após penetração.',
        duracao: '25 min',
        habilidade: 'Arremesso',
        urlYoutube: 'https://www.youtube.com/results?search_query=arremesso+mid+range+basquete',
        dicas: ['Equilíbrio é fundamental', 'Siga o arremesso com o pulso', 'Visualize o aro antes de soltar'],
      },
      {
        id: 'armador-mecanica-arremesso',
        titulo: 'Mecânica de arremesso',
        descricao: 'Treino focado na mecânica do arremesso; repetições próximas ao aro.',
        duracao: '10 min',
        habilidade: 'Arremesso',
        urlYoutube: 'https://www.youtube.com/watch?v=wYYTRQyYHXU',
        dicas: [
          'Inicie os arremessos próximo ao aro sem saltar',
          'Faça no mínimo 5 arremessos de 3 posições diferentes',
          'Vá se distanciando conforme achar conveniente',
        ],
        start: 0.5,
        end: 1.1,
      },
    ],
  },
  {
    id: 'ala-armador',
    nome: 'Ala-Armador',
    abreviacao: 'SG',
    descricao: 'Especialista em arremessos. Combina drible com pontuação eficiente.',
    icone: '🏹',
    cor: '#4ECDC4',
    treinos: [
      {
        id: 'sg-1',
        titulo: 'Arremesso de três pontos',
        descricao: 'Mecânica e repetição para arremessos de além do arco.',
        duracao: '30 min',
        habilidade: 'Arremesso',
        urlYoutube: 'https://www.youtube.com/results?search_query=arremesso+tres+pontos+basquete',
        dicas: ['Posicione os pés corretamente', 'Bola na ponta dos dedos', 'Follow through completo'],
      },
      {
        id: 'sg-2',
        titulo: 'Movimentação sem bola',
        descricao: 'Crie espaços e receba em posição de arremesso.',
        duracao: '20 min',
        habilidade: 'Drible',
        urlYoutube: 'https://www.youtube.com/results?search_query=movimentacao+sem+bola+basquete',
        dicas: ['Use o corpo para proteger o espaço', 'Mude de direção rapidamente', 'Corte para a cesta'],
      },
    ],
  },
  {
    id: 'ala',
    nome: 'Ala',
    abreviacao: 'SF',
    descricao: 'Versátil e dinâmico. Transição entre ataque e defesa.',
    icone: '⚡',
    cor: '#A855F7',
    treinos: [
      {
        id: 'sf-1',
        titulo: 'Defesa Individual',
        descricao: 'Técnicas de posicionamento e contenção ofensiva.',
        duracao: '25 min',
        habilidade: 'Defesa',
        urlYoutube: 'https://www.youtube.com/results?search_query=defesa+individual+basquete',
        dicas: ['Joelhos flexionados', 'Braços acompanhando', 'Não caia em fintas'],
      },
      {
        id: 'sf-2',
        titulo: 'Transição ofensiva',
        descricao: 'Aproveitar situações de contra-ataque.',
        duracao: '20 min',
        habilidade: 'Passe',
        urlYoutube: 'https://www.youtube.com/results?search_query=transicao+ofensiva+basquete',
        dicas: ['Correr em linha reta', 'Passe rápido e seguro', 'Termine com força'],
      },
    ],
  },
  {
    id: 'ala-pivo',
    nome: 'Ala-Pivô',
    abreviacao: 'PF',
    descricao: 'Potente no poste. Trabalha na pintura e em aberturas.',
    icone: '💪',
    cor: '#EF4444',
    treinos: [
      {
        id: 'pf-1',
        titulo: 'Fundamentos no poste',
        descricao: 'Movimento com a bola no poste baixo.',
        duracao: '20 min',
        habilidade: 'Poste',
        urlYoutube: 'https://www.youtube.com/results?search_query=fundamentos+poste+basquete',
        dicas: ['Tenha a bola protegida', 'Use o corpo para criar espaço', 'Ataque rápido'],
      },
      {
        id: 'pf-2',
        titulo: 'Força e Condicionamento',
        descricao: 'Exercícios de força para o jogo interno.',
        duracao: '35 min',
        habilidade: 'Físico',
        urlYoutube: 'https://www.youtube.com/results?search_query=força+condicionamento+basquete',
        dicas: ['Realize movimentos controlados', 'Respire corretamente', 'Aumente gradualmente a carga'],
      },
    ],
  },
  {
    id: 'pivo',
    nome: 'Pivô',
    abreviacao: 'C',
    descricao: 'Protetor da garagem. Domina o jogo interior.',
    icone: '🏀',
    cor: '#F59E0B',
    treinos: [
      {
        id: 'c-1',
        titulo: 'Bloqueio ofensivo',
        descricao: 'Técnicas de bloqueio para abrir espaço.',
        duracao: '20 min',
        habilidade: 'Poste',
        urlYoutube: 'https://www.youtube.com/results?search_query=bloqueio+ofensivo+basquete',
        dicas: ['Pés afastados e firmes', 'Coloque o corpo na trajetória', 'Mantenha a posição'],
      },
      {
        id: 'c-2',
        titulo: 'Defesa de garagem',
        descricao: 'Proteja a área da cesta contra ataques internos.',
        duracao: '25 min',
        habilidade: 'Defesa',
        urlYoutube: 'https://www.youtube.com/results?search_query=defesa+garagem+basquete',
        dicas: ['Mantenha posição dentro da área', 'Levante os braços para bloquear', 'Saia para defesa periférica'],
      },
      {
        id: 'c-3',
        titulo: 'Arremesso de três pontos',
        descricao: 'Desenvolvimento de arremesso para pivô moderno.',
        duracao: '30 min',
        habilidade: 'Arremesso',
        urlYoutube: 'https://www.youtube.com/results?search_query=pivo+arremessando+tres+pontos',
        dicas: ['Posição dos pés é fundamental', 'Mecanismo similar ao da ala', 'Pratique consistentemente'],
      },
    ],
  },
];
