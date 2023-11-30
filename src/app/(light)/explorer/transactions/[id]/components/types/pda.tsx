import { TextStatusChip } from '@/components/text-status-chip/text-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import { transaction_detail } from '@/locale/en/transaction';
import { Transaction_DetailQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import dayjs from 'dayjs';

import { Divider, Stack } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function PDA({
  data,
}: {
  data: Transaction_DetailQuery['transaction'];
}) {
  const metadata: any = data.metadata;
  return (
    <Stack
      sx={{
        mb: 3,
        overflow: 'visible',
      }}
      divider={
        <Divider
          sx={{
            width: '100%',
          }}
        />
      }
    >
      <CardRow title={transaction_detail.pda_id}>{metadata.pda}</CardRow>
      <CardRow title={transaction_detail.issuer}>
        <UserColumn isLoading={false} user={data.from} />
      </CardRow>
      <CardRow title={transaction_detail.signed_by}>
        <UserColumn isLoading={false} user={{ id: metadata.signedBy }} />
      </CardRow>
      <CardRow title={transaction_detail.data_model_id}>data model id</CardRow>
      <CardRow title={transaction_detail.created_at}>
        {dayjs(data?.createdAt).format(DATE_FORMAT)}
      </CardRow>
      <CardRow title={transaction_detail.cost}>
        {numberToMoneyString(data?.cost ?? 0)}
      </CardRow>
      <CardRow title={transaction_detail.expiration}>
        add expiration here (API)
      </CardRow>
      <CardRow title={transaction_detail.status}>
        <TextStatusChip
          variant="filled"
          status={metadata.pdaStatus}
          size="small"
        />
      </CardRow>
    </Stack>
  );
}
