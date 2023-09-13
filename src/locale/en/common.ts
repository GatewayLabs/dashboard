import { Chain } from '@/services/protocol/types';

export const common = {
  general: {
    gateway: 'Gateway',
    received: 'Received',
    issued: 'Issued',
    status: 'Status',
    created_at: 'Created at',
    updated_at: 'Updated at',
  },
  chain: {
    EVM: 'Ethereum',
    SOL: 'Solana',
  } as Record<Chain, string>,
  actions: {
    accept: 'Accept',
    reject: 'Reject',
    check_data_proof: 'Check data proof',
    share_now: 'Share now',
    share_a_copy: 'Share a copy',
    revoke_access: 'Revoke access',
    hide_activity: 'Hide Activity',
    show_activity: 'See Activity',
    learn_more: 'Learn more',
    check_now: 'Check now',
    copy_url: 'Copy URL',
    connect_now: 'Connect now',
    back_to_home: 'Back to home',
    close: 'Close',
    show: 'Show',
    hide: 'Hide',
    more_info: 'More info',
    less_info: 'Less info',
  },
};
