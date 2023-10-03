module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'tb_conquest',
      [
        {
          name: 'Mestre dos Testes',
          description:
            'Complete com sucesso o desafio do Gerador de Testes e mostre seu domínio em criar testes abrangentes e eficazes.',
          experience: 2800,
          type: 'testGenerator',
        },
        {
          name: 'Gerador de Etapas',
          description:
            'Domine o Gerador de Passo a Passo e seja reconhecido por sua habilidade em criar etapas claras e precisas para os testes.',
          experience: 4200,
          type: 'stepGenerator',
        },
        {
          name: 'Caçador de Bugs',
          description:
            'Torne-se um especialista em encontrar e relatar bugs com precisão e detalhes, desbloqueando o Relatório de Defeito.',
          experience: 1800,
          type: 'bugReport',
        },
        {
          name: 'Arquiteto de Testes',
          description:
            'Crie um Plano de Testes abrangente que cubra todas as áreas críticas do software e demonstre seu domínio na arte de planejar testes.',
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
            'Habilite o Tradutor de Testes e seja capaz de traduzir testes em vários idiomas, facilitando a colaboração em equipes internacionais.',
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
            'Desbloqueie o poder do Gerador de Massa de Testes e seja capaz de criar um grande número de testes de forma rápida e eficiente.',
          experience: 9200,
          type: 'testMassGenerator',
        },
        {
          name: 'Linguagem Gherkin',
          description:
            'Domine a Linguagem Gherkin e escreva cenários de teste claros e concisos para melhorar a comunicação e a colaboração.',
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
            'Desbloqueie o Testes de API e seja capaz de validar a funcionalidade e a integração perfeita de APIs em seus testes de software.',
          experience: 5500,
          type: 'apiTest',
        },
        {
          name: 'Construtor de Consultas SQL',
          description:
            'Domine o Construtor de Query SQL e crie consultas SQL complexas para testar a integridade e a eficiência dos bancos de dados.',
          experience: 6400,
          type: 'sqlQueryBuilder',
        },
        {
          name: 'Desbravador de Testes',
          description:
            'Seja pioneiro na exploração e aplicação do Gerador de Testes, gerando testes inovadores e impulsionando a qualidade do software.',
          experience: 5500,
          type: 'testGenerator',
        },
        {
          name: 'Mestre das Etapas',
          description:
            'Domine o Gerador de Passo a Passo e crie etapas de teste detalhadas e eficazes, estabelecendo um padrão elevado de execução de testes.',
          experience: 7200,
          type: 'stepGenerator',
        },
        {
          name: 'Caçador de Defeitos',
          description:
            'Desbloqueie o Relatório de Defeito ao se destacar na identificação e no relato de defeitos, contribuindo para a melhoria contínua do software.',
          experience: 3900,
          type: 'bugReport',
        },
        {
          name: 'Estrategista de Testes',
          description:
            'Torne-se um especialista na criação de Plano de Testes abrangentes, desenvolvendo estratégias de teste sólidas e eficientes.',
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
            'Domine a criação de Casos de Testes de Usabilidade (UX) e garanta que o software ofereça uma experiência intuitiva e amigável para os usuários.',
          experience: 5900,
          type: 'usabilityTestCase',
        },
        {
          name: 'Criador Incansável de Testes',
          description:
            'Desbloqueie o poder do Gerador de Massa de Testes, permitindo a criação rápida e eficiente de uma grande quantidade de testes.',
          experience: 9100,
          type: 'testMassGenerator',
        },
        {
          name: 'Especialista em Gherkin',
          description:
            'Aprofunde-se na Linguagem Gherkin e demonstre habilidades excepcionais na escrita de cenários de teste claros e concisos.',
          experience: 6700,
          type: 'gherkinLanguage',
        },
        {
          name: 'Defensor da Segurança',
          description:
            'Torne-se um especialista em Testes de Segurança, identificando e solucionando vulnerabilidades de segurança no software.',
          experience: 4500,
          type: 'securityTest',
        },
        {
          name: 'Domínio do Desempenho',
          description:
            'Desenvolva expertise em Testes de Performance e otimize o desempenho do software, garantindo uma experiência fluida e eficiente.',
          experience: 7100,
          type: 'performanceTest',
        },
        {
          name: 'Explorador de APIs',
          description:
            'Domine o Testes de API e seja capaz de validar a funcionalidade e a integração de APIs em um ambiente de software.',
          experience: 3900,
          type: 'apiTest',
        },
        {
          name: 'Mestre em Consultas SQL',
          description:
            'Aperfeiçoe suas habilidades em Construtor de Query SQL e crie consultas SQL avançadas para testar a integridade e a eficiência do banco de dados.',
          experience: 6400,
          type: 'sqlQueryBuilder',
        },
        {
          name: 'Mestre do Cucumber',
          description:
            'Escreva e mantenha com sucesso dez cenários de teste completos usando a linguagem de especificação Gherkin e o framework Cucumber. Seja um mestre na criação de cenários legíveis e funcionais para automação de testes.',
          experience: 5000,
          type: 'cucumberCode',
        },
        {
          name: 'Cucumber na Veia',
          description:
            'Implemente uma suíte de testes end-to-end abrangente para um projeto de software complexo usando Cucumber. Demonstre sua habilidade em criar e manter cenários de teste que abordem todos os aspectos críticos do sistema, contribuindo para a qualidade e estabilidade do software.',
          experience: 9000,
          type: 'cucumberCode',
        },
        {
          name: 'Arquiteto de Automação',
          description:
            'Desenvolva um framework de automação personalizado do zero que seja reutilizável, flexível e escalável. Seja um arquiteto de automação que lidera a equipe na construção de estruturas robustas para testes de software automatizados.',
          experience: 7000,
          type: 'automationCode',
        },
        {
          name: 'Domador de Frameworks',
          description:
            'Integre com sucesso três frameworks de automação diferentes em um único projeto de teste, aproveitando suas vantagens únicas. Mostre sua habilidade em combinar tecnologias de automação para criar uma solução eficaz para testes automatizados.',
          experience: 9800,
          type: 'automationCode',
        },
        {
          name: 'Estrategista de Qualidade de Software',
          description:
            'Desenvolva uma estratégia de qualidade de software abrangente para um projeto crítico, abordando não apenas testes, mas também revisões de código, análise estática, automação e práticas de melhoria contínua. Garanta que o software seja lançado com o mais alto nível de qualidade, cumprindo padrões rigorosos de excelência. Seja um líder na busca incessante pela qualidade de software em sua organização.',
          experience: 3000,
          type: 'testingStrategy',
        },
        {
          name: 'Mestre da Estratégia de Testes',
          description:
            'Lidere a equipe de testes na criação de uma estratégia de testes que não apenas identifique bugs, mas também melhore a qualidade geral do software. Utilize métricas e análises para otimizar continuamente a abordagem de testes, tornando-se um mestre na arte da estratégia de testes.',
          experience: 6200,
          type: 'testingStrategy',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tb_conquest', null, {});
  },
};
