import { Configuration } from 'openai';

export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const testGenerator =
  'crie até 3 casos de testes com passo a passo e resultado esperado para o requisito\nuse a técnica de valores limítrofes ou outras técnicas que julgar necessário para validar o sistema. Por favor, forneça-nos um trecho da documentação do software ou um requisito específico que deseja validar.\n\n';
export const stepGenerator =
  'Você irá atuar como um gerador de passo a passo para ajudar testadores a detalharem o roteiro de seus testes. Por favor, forneça-nos o nome ou descrição do caso de teste que deseja obter o passo a passo.\n\nNome ou descrição do caso de teste:';
export const bugReport =
  'com base nas informações passadas por favor gere um relatório de defeitos o mais completo possível com informações detalhadas para o desenvolvedor corrigir o problema. Gerar de forma mais natural como geralmente o testador reportaria  o defeito para o desenvolvedor assim que encontrou o defeito\n\n';
export const testPlan =
  'com base na entrada do usuário crie um plano de testes estruturado hierarquicamente por funcionalidade, requisitos, cenários, casos de testes com passo a passo e resultado esperado. O plano deve cobrir cenários positivos e negativos, valores limítrofes, com dados validos e inválidos e ter tantos testes quanto forem necessários para cobrir os requisitos e garantir a qualidade. Por favor, forneça-nos um trecho da documentação do software ou um requisito específico que deseja validar.\n\n';
export const qualityIndicator =
  'Dada uma entrada de documentação contendo informações sobre um projeto, gere um relatório de indicadores de qualidade com base nos dados fornecidos. Certifique-se de incluir os seguintes indicadores: taxa de execução de casos de teste, taxa de falha de casos de teste executados, taxa de defeitos encontrados, taxa de correção de defeitos, taxa de reabertura de defeitos, taxa de resolução de defeitos e densidade de defeitos.\nConsiderando os indicadores de qualidade calculados, podemos fazer as seguintes observações sobre o projeto:\n\n- Taxa de Execução de Casos de Teste: <taxaExecucaoCasosTeste>%. Esse indicador reflete a proporção de casos de teste executados em relação ao total de casos de teste. Uma taxa alta indica que uma quantidade significativa de casos de teste foi executada, o que é um bom sinal para a validação do software.\n\n- Taxa de Falha de Casos de Teste Executados: <taxaFalhaCasosTesteExecutados>%. Esse indicador mostra a proporção de casos de teste que falharam em relação ao total de casos de teste executados. Uma taxa alta pode indicar problemas significativos no software e requer investigação adicional.\n\n- Taxa de Defeitos Encontrados: <taxaDefeitosEncontrados>%. Essa taxa representa a proporção de defeitos encontrados em relação ao total de casos de teste executados. Uma taxa alta sugere que o software possui uma quantidade significativa de problemas, o que pode exigir esforços adicionais para garantir a qualidade.\n\n- Taxa de Correção de Defeitos: <taxaCorrecaoDefeitos>%. Esse indicador indica a proporção de defeitos corrigidos em relação ao total de defeitos encontrados. Uma taxa alta é um bom sinal, pois mostra que a equipe de desenvolvimento está abordando efetivamente os problemas identificados.\n\n- Taxa de Reabertura de Defeitos: <taxaReaberturaDefeitos>%. Essa taxa representa a proporção de defeitos que foram reabertos em relação ao total de defeitos corrigidos. Uma taxa alta pode indicar problemas de qualidade na correção dos defeitos ou falta de testes adequados para verificar a correção.\n\n- Taxa de Resolução de Defeitos: <taxaResolucaoDefeitos>%. Esse indicador mostra a proporção de defeitos resolvidos em relação ao total de defeitos encontrados. Uma taxa alta sugere que a equipe está resolvendo os problemas de maneira eficiente.\n\n- Densidade de Defeitos: <densidadeDefeitos> defeitos por caso de teste executado. Esse indicador fornece uma visão da quantidade média de defeitos encontrados em cada caso de teste executado. Uma densidade alta pode indicar uma alta complexidade do software ou possíveis problemas de qualidade.\n\nCom base nessas observações, é possível avaliar o estado atual do projeto e identificar áreas que requerem atenção adicional. Lembre-se de que esses indicadores são apenas uma parte da avaliação da qualidade do software, e é importante considerar outros fatores relevantes para uma análise completa.\n\n\n';
export const testTranslator =
  'você vai atuar como um tradutor, traduza a toda a entrada do usuário para o idioma passado pelo contexto\n\n';
export const usabilityTestCase =
  'Crie um plano de testes de usabilidade com base na entrada do usuário, Tente escrever pelo menos cinco cenários ou casos de testes de usabilidade com base em diferentes tarefas ou interações que um usuário poderia ter com a plataforma. Estes testes serão utilizados em um projeto para melhoria de UX.Imagine que você é um usuário que está interagindo com um aplicativo ou website. Descreva uma tarefa específica que você gostaria de realizar nessa plataforma. Por exemplo, "Encontre e adicione um produto ao carrinho de compras" ou "Localize e atualize suas informações de perfil". \nAgora, descreva brevemente as etapas ou ações que você seguiria para realizar essa tarefa. Liste as ações que você esperaria executar, os elementos da interface com os quais você interagiria e as informações relevantes que você procuraria. \nCom base na sua descrição da tarefa e das etapas envolvidas, forneça um feedback sobre a usabilidade da plataforma. Identifique possíveis pontos fortes e pontos fracos, áreas que poderiam ser mais intuitivas ou confusas, recursos que facilitariam ou dificultariam a realização da tarefa, etc.\n\n\n';
export const testMassGenerator =
  'Quero que você atue como um gerador de massas de dados para testes de qualidade de software. Sua tarefa é gerar uma lista de massas conforme o tipo e a quantidade especificados pelo testador Os dados devem ser mais próximos do real possível para que sejam utilizados na validação do software. para começar o testador pediu\n\n';
export const gherkinLanguage =
  'Quero que você atue como testador de qualidade de software, especialista na linguagem Gherkin. Sua tarefa é testar a funcionalidade e o desempenho do software para garantir que ele atenda aos padrões exigidos. Você precisará escrever casos de testes em linguagem gherkin que serão utilizados posteriormente em um projeto de automação de testes utilizando cucumber . Sua primeira tarefa gerar todos os testes possíveis  em gherkin, Isso inclui casos de teste que testam os limites dos valores de entrada, casos de teste de sucesso e casos de teste de falha, para testar o requisito \n\n\n';
export const securityTest =
  'Melhore a confiabilidade de sua aplicação com estes testes de segurança. Por favor, forneça-nos um trecho da documentação do software ou um requisito específico que deseja validar. Com base nessa entrada, teste.ai gerará casos de teste de segurança para você\n\n\n';
export const performanceTest =
  'Melhore o desempenho de sua aplicação com estes testes de performance. Por favor, forneça-nos um trecho da documentação do software ou um requisito de performance específico que deseja validar. Com base nessa entrada, vou gerar casos de teste de performance com o passo a passo para você\n\n\n';
export const apiTest =
  'trabalhe como um  gerador de casos testes de API. Vou fornecer uma API com detalhes como endpoint, parâmetros de entrada e saída e se possível um exemplo de chamada e resposta da API. Com base nessa entrada, você gerará casos de teste de API com passo a passo para mim\n\n\n';
export const sqlQueryBuilder =
  'crie uma consulta SQL com base na entrada fornecida para eu usar em um banco de dados e obter o resultado esperado\n\n\n';
export const cucumberCode =
  'Você vai gerar um código Cucumber de acordo com a saída e a entrada do usuário, escolha o melhor framework de automação de testes de acordo com a linguagem. Indique na resposta a linguagem e o framework utilizados\n\n\n';
export const automationCode =
  'Você vai gerar um código de teste automatizado de acordo com a saída e a entrada do usuário, escolha o melhor framework de automação de testes de acordo com a linguagem. Indique na resposta a linguagem e o framework utilizados\n\n\n';
export const testingStrategy =
  'Com base na entrada do usuário crie uma estratégia de testes que segue a abordagem e as etapas definidas pelo modelo ISTQB, proporcionando uma estrutura sólida para o processo de teste\n\n\n';
export const loadTesting =
  'Você vai gerar um código de teste de carga de acordo com a saída e a entrada do usuário, você deve criar o teste de carga conforme o framework listado pelo usuário. Indique na resposta a linguagem e o framework utilizados\n\n\n';
