import Activities from '@/components/activities/activities';
import { pda } from '@/locale/en/pda';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Divider, Stack } from '@mui/material';

import ModalPDADetail from './components/modal-pda-detail/modal-pda-detail';
import ProofCardInfo from './components/proof-card-info';
import ProofCardTitle from './components/proof-card-title';
import ProofData from './components/proof-data';
import ProofRevokeButton from './components/proof-revoke-button';
import ProofShareButton from './components/proof-share-button';

export default function ProofPage() {
  // TODO: Remove MOCK
  const proof = {
    id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fe375',
    title: 'Chase',
    issuance_date: '2018-04-04T16:00:00.000Z',
    status: 'Valid',
    activities: [
      {
        type: 'Issued',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
      {
        type: 'Revoked',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
    ],
  };
  const dataModels = [
    {
      id: 'a23q231231312312qdasdasdfas',
      title: 'Credit Card Transactions',
      credentials: [
        {
          id: '7Cae5130c16e6c8b686440b900d93fe12asdfasdfasd91977e70b812d170024f1cffd0e3fe375',
          name: 'Credit Card Transactions',
          issuerName: 'Mastercard',
          issuerImage:
            'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
          status: 'revoked',
        },
        {
          id: 'asdfadfasdfasdf',
          name: 'Credit Card Transactions',
          issuerName: 'Visa',
          issuerImage:
            'https://static.vecteezy.com/system/resources/previews/009/469/638/original/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg',
          status: 'valid',
        },
        {
          id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fasdfas',
          name: 'Credit Card Transactions',
          issuerName: 'Amex',
          issuerImage:
            'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
          status: 'valid',
        },
      ],
    },
    {
      id: 'a23q23123131231da2312qdasdas',
      title: 'Credit Score',
      credentials: [
        {
          id: '0c0ff388-23e7-47ec-9175-1bcd7880877c',
          name: 'Credit Score',
          issuerName: 'Mastercard',
          issuerImage:
            'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
          status: 'valid',
        },
        {
          id: 'a23q231231312312qdasdasasdfasdf',
          name: 'Credit Score',
          issuerName: 'Visa',
          issuerImage:
            'https://static.vecteezy.com/system/resources/previews/009/469/638/original/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg',
          status: 'revoked',
        },
        {
          id: 'a23q231231312312qdasdasasdfa3e4q3eqglkj',
          name: 'Credit Score',
          issuerName: 'Amex',
          issuerImage:
            'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
          status: 'valid',
        },
      ],
    },
  ];

  return (
    <>
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <ProofCardTitle proof={proof} />
        <ProofCardInfo proof={proof} />
        <ProofShareButton proof={proof} />
        <ProofRevokeButton proof={proof} />
        <Activities
          activities={proof.activities}
          activitiesTextsType={{
            Issued: pda.activities.issued,
            Revoked: pda.activities.revoked,
            Suspended: pda.activities.suspended,
            Reactivated: pda.activities.reactivated,
            Updated: pda.activities.updated,
          }}
        />
      </Stack>
      <Divider
        sx={{
          mb: 5,
          mt: 2,
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      />
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <ProofData dataModels={dataModels} />
      </Stack>
      <ModalPDADetail />
    </>
  );
}
