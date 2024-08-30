/* eslint-disable @typescript-eslint/ban-types */

import { DeepRequired } from 'react-hook-form';

import { components } from './types';

export type Account = components['schemas']['model.MyAccountResponse'];

export type TokenResponse = Required<
  components['schemas']['model.TokenResponse']
>;
export type DataModel = components['schemas']['model.DataModel'];
export type PublicDataAsset = components['schemas']['model.PublicDataAsset'];

export type PaginatedResponse<T = any> = DeepRequired<
  Omit<components['schemas']['helper.PaginatedResponse'], 'data'>
> & { data?: T[] };

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  DateTimeISO: any;
  JSON: any;
  StringSchema: any;
};
export type Maybe<T> = T | null;

export type PrivateDataAsset = {
  id: string;
  proofs: Array<any>;
  access: Array<{ did: string; username: string; access: string }>;
  expirationDate: Date;
  structured: boolean;
  updatedAt: Date;
  createdAt: Date;
  tags: string[];
  size: number;
  url: string;
  dataModel?: {
    id: string;
    schema: {};
  };
  fileName: string;
  mimeType: string;
};

export type DataModelType = {
  id: number;
  dataModelId: string;
  title: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
  dataAssests: number;
  consumptionPrice: Maybe<Scalars['Float']>;
};

export type ExplorerHomeStats = {
  transactionsCount: number;
  uniqueIssuers: number;
  pdasIssued: number;
  totalUsers: number;
};

export type Transaction = {
  solanaTransactionId: string;
  transactionId: string;
  source: string;
  signature: string;
  fee: {
    solana: string;
    gateway: string;
  };
  createdAt: Date;
};

export type DataModelsMetadataType = {
  tags: string[];
  consumptionPrice: {
    min: number;
    max: number;
  };
  issuedCount: number;
};

export const mockDataModelsMetadata: DataModelsMetadataType = {
  tags: ['defi', 'innovation', 'ai', 'blockchain'],
  consumptionPrice: {
    min: 30,
    max: 60,
  },
  issuedCount: 50,
};

export const mockDataModels: DataModelType[] = [
  {
    id: 1112121,
    title: 'Hello Gateway',
    description:
      'Welcome to Gateway, the new way to your data. This is an introductory data model used to provide developers a chance to help understand how the protocol and network works.',
    dataAssests: 10,
    dataModelId: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    consumptionPrice: 40,
  },
  {
    id: 1112122,
    title: 'Hello Gateway world',
    description:
      'Welcome to Gateway, the new way to your data. This is an introductory data model used to provide developers a chance to help understand how the protocol and network works.',
    dataAssests: 10,
    dataModelId: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
    updatedAt: new Date('2024-10-28'),
    createdAt: new Date(),
    consumptionPrice: 60,
  },
  {
    id: 1112123,
    title: 'Hello world',
    description:
      'Welcome to Gateway, the new way to your data. This is an introductory data model used to provide developers a chance to help understand how the protocol and network works.',
    dataAssests: 10,
    dataModelId: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
    updatedAt: new Date('2024-10-31'),
    createdAt: new Date(),
    consumptionPrice: 30,
  },
];

export const mockPrivateDataAssets: PrivateDataAsset[] = [
  {
    id: '4fff1352-2480-4fce-8b34-c095f4d9463a',
    mimeType: 'image/jpeg',
    proofs: [],
    structured: false,
    fileName: 'image1.jpg',
    access: [
      {
        did: 'did:4fff1352-2480-4fce-8b34-c095f4d9463a',
        username: 'John',
        access: 'Can view, update and delete',
      },
    ],
    expirationDate: new Date('2024-12-31'),
    updatedAt: new Date('2024-12-31'),
    size: 1024,
    createdAt: new Date(),
    tags: ['asset', 'file'],
    url: '',
    dataModel: { id: '4fff1352-2480-4fce-8b34-c095f4d9463a', schema: {} },
  },
  {
    id: '4fff1352-2480-4fce-8b34-c095f4d94631',
    mimeType: 'application/pdf',
    structured: false,
    proofs: [],
    access: [
      {
        did: 'did:4fff1352-2480-4fce-8b34-c095f4d9463a',
        username: 'Jane',
        access: 'Can view, update and delete',
      },
    ],
    fileName: 'document.pdf',
    expirationDate: new Date('2024-10-30'),
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    size: 2048,
    tags: ['asset', 'doc'],
    url: '',
    dataModel: { id: '4fff1352-2480-4fce-8b34-c095f4d9463a', schema: {} },
  },
  {
    id: '4fff1352-2480-4fce-8b34-c095f4d94632',
    structured: true,
    access: [
      {
        did: 'did:5e938e33-a062-4da5-8ed1-d6038eb7d574',
        username: 'Alice',
        access: 'Can view, update and delete',
      },
      {
        did: 'did:81123498-74e4-4aa7-bd5f-1890bbfb1ead',
        username: 'Jane',
        access: 'Can view and share',
      },
    ],
    expirationDate: new Date('2024-10-30'),
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    tags: ['asset', 'non-file'],
    url: 'http://www.google.com',
    size: 1024,
    fileName: 'credit score',
    mimeType: 'txt',
    proofs: [],
    dataModel: { id: '4fff1352-2480-4fce-8b34-c095f4d9463a', schema: {} },
  },
];

export const mockUser = { id: '1', gatewayId: 'test', isOrganization: false };

export const mockExplorerHomeStats: ExplorerHomeStats = {
  pdasIssued: 1000,
  totalUsers: 1000,
  transactionsCount: 100,
  uniqueIssuers: 10,
};

export const mockTransactions: Transaction[] = [
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.05',
      solana: '0.05',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
];
