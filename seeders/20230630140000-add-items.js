module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'tb_item',
      [
        {
          name: 'Gerador de Testes',
          description:
            'Ferramenta de geração de casos de teste para validação de software.',
          expiry_day: null,
          type: 'testGenerator',
        },
        {
          name: 'Gerador de Passo a Passo',
          description: 'Gere todo passo a passo de seu caso de teste.',
          expiry_day: null,
          type: 'stepGenerator',
        },
        {
          name: 'Bug Report',
          description:
            'Ferramenta Bug Report para reportar um defeito encontrado no software.',
          expiry_day: null,
          type: 'bugReport',
        },
        {
          name: 'Gerador de Plano de Testes',
          description:
            'Ferramenta de geração de plano de teste vai te ajudar a gerar um plano de testes completo para seu projeto de qualidade.',
          expiry_day: 30,
          type: 'testPlan',
        },
        {
          name: 'Indicadores de Qualidade',
          description:
            'Ferramenta de geração de indicadores de qualidade para avaliação de projetos de software.',
          expiry_day: 30,
          type: 'qualityIndicator',
        },
        {
          name: 'Tradutor de Testes',
          description: 'Ferramenta de tradução.',
          expiry_day: null,
          type: 'testTranslator',
        },
        {
          name: 'Gerador de Casos de Testes de Usabilidade (UX)',
          description:
            'Melhore a experiência do usuário com estes testes de usabilidade também conhecidos por UX (User experience).',
          expiry_day: 30,
          type: 'usabilityTestCase',
        },
        {
          name: 'Gerador de Massa de Dados para Testes',
          description: 'Ferramenta de Massas para seus testes',
          expiry_day: null,
          type: 'testMassGenerator',
        },
        {
          name: 'Gerador de  Testes em Linguagem Gherkin',
          description:
            'Gerador de Testes em Linguagem Gherkin, uma ferramenta poderosa e intuitiva projetada para simplificar a criação de casos de teste.',
          expiry_day: 7,
          type: 'gherkinLanguage',
        },
        {
          name: 'Gerador de Casos de Testes de Segurança',
          description:
            'Melhore a confiabilidade de sua aplicação com estes testes de segurança.',
          expiry_day: 15,
          type: 'securityTest',
        },
        {
          name: 'Gerador de Casos de Testes de Performance',
          description:
            'Melhore o desempenho de sua aplicação com estes testes de performance.',
          expiry_day: 15,
          type: 'performanceTest',
        },
        {
          name: 'Gerador de Casos de Testes de API',
          description: 'Ferramenta de gerador de testes de API.',
          expiry_day: 7,
          type: 'apiTest',
        },
        {
          name: 'Construtor de Query SQL',
          description: 'Ferramenta de construtor de Queries SQL.',
          expiry_day: null,
          type: 'sqlQueryBuilder',
        },
        {
          name: 'Código Cucumber',
          description: 'Ferramenta de códigos Cucumber.',
          expiry_day: 7,
          type: 'cucumberCode',
        },
        {
          name: 'Código Frameworks de Automação',
          description: 'Ferramenta de códigos de frameworks de automação.',
          expiry_day: 7,
          type: 'automationCode',
        },
        {
          name: 'Gerador de Estratégia de Testes',
          description: 'Ferramenta de gerador de estratégia de testes.',
          expiry_day: null,
          type: 'testingStrategy',
        },
        {
          name: 'Gerador de código de Teste de Carga',
          description: 'Ferramenta de gerador de testes de cargas.',
          expiry_day: 15,
          type: 'loadTesting',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_item', null, {});
  },
};
