'use client';

import { common } from '@/locale/en/common';
import { wallet } from '@/locale/en/wallet';
import { useToggle } from '@react-hookz/web';

import {
  ArrowDropDown,
  ArrowDropUp,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

type listItem = {
  name: string;
  value: string;
};

type PropsStatementList = {
  title: string;
  value: string;
  showValues: boolean;
  showDetails: boolean;
  list?: listItem[];
};

const WalletStatementList = ({
  title,
  value,
  showValues,
  showDetails,
  list,
}: PropsStatementList) => {
  return (
    <Stack
      data-testid="wallet-statement__list"
      bgcolor="common.white"
      borderRadius="16px"
      flex={1}
      px={2}
      pt={2}
    >
      <Box gap={1} pb={2}>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" data-testid="list__total-value">
          {showValues ? (
            <>{value}</>
          ) : (
            <MoreHorizOutlined sx={{ fontSize: 'inherit' }} />
          )}
        </Typography>
      </Box>
      <Collapse in={showDetails && !!list?.length}>
        <Stack data-testid="list__details-items" divider={<Divider />} mx={-2}>
          {list?.map(({ name, value }) => (
            <Box key={name} display="flex" justifyContent="space-between" p={2}>
              <Typography variant="body2">{name}</Typography>
              <Typography
                variant="subtitle2"
                data-testid="list__register-value"
              >
                {showValues ? (
                  <>{value}</>
                ) : (
                  <MoreHorizOutlined sx={{ fontSize: 'inherit' }} />
                )}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

type Props = {
  showValues: boolean;
};

const mockMoneyIn = [
  { name: 'Deposits', value: '$150.00' },
  { name: 'PDA consumption revenue', value: '$84.54' },
];

export default function WalletStatement({ showValues }: Props) {
  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <Box data-testid="hero__wallet-statement">
      <Box
        mt={5}
        display="flex"
        flexDirection={{
          xs: 'column',
          lg: 'row',
        }}
        gap={2}
      >
        <WalletStatementList
          showDetails={showDetails}
          showValues={showValues}
          value="$234.54"
          title={wallet.page.money_in}
          list={mockMoneyIn}
        />
        <WalletStatementList
          showDetails={showDetails}
          showValues={showValues}
          value="$0.0"
          title={wallet.page.money_out}
        />
      </Box>
      <Stack mt={2} gap={2}>
        <Button
          variant="text"
          onClick={toggleDetails}
          sx={{ alignSelf: 'flex-start' }}
          endIcon={!showDetails ? <ArrowDropDown /> : <ArrowDropUp />}
        >
          {!showDetails ? common.actions.more_info : common.actions.less_info}
        </Button>
      </Stack>
    </Box>
  );
}