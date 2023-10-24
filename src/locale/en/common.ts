import { Chain } from '@/services/protocol/types';

export const common = {
  general: {
    gateway: 'Gateway',
    received: 'Received',
    issued: 'Issued',
    status: 'Status',
    created_at: 'Created at',
    updated_at: 'Updated at',
    sent: 'Sent',
    wallet: 'Wallet',
    other_accounts: 'Other accounts',
    email: 'Email',
    avatar: 'Avatar',
    username: 'Username',
    name: 'Name',
    success_copy_message: 'Copied to clipboard',
    optional: 'Optional',
    alert_important: 'This is extremely important',
    success: 'Success',
    developers: 'Developers',
  },
  chain: {
    EVM: 'Ethereum',
    SOL: 'Solana',
  } as Record<Chain, string>,
  actions: {
    accept: 'Accept',
    reject: 'Reject',
    save: 'Save',
    cancel: 'Cancel',
    check_data_proof: 'Check data proof',
    share_now: 'Share now',
    share_a_copy: 'Share a copy',
    revoke_access: 'Revoke access',
    hide_activity: 'Hide Activity',
    show_activity: 'See Activity',
    learn_more: 'Learn more',
    check_now: 'Check now',
    copy: 'Copy',
    copy_url: 'Copy URL',
    connect_now: 'Connect now',
    back_to_home: 'Back to home',
    close: 'Close',
    show: 'Show',
    hide: 'Hide',
    more_info: 'More info',
    less_info: 'Less info',
    connect: 'Connect',
    disconnect: 'Disconnect',
    crop: 'Crop',
    revoke: 'Revoke',
    suspend: 'Suspend',
    make_valid: 'Make valid',
    create_id: 'Create ID',
    continue: 'Continue',
    verify: 'Verify',
    view_more: 'View more',
    code_send_again: 'Send code again',
  },
  socials: {
    twitter: 'Twitter',
    google: 'Google',
    github: 'Github',
    discord: 'Discord',
  },
  identifier: {
    type: 'Account type',
    value: 'Address',
    types: {
      gateway_id: 'Gateway ID',
      email: 'Email',
      evm_wallet: 'EVM Wallet',
      solana_wallet: 'Solana Wallet',
    },
  },
};
