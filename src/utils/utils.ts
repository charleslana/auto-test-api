import TestTypeEnum from '../enum/TestTypeEnum';

export const randomString = (length: number): string => {
  let string = '';
  const randomChar = function () {
    const number = Math.floor(Math.random() * 62);
    if (number < 10) return number;
    if (number < 36) return String.fromCharCode(number + 55);
    return String.fromCharCode(number + 61);
  };
  while (string.length < length) string += randomChar();
  return string;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const randomNumber = (minimum: number, maximum: number): number => {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

export const formatNumber = (number: number): string => {
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export function translateEnumValue(value: TestTypeEnum): string {
  switch (value) {
    case TestTypeEnum.TestGenerator:
      return 'Gerador de Testes';
    case TestTypeEnum.StepGenerator:
      return 'Gerador de Passo a Passo';
    case TestTypeEnum.BugReport:
      return 'Relatório de Defeito';
    case TestTypeEnum.TestPlan:
      return 'Plano de Testes';
    case TestTypeEnum.QualityIndicator:
      return 'Indicadores de Qualidade';
    case TestTypeEnum.TestTranslator:
      return 'Tradutor de Testes';
    case TestTypeEnum.UsabilityTestCase:
      return 'Casos de Testes de Usabilidade (UX)';
    case TestTypeEnum.TestMassGenerator:
      return 'Gerador de Massa de Testes';
    case TestTypeEnum.GherkinLanguage:
      return 'Linguagem Gherkin';
    case TestTypeEnum.SecurityTest:
      return 'Testes de Segurança';
    case TestTypeEnum.PerformanceTest:
      return 'Testes de Performance';
    case TestTypeEnum.APITest:
      return 'Testes de API';
    case TestTypeEnum.SQLQueryBuilder:
      return 'Construtor de Query SQL';
    case TestTypeEnum.CucumberCode:
      return 'Código Cucumber';
    case TestTypeEnum.AutomationCode:
      return 'Código Frameworks de Automação';
    case TestTypeEnum.TestingStrategy:
      return 'Gerador de Estratégia de Testes';
    case TestTypeEnum.LoadTesting:
      return 'Gerador de Teste de Carga';
    default:
      return '';
  }
}

export const nameScorePrice = 10000;
