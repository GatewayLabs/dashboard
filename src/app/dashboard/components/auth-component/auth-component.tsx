'use client';

import { useSession } from 'next-auth/react';

import { useMenu } from '@/hooks/use-menu';

import { MoreHorizOutlined } from '@mui/icons-material';
import { ButtonBase, Menu, alpha } from '@mui/material';

import AuthComponentSkeleton from './auth-component-skeleton';
import AuthDropdown from './auth-dropdown';
import UserOrgInfo from './user-org-info';

type Props = {
  id: string;
  controlId: string;
};

export default function AuthComponent({ id, controlId }: Props) {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu();

  if (status === 'loading' || !session) {
    return <AuthComponentSkeleton />;
  }

  const did = '';
  const username = '';
  const name = '';
  const image = '';

  return (
    <>
      <ButtonBase
        id={id}
        aria-controls={isOpen ? controlId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        sx={(theme) => ({
          backgroundColor: {
            xs: 'transparent',
            lg: 'primary.light',
          },
          borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
          justifyContent: 'space-between',
          p: 2,
          mr: {
            xs: -2,
            lg: 0,
          },
          textAlign: 'left',
          flexDirection: {
            xs: 'row-reverse',
            lg: 'row',
          },
        })}
        onClick={onOpen}
      >
        <UserOrgInfo id={did} image={image} name={name} gatewayId={username} />

        <MoreHorizOutlined
          sx={{
            color: 'action.active',
            backgroundColor: {
              xs: 'white',
              lg: 'transparent',
            },
            borderRadius: {
              xs: '50%',
              lg: 0,
            },
            borderColor: {
              xs: 'divider',
              lg: 'transparent',
            },
            borderWidth: {
              xs: 1,
              lg: 0,
            },
            borderStyle: {
              xs: 'solid',
              lg: 'none',
            },
            marginRight: {
              xs: -1.5,
              lg: 0,
            },
            zIndex: 2,
          }}
        />
      </ButtonBase>
      <Menu
        id={controlId}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': id,
          sx: {
            minWidth: 305,
          },
        }}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        sx={{
          '.MuiListItemIcon-root': {
            minWidth: (theme) => `${theme.spacing(5 + 1.5)} !important`,
          },
        }}
      >
        <AuthDropdown onClose={onClose} />
      </Menu>
    </>
  );
}