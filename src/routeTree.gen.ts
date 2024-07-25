/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as WardsIndexImport } from './routes/wards/index'
import { Route as ProfileIndexImport } from './routes/profile/index'
import { Route as MpsIndexImport } from './routes/mps/index'
import { Route as McasIndexImport } from './routes/mcas/index'
import { Route as GovernorsIndexImport } from './routes/governors/index'
import { Route as CountiesIndexImport } from './routes/counties/index'
import { Route as ConstituenciesIndexImport } from './routes/constituencies/index'
import { Route as CandidatesIndexImport } from './routes/candidates/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as AdminIndexImport } from './routes/admin/index'
import { Route as WardsWardImport } from './routes/wards/$ward'
import { Route as MpsMpImport } from './routes/mps/$mp'
import { Route as McasMcaImport } from './routes/mcas/$mca'
import { Route as GovernorsGovernorImport } from './routes/governors/$governor'
import { Route as CountiesCountyImport } from './routes/counties/$county'
import { Route as ConstituenciesConstituencyImport } from './routes/constituencies/$constituency'
import { Route as CandidatesNewImport } from './routes/candidates/new'
import { Route as AuthSignupImport } from './routes/auth/signup'
import { Route as CandidatesCandidateIndexImport } from './routes/candidates/$candidate/index'
import { Route as CandidatesCandidateUpdateIndexImport } from './routes/candidates/$candidate/update/index'
import { Route as CandidatesCandidateAspirationsIndexImport } from './routes/candidates/$candidate/aspirations/index'
import { Route as CandidatesCandidateAspirationsNewImport } from './routes/candidates/$candidate/aspirations/new'
import { Route as CandidatesCandidateAspirationsAspirationIndexImport } from './routes/candidates/$candidate/aspirations/$aspiration/index'
import { Route as CandidatesCandidateAspirationsAspirationUpdateImport } from './routes/candidates/$candidate/aspirations/$aspiration/update'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WardsIndexRoute = WardsIndexImport.update({
  path: '/wards/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileIndexRoute = ProfileIndexImport.update({
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any)

const MpsIndexRoute = MpsIndexImport.update({
  path: '/mps/',
  getParentRoute: () => rootRoute,
} as any)

const McasIndexRoute = McasIndexImport.update({
  path: '/mcas/',
  getParentRoute: () => rootRoute,
} as any)

const GovernorsIndexRoute = GovernorsIndexImport.update({
  path: '/governors/',
  getParentRoute: () => rootRoute,
} as any)

const CountiesIndexRoute = CountiesIndexImport.update({
  path: '/counties/',
  getParentRoute: () => rootRoute,
} as any)

const ConstituenciesIndexRoute = ConstituenciesIndexImport.update({
  path: '/constituencies/',
  getParentRoute: () => rootRoute,
} as any)

const CandidatesIndexRoute = CandidatesIndexImport.update({
  path: '/candidates/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/auth/',
  getParentRoute: () => rootRoute,
} as any)

const AdminIndexRoute = AdminIndexImport.update({
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any)

const WardsWardRoute = WardsWardImport.update({
  path: '/wards/$ward',
  getParentRoute: () => rootRoute,
} as any)

const MpsMpRoute = MpsMpImport.update({
  path: '/mps/$mp',
  getParentRoute: () => rootRoute,
} as any)

const McasMcaRoute = McasMcaImport.update({
  path: '/mcas/$mca',
  getParentRoute: () => rootRoute,
} as any)

const GovernorsGovernorRoute = GovernorsGovernorImport.update({
  path: '/governors/$governor',
  getParentRoute: () => rootRoute,
} as any)

const CountiesCountyRoute = CountiesCountyImport.update({
  path: '/counties/$county',
  getParentRoute: () => rootRoute,
} as any)

const ConstituenciesConstituencyRoute = ConstituenciesConstituencyImport.update(
  {
    path: '/constituencies/$constituency',
    getParentRoute: () => rootRoute,
  } as any,
)

const CandidatesNewRoute = CandidatesNewImport.update({
  path: '/candidates/new',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  path: '/auth/signup',
  getParentRoute: () => rootRoute,
} as any)

const CandidatesCandidateIndexRoute = CandidatesCandidateIndexImport.update({
  path: '/candidates/$candidate/',
  getParentRoute: () => rootRoute,
} as any)

const CandidatesCandidateUpdateIndexRoute =
  CandidatesCandidateUpdateIndexImport.update({
    path: '/candidates/$candidate/update/',
    getParentRoute: () => rootRoute,
  } as any)

const CandidatesCandidateAspirationsIndexRoute =
  CandidatesCandidateAspirationsIndexImport.update({
    path: '/candidates/$candidate/aspirations/',
    getParentRoute: () => rootRoute,
  } as any)

const CandidatesCandidateAspirationsNewRoute =
  CandidatesCandidateAspirationsNewImport.update({
    path: '/candidates/$candidate/aspirations/new',
    getParentRoute: () => rootRoute,
  } as any)

const CandidatesCandidateAspirationsAspirationIndexRoute =
  CandidatesCandidateAspirationsAspirationIndexImport.update({
    path: '/candidates/$candidate/aspirations/$aspiration/',
    getParentRoute: () => rootRoute,
  } as any)

const CandidatesCandidateAspirationsAspirationUpdateRoute =
  CandidatesCandidateAspirationsAspirationUpdateImport.update({
    path: '/candidates/$candidate/aspirations/$aspiration/update',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/auth/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof rootRoute
    }
    '/candidates/new': {
      id: '/candidates/new'
      path: '/candidates/new'
      fullPath: '/candidates/new'
      preLoaderRoute: typeof CandidatesNewImport
      parentRoute: typeof rootRoute
    }
    '/constituencies/$constituency': {
      id: '/constituencies/$constituency'
      path: '/constituencies/$constituency'
      fullPath: '/constituencies/$constituency'
      preLoaderRoute: typeof ConstituenciesConstituencyImport
      parentRoute: typeof rootRoute
    }
    '/counties/$county': {
      id: '/counties/$county'
      path: '/counties/$county'
      fullPath: '/counties/$county'
      preLoaderRoute: typeof CountiesCountyImport
      parentRoute: typeof rootRoute
    }
    '/governors/$governor': {
      id: '/governors/$governor'
      path: '/governors/$governor'
      fullPath: '/governors/$governor'
      preLoaderRoute: typeof GovernorsGovernorImport
      parentRoute: typeof rootRoute
    }
    '/mcas/$mca': {
      id: '/mcas/$mca'
      path: '/mcas/$mca'
      fullPath: '/mcas/$mca'
      preLoaderRoute: typeof McasMcaImport
      parentRoute: typeof rootRoute
    }
    '/mps/$mp': {
      id: '/mps/$mp'
      path: '/mps/$mp'
      fullPath: '/mps/$mp'
      preLoaderRoute: typeof MpsMpImport
      parentRoute: typeof rootRoute
    }
    '/wards/$ward': {
      id: '/wards/$ward'
      path: '/wards/$ward'
      fullPath: '/wards/$ward'
      preLoaderRoute: typeof WardsWardImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/': {
      id: '/auth/'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof rootRoute
    }
    '/candidates/': {
      id: '/candidates/'
      path: '/candidates'
      fullPath: '/candidates'
      preLoaderRoute: typeof CandidatesIndexImport
      parentRoute: typeof rootRoute
    }
    '/constituencies/': {
      id: '/constituencies/'
      path: '/constituencies'
      fullPath: '/constituencies'
      preLoaderRoute: typeof ConstituenciesIndexImport
      parentRoute: typeof rootRoute
    }
    '/counties/': {
      id: '/counties/'
      path: '/counties'
      fullPath: '/counties'
      preLoaderRoute: typeof CountiesIndexImport
      parentRoute: typeof rootRoute
    }
    '/governors/': {
      id: '/governors/'
      path: '/governors'
      fullPath: '/governors'
      preLoaderRoute: typeof GovernorsIndexImport
      parentRoute: typeof rootRoute
    }
    '/mcas/': {
      id: '/mcas/'
      path: '/mcas'
      fullPath: '/mcas'
      preLoaderRoute: typeof McasIndexImport
      parentRoute: typeof rootRoute
    }
    '/mps/': {
      id: '/mps/'
      path: '/mps'
      fullPath: '/mps'
      preLoaderRoute: typeof MpsIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/wards/': {
      id: '/wards/'
      path: '/wards'
      fullPath: '/wards'
      preLoaderRoute: typeof WardsIndexImport
      parentRoute: typeof rootRoute
    }
    '/candidates/$candidate/': {
      id: '/candidates/$candidate/'
      path: '/candidates/$candidate'
      fullPath: '/candidates/$candidate'
      preLoaderRoute: typeof CandidatesCandidateIndexImport
      parentRoute: typeof rootRoute
    }
    '/candidates/$candidate/aspirations/new': {
      id: '/candidates/$candidate/aspirations/new'
      path: '/candidates/$candidate/aspirations/new'
      fullPath: '/candidates/$candidate/aspirations/new'
      preLoaderRoute: typeof CandidatesCandidateAspirationsNewImport
      parentRoute: typeof rootRoute
    }
    '/candidates/$candidate/aspirations/': {
      id: '/candidates/$candidate/aspirations/'
      path: '/candidates/$candidate/aspirations'
      fullPath: '/candidates/$candidate/aspirations'
      preLoaderRoute: typeof CandidatesCandidateAspirationsIndexImport
      parentRoute: typeof rootRoute
    }
    '/candidates/$candidate/update/': {
      id: '/candidates/$candidate/update/'
      path: '/candidates/$candidate/update'
      fullPath: '/candidates/$candidate/update'
      preLoaderRoute: typeof CandidatesCandidateUpdateIndexImport
      parentRoute: typeof rootRoute
    }
    '/candidates/$candidate/aspirations/$aspiration/update': {
      id: '/candidates/$candidate/aspirations/$aspiration/update'
      path: '/candidates/$candidate/aspirations/$aspiration/update'
      fullPath: '/candidates/$candidate/aspirations/$aspiration/update'
      preLoaderRoute: typeof CandidatesCandidateAspirationsAspirationUpdateImport
      parentRoute: typeof rootRoute
    }
    '/candidates/$candidate/aspirations/$aspiration/': {
      id: '/candidates/$candidate/aspirations/$aspiration/'
      path: '/candidates/$candidate/aspirations/$aspiration'
      fullPath: '/candidates/$candidate/aspirations/$aspiration'
      preLoaderRoute: typeof CandidatesCandidateAspirationsAspirationIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthSignupRoute,
  CandidatesNewRoute,
  ConstituenciesConstituencyRoute,
  CountiesCountyRoute,
  GovernorsGovernorRoute,
  McasMcaRoute,
  MpsMpRoute,
  WardsWardRoute,
  AdminIndexRoute,
  AuthIndexRoute,
  CandidatesIndexRoute,
  ConstituenciesIndexRoute,
  CountiesIndexRoute,
  GovernorsIndexRoute,
  McasIndexRoute,
  MpsIndexRoute,
  ProfileIndexRoute,
  WardsIndexRoute,
  CandidatesCandidateIndexRoute,
  CandidatesCandidateAspirationsNewRoute,
  CandidatesCandidateAspirationsIndexRoute,
  CandidatesCandidateUpdateIndexRoute,
  CandidatesCandidateAspirationsAspirationUpdateRoute,
  CandidatesCandidateAspirationsAspirationIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout",
        "/auth/signup",
        "/candidates/new",
        "/constituencies/$constituency",
        "/counties/$county",
        "/governors/$governor",
        "/mcas/$mca",
        "/mps/$mp",
        "/wards/$ward",
        "/admin/",
        "/auth/",
        "/candidates/",
        "/constituencies/",
        "/counties/",
        "/governors/",
        "/mcas/",
        "/mps/",
        "/profile/",
        "/wards/",
        "/candidates/$candidate/",
        "/candidates/$candidate/aspirations/new",
        "/candidates/$candidate/aspirations/",
        "/candidates/$candidate/update/",
        "/candidates/$candidate/aspirations/$aspiration/update",
        "/candidates/$candidate/aspirations/$aspiration/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx"
    },
    "/auth/signup": {
      "filePath": "auth/signup.tsx"
    },
    "/candidates/new": {
      "filePath": "candidates/new.tsx"
    },
    "/constituencies/$constituency": {
      "filePath": "constituencies/$constituency.tsx"
    },
    "/counties/$county": {
      "filePath": "counties/$county.tsx"
    },
    "/governors/$governor": {
      "filePath": "governors/$governor.tsx"
    },
    "/mcas/$mca": {
      "filePath": "mcas/$mca.tsx"
    },
    "/mps/$mp": {
      "filePath": "mps/$mp.tsx"
    },
    "/wards/$ward": {
      "filePath": "wards/$ward.tsx"
    },
    "/admin/": {
      "filePath": "admin/index.tsx"
    },
    "/auth/": {
      "filePath": "auth/index.tsx"
    },
    "/candidates/": {
      "filePath": "candidates/index.tsx"
    },
    "/constituencies/": {
      "filePath": "constituencies/index.tsx"
    },
    "/counties/": {
      "filePath": "counties/index.tsx"
    },
    "/governors/": {
      "filePath": "governors/index.tsx"
    },
    "/mcas/": {
      "filePath": "mcas/index.tsx"
    },
    "/mps/": {
      "filePath": "mps/index.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.tsx"
    },
    "/wards/": {
      "filePath": "wards/index.tsx"
    },
    "/candidates/$candidate/": {
      "filePath": "candidates/$candidate/index.tsx"
    },
    "/candidates/$candidate/aspirations/new": {
      "filePath": "candidates/$candidate/aspirations/new.tsx"
    },
    "/candidates/$candidate/aspirations/": {
      "filePath": "candidates/$candidate/aspirations/index.tsx"
    },
    "/candidates/$candidate/update/": {
      "filePath": "candidates/$candidate/update/index.tsx"
    },
    "/candidates/$candidate/aspirations/$aspiration/update": {
      "filePath": "candidates/$candidate/aspirations/$aspiration/update.tsx"
    },
    "/candidates/$candidate/aspirations/$aspiration/": {
      "filePath": "candidates/$candidate/aspirations/$aspiration/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
