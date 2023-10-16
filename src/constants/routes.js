const routes = {
  home: '/',
  auth: '/login',
  learn: '/learn',
  build: '/build',
  explorer: '/explorer',
  dashboardUserHome: '/dashboard/user/home',
  dashboardUserAsset: (pdaId) => `/dashboard/user/asset/${pdaId}`,
  dashboardOrgAsset: (org, pdaId) => `/dashboard/org/${org}/asset/${pdaId}`,
  dashboardUserIssuedAssets: '/dashboard/user/assets/issued',
  dashboardUserReceivedAssets: '/dashboard/user/assets/received',
  dashboardUserProofs: `/dashboard/user/proofs`,
  dashboardUserProof: (proofId) => `/dashboard/user/proof/${proofId}`,
  dashboardOrgProof: (org, proofId) => `/dashboard/org/${org}/proof/${proofId}`,
  dashboardUserSentProofs: '/dashboard/user/proofs/sent',
  dashboardUserReceivedProofs: '/dashboard/user/proofs/received',
  dashboardUserRequest: (requestId) => `/dashboard/user/request/${requestId}`,
  dashboardOrgRequest: (org, requestId) =>
    `/dashboard/org/${org}/request/${requestId}`,
  dashboardUserRequests: '/dashboard/user/requests',
  dashboardUserRequestTemplates: '/dashboard/user/request-templates',
  dashboardUserSettings: '/dashboard/user/settings',
  dashboardOrgRoot: '/dashboard/org',
  dashboardOrgHome: (organizationId) => `/dashboard/org/${organizationId}`,
  dashboardOrgIssuedAssets: (organizationId) =>
    `/dashboard/org/${organizationId}/assets/issued`,
  dashboardOrgRequests: (organizationId) =>
    `/dashboard/org/${organizationId}/requests`,
  dashboardOrgRequestTemplates: (organizationId) =>
    `/dashboard/org/${organizationId}/request-templates`,
  dashboardOrgReceivedProofs: (organizationId) =>
    `/dashboard/org/${organizationId}/proofs/received`,
  dashboardOrgSettings: (organizationId) =>
    `/dashboard/org/${organizationId}/settings`,
  dashboardUserDeveloperAccess: '/dashboard/user/developer-access',
  dashboardOrgDeveloperAccess: (organizationId) =>
    `/dashboard/org/${organizationId}/developer-access`,
  dashboardOrgPlayground: (organizationId) =>
    `/dashboard/org/${organizationId}/playground`,
  dashboardUserPlayground: '/dashboard/user/playground',
};

module.exports = routes;
