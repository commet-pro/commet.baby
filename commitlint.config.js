// commitlint.config.js
// Enforce Conventional Commits: https://www.conventionalcommits.org/
// Format: <type>(<scope>): <description>
//
// Examples:
//   feat(auth): implement JWT refresh token rotation
//   fix(billing): handle Stripe webhook signature validation
//   docs(api): add content endpoint documentation
//   chore(db): add seed data for development

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Types allowed
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nova feature
        'fix',      // Correção de bug
        'docs',     // Documentação
        'style',    // Formatação (sem mudança de lógica)
        'refactor', // Refatoração
        'perf',     // Performance
        'test',     // Testes
        'build',    // Build system / dependências
        'ci',       // CI/CD
        'chore',    // Tarefas de manutenção
        'revert',   // Reverter commit
      ],
    ],
    // Scopes allowed (project modules)
    'scope-enum': [
      1, // warning (not error) to allow flexibility
      'always',
      [
        'auth',
        'content',
        'billing',
        'profile',
        'analytics',
        'admin',
        'shared',
        'db',
        'web',
        'api',
        'ui',
        'config',
        'deps',
        'release',
      ],
    ],
    // Subject rules
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 100],
    // Type rules
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    // Header max length
    'header-max-length': [2, 'always', 120],
    // Body rules
    'body-max-line-length': [1, 'always', 200],
  },
};
