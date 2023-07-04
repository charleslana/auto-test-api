module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'tb_conquest',
      [
        {
          name: 'Mestre dos Testes',
          description:
            'Complete com sucesso o desafio do Test Generator e mostre seu domínio em criar testes abrangentes e eficazes.',
          experience: 2800,
          type: 'testGenerator',
        },
        {
          name: 'Gerador de Etapas',
          description:
            'Domine o Step Generator e seja reconhecido por sua habilidade em criar etapas claras e precisas para os testes.',
          experience: 4200,
          type: 'stepGenerator',
        },
        {
          name: 'Caçador de Bugs',
          description:
            'Torne-se um especialista em encontrar e relatar bugs com precisão e detalhes, desbloqueando o Bug Report.',
          experience: 1800,
          type: 'bugReport',
        },
        {
          name: 'Arquiteto de Testes',
          description:
            'Crie um Test Plan abrangente que cubra todas as áreas críticas do software e demonstre seu domínio na arte de planejar testes.',
          experience: 5600,
          type: 'testPlan',
        },
        {
          name: 'Indicador de Qualidade',
          description:
            'Desenvolva e implemente indicadores de qualidade eficazes para medir a excelência do software e melhore a qualidade geral.',
          experience: 7400,
          type: 'qualityIndicator',
        },
        {
          name: 'Tradutor de Testes',
          description:
            'Habilite o Test Translator e seja capaz de traduzir testes em vários idiomas, facilitando a colaboração em equipes internacionais.',
          experience: 2800,
          type: 'testTranslator',
        },
        {
          name: 'Teste de Usabilidade',
          description:
            'Torne-se um especialista em testes de usabilidade e garanta que o software seja intuitivo e fácil de usar para os usuários.',
          experience: 3500,
          type: 'usabilityTestCase',
        },
        {
          name: 'Gerador de Testes em Massa',
          description:
            'Desbloqueie o poder do Test Mass Generator e seja capaz de criar um grande número de testes de forma rápida e eficiente.',
          experience: 9200,
          type: 'testMassGenerator',
        },
        {
          name: 'Linguagem Gherkin',
          description:
            'Domine a Gherkin Language e escreva cenários de teste claros e concisos para melhorar a comunicação e a colaboração.',
          experience: 4200,
          type: 'gherkinLanguage',
        },
        {
          name: 'Teste de Segurança',
          description:
            'Torne-se um especialista em testes de segurança e proteja o software contra vulnerabilidades e ameaças cibernéticas.',
          experience: 6200,
          type: 'securityTest',
        },
        {
          name: 'Teste de Desempenho',
          description:
            'Aprimore suas habilidades em testes de desempenho e garanta que o software funcione de maneira eficiente mesmo sob alta carga.',
          experience: 8700,
          type: 'performanceTest',
        },
        {
          name: 'Teste de API',
          description:
            'Desbloqueie o APITest e seja capaz de validar a funcionalidade e a integração perfeita de APIs em seus testes de software.',
          experience: 5500,
          type: 'apiTest',
        },
        {
          name: 'Construtor de Consultas SQL',
          description:
            'Domine o SQL Query Builder e crie consultas SQL complexas para testar a integridade e a eficiência dos bancos de dados.',
          experience: 6400,
          type: 'sqlQueryBuilder',
        },
        {
          name: 'Desbravador de Testes',
          description:
            'Seja pioneiro na exploração e aplicação do Test Generator, gerando testes inovadores e impulsionando a qualidade do software.',
          experience: 5500,
          type: 'testGenerator',
        },
        {
          name: 'Mestre das Etapas',
          description:
            'Domine o Step Generator e crie etapas de teste detalhadas e eficazes, estabelecendo um padrão elevado de execução de testes.',
          experience: 7200,
          type: 'stepGenerator',
        },
        {
          name: 'Caçador de Defeitos',
          description:
            'Desbloqueie o Bug Report ao se destacar na identificação e no relato de defeitos, contribuindo para a melhoria contínua do software.',
          experience: 3900,
          type: 'bugReport',
        },
        {
          name: 'Estrategista de Testes',
          description:
            'Torne-se um especialista na criação de Test Plans abrangentes, desenvolvendo estratégias de teste sólidas e eficientes.',
          experience: 6200,
          type: 'testPlan',
        },
        {
          name: 'Detetive da Qualidade',
          description:
            'Aprimore suas habilidades de investigação e descubra os segredos ocultos da qualidade do software, desvendando problemas e garantindo excelência.',
          experience: 8100,
          type: 'qualityIndicator',
        },
        {
          name: 'Poliglota de Testes',
          description:
            'Domine a arte da tradução de testes, tornando-se um especialista em transpor a linguagem técnica para uma linguagem acessível a todos os envolvidos no processo de desenvolvimento de software.',
          experience: 4300,
          type: 'testTranslator',
        },
        {
          name: 'Experiência do Usuário em Foco',
          description:
            'Domine a criação de Usability Test Cases e garanta que o software ofereça uma experiência intuitiva e amigável para os usuários.',
          experience: 5900,
          type: 'usabilityTestCase',
        },
        {
          name: 'Criador Incansável de Testes',
          description:
            'Desbloqueie o poder do Test Mass Generator, permitindo a criação rápida e eficiente de uma grande quantidade de testes.',
          experience: 9100,
          type: 'testMassGenerator',
        },
        {
          name: 'Especialista em Gherkin',
          description:
            'Aprofunde-se na Gherkin Language e demonstre habilidades excepcionais na escrita de cenários de teste claros e concisos.',
          experience: 6700,
          type: 'gherkinLanguage',
        },
        {
          name: 'Defensor da Segurança',
          description:
            'Torne-se um especialista em Security Test, identificando e solucionando vulnerabilidades de segurança no software.',
          experience: 4500,
          type: 'securityTest',
        },
        {
          name: 'Domínio do Desempenho',
          description:
            'Desenvolva expertise em Performance Test e otimize o desempenho do software, garantindo uma experiência fluida e eficiente.',
          experience: 7100,
          type: 'performanceTest',
        },
        {
          name: 'Explorador de APIs',
          description:
            'Domine o APITest e seja capaz de validar a funcionalidade e a integração de APIs em um ambiente de software.',
          experience: 3900,
          type: 'apiTest',
        },
        {
          name: 'Mestre em Consultas SQL',
          description:
            'Aperfeiçoe suas habilidades em SQL Query Builder e crie consultas SQL avançadas para testar a integridade e a eficiência do banco de dados.',
          experience: 6400,
          type: 'sqlQueryBuilder',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_conquest', null, {});
  },
};
