import { apiPublic } from "@/services/protocol/api";
import { SessionToken } from "@/types/user";

import getMe from "./get-me";

export default async function loginWallet (
  signature: string,
  wallet: string
): Promise<SessionToken> {
  try {
    const res = await apiPublic.login_wallet({
      signature,
      wallet,
    });

    const { error } = (res as any) ?? {};

    if(error) {
      throw new Error(error);
    }

    if (error || !res.loginWallet) {
      throw new Error("Couldn't login");
    }

    const token = res.loginWallet;
    const user = await getMe(token!.token);
    return {
      ...token,
      user,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
