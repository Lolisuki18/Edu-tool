export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  JIRA_TO_SRS: '/jira-to-srs',
  GITHUB_REPORT: '/github-report',
  MANAGE_USERS: '/manage-users',
  NOT_FOUND: '*',
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES]
