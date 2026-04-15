// Tipos de habilidade
export type Habilidade = 'Drible' | 'Arremesso' | 'Defesa' | 'Passe' | 'Físico' | 'Poste';

// Estrutura de um treino
export interface Treino {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  habilidade: Habilidade;
  urlYoutube: string;
  dicas: string[];
}

// Estrutura de uma posição
export interface Posicao {
  id: string;
  nome: string;
  abreviacao: string;
  descricao: string;
  icone: string;
  cor: string;
  treinos: Treino[];
}

export const posicoes: Posicao[] = [
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
        urlYoutube: 'https://www.youtube.com/watch?v=UmW0RU1nGCI',
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
        dicas: ['Use o corpo para criar espaço', 'Corte em velocidade máxima', 'Comunique-se com o armador'],
      },
      {
        id: 'sg-3',
        titulo: 'Defesa de perímetro',
        descricao: 'Técnicas para defender arremessadores no perímetro.',
        duracao: '20 min',
        habilidade: 'Defesa',
        urlYoutube: 'https://www.youtube.com/results?search_query=defesa+perimetro+basquete',
        dicas: ['Mantenha distância de um braço', 'Não salte em fakes', 'Conteste sem fazer falta'],
      },
    ],
  },
  {
    id: 'ala',
    nome: 'Ala',
    abreviacao: 'SF',
    descricao: 'O jogador mais versátil. Pontua, defende e rebota com igual eficiência.',
    icone: '⚡',
    cor: '#A855F7',
    treinos: [
      {
        id: 'sf-1',
        titulo: 'Drive e finalização',
        descricao: 'Penetração para a cesta com finalização eficiente nos dois lados.',
        duracao: '25 min',
        habilidade: 'Drible',
        urlYoutube: 'https://www.youtube.com/results?search_query=drive+finalizacao+basquete+ala',
        dicas: ['Leia o defensor antes de penetrar', 'Finalize com as duas mãos', 'Use o tabela quando necessário'],
      },
      {
        id: 'sf-2',
        titulo: 'Defesa versátil 1x1',
        descricao: 'Como defender diferentes posições com a mesma eficiência.',
        duracao: '25 min',
        habilidade: 'Defesa',
        urlYoutube: 'https://www.youtube.com/results?search_query=defesa+versatil+basquete+ala',
        dicas: ['Adapte sua postura ao adversário', 'Antecipe rotas de corte', 'Comunique switches'],
      },
      {
        id: 'sf-3',
        titulo: 'Rebote ofensivo e defensivo',
        descricao: 'Posicionamento e técnica para dominar as disputas de rebote.',
        duracao: '20 min',
        habilidade: 'Físico',
        urlYoutube: 'https://www.youtube.com/results?search_query=rebote+basquete+tecnica',
        dicas: ['Box out sempre', 'Salte no momento certo', 'Segure a bola com as duas mãos'],
      },
    ],
  },
  {
    id: 'ala-pivo',
    nome: 'Ala-Pivô',
    abreviacao: 'PF',
    descricao: 'Força e habilidade combinadas. Domina o garrafão e ainda arremessa de fora.',
    icone: '💪',
    cor: '#F59E0B',
    treinos: [
      {
        id: 'pf-1',
        titulo: 'Post up e movimentos de poste',
        descricao: 'Técnicas de back-to-basket para pontuar com as costas para a cesta.',
        duracao: '30 min',
        habilidade: 'Poste',
        urlYoutube: 'https://www.youtube.com/results?search_query=post+up+movimentos+poste+basquete',
        dicas: ['Estabeleça posição baixa', 'Use o cotovelo como âncora', 'Fake antes de girar'],
      },
      {
        id: 'pf-2',
        titulo: 'Defesa do garrafão',
        descricao: 'Bloqueios, posicionamento e defesa de pick-and-roll.',
        duracao: '25 min',
        habilidade: 'Defesa',
        urlYoutube: 'https://www.youtube.com/results?search_query=defesa+garrafao+pick+roll+basquete',
        dicas: ['Mãos levantadas ao contestar', 'Não saia do garrafão desnecessariamente', 'Comunique o pick'],
      },
      {
        id: 'pf-3',
        titulo: 'Condicionamento físico',
        descricao: 'Força, explosão vertical e resistência para disputas físicas.',
        duracao: '40 min',
        habilidade: 'Físico',
        urlYoutube: 'https://www.youtube.com/results?search_query=condicionamento+fisico+ala+pivo+basquete',
        dicas: ['Fortaleça o core', 'Trabalhe a explosão com agachamentos', 'Resistência muscular é chave'],
      },
    ],
  },
  {
    id: 'pivo',
    nome: 'Pivô',
    abreviacao: 'C',
    descricao: 'O guardião do garrafão. Domina a pintura, protege o aro e distribui rebotes.',
    icone: '🏰',
    cor: '#EF4444',
    treinos: [
      {
        id: 'c-1',
        titulo: 'Domínio do garrafão',
        descricao: 'Posicionamento, footwork e finalização dentro do garrafão.',
        duracao: '30 min',
        habilidade: 'Poste',
        urlYoutube: 'https://www.youtube.com/results?search_query=dominio+garrafao+pivo+basquete',
        dicas: ['Ocupe espaço com o corpo', 'Footwork com drop step', 'Finalize com as duas mãos'],
      },
      {
        id: 'c-2',
        titulo: 'Bloqueios e proteção do aro',
        descricao: 'Técnica de bloqueio, timing e posicionamento para proteger a cesta.',
        duracao: '20 min',
        habilidade: 'Defesa',
        urlYoutube: 'https://www.youtube.com/results?search_query=bloqueio+protecao+aro+pivo+basquete',
        dicas: ['Mãos sempre levantadas', 'Não salte cedo demais', 'Mantenha a bola após o bloqueio'],
      },
      {
        id: 'c-3',
        titulo: 'Força e explosão de pivô',
        descricao: 'Treino físico específico para os desafios da posição de pivô.',
        duracao: '45 min',
        habilidade: 'Físico',
        urlYoutube: 'https://www.youtube.com/results?search_query=treino+fisico+forca+pivo+basquete',
        dicas: ['Foco em força de membros inferiores', 'Trabalhe a explosão vertical', 'Recuperação é fundamental'],
      },
    ],
  },
];