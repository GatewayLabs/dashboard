import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import routes from '@/constants/routes';
import { authApi } from '@/services/api/api';
import { mockPublicDataAssets } from '@/services/api/mocks';
import { getServerComponentSession } from '@/services/next-auth/config';
import { PageWithParams } from '@/types/next';

import PDADetailPage from './components/content';

export default async function PDAPage({
  params,
}: PageWithParams<{ fid: string }>) {
  // decode the fid from the URL
  const session = await getServerComponentSession();

  if (!session) {
    return redirect(routes.home);
  }
  // const fid = decodeURIComponent(params.fid);
  const obj = await authApi(session.token).GET('/data-assets/{id}', {
    params: { path: { id: 88068846996422656 } },
  });

  return <>{JSON.stringify(obj)}</>;

  // const pda = mockPublicDataAssets.find((pda) => pda.fid === params.fid);

  // if (!data) {
  //   return redirect(routes.dashboard.home);
  // }

  // return <PDADetailPage pda={data} backHref={routes.dashboard.home} />;
}
