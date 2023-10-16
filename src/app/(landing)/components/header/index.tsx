import { useEffect, useRef, useState } from 'react';

import Link from '@/app/(landing)/components/Link';
import BurgerButton from '@/app/(landing)/components/burger-button';
import GatewayLogo from '@/app/(landing)/components/gateway-logo';
import Wrapper from '@/app/(landing)/components/wrapper';
import { useHeaderContext } from '@/app/(landing)/contexts/header-context';
import { useIsFirstRender } from '@/app/(landing)/hooks/use-is-first-render';
import useMobileDetect from '@/app/(landing)/hooks/use-mobile.detect';
import { joinClasses } from '@/app/(landing)/utils/function';
import { useLenis } from '@studio-freight/react-lenis';

import { Stack, Typography } from '@mui/material';

import Button from '../button';
import ArrowRight2 from '../icons/arrow-right-2';
import styles from './header.module.scss';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const { variant, setVariant } = useHeaderContext();
  const { isMobile, isTablet } = useMobileDetect();
  const [burgerActive, setBurgerActive] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'top' | null>(
    'top'
  );
  const previousVariant = useRef<'light' | 'dark' | null>(null);
  const isFirstRender = useIsFirstRender();

  const lenis = useLenis(({ direction, scroll }) => {
    if (direction === 1 && scroll > 0) {
      setScrollDirection('down');
    } else if (direction === -1 || scroll === 0) {
      setScrollDirection('top');
    }
  });

  useEffect(() => {
    if (isFirstRender) return;

    if (burgerActive) {
      previousVariant.current = variant;
      setVariant('light');
      lenis?.stop();
    } else {
      setVariant(previousVariant.current || 'dark');
      lenis?.start();
    }
  }, [isFirstRender, burgerActive, lenis]);

  return (
    <>
      <Stack
        direction="row"
        gap={0.5}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          background: '#E6D5FA',
          height: 40,
          flexDirection: 'row',
          position: 'relative',
          '& a': { textDecoration: 'none' },
          zIndex: 10,
        }}
      >
        <Typography color="common.black">
          Product Marketing Engagements can now be found at
        </Typography>
        <Link href="https://tryodyssey.xyz">
          <Typography color="primary">tryodyssey.xyz</Typography>
        </Link>
      </Stack>

      <nav
        className={joinClasses(
          styles.element,
          styles[`element--${scrollDirection}`],
          styles[`element--${variant}`],
          styles[`element--${isMobile === null && isTablet === null && 'hide'}`]
        )}
        ref={navRef}
      >
        <Wrapper className={styles.wrapper}>
          {isMobile || isTablet ? (
            <>
              <Link href="/" className={styles.logo_link}>
                <GatewayLogo variant={variant} />
              </Link>

              <div className={styles.mobile_buttons}>
                <Link href="/login">
                  <Button
                    variant="contained"
                    className={styles.mobile_button_head_dashboard}
                  >
                    Open dashboard
                  </Button>
                </Link>
                <BurgerButton
                  className={styles.mobile_burger}
                  active={burgerActive}
                  onClick={() => setBurgerActive(!burgerActive)}
                  variant={variant}
                />
              </div>
            </>
          ) : (
            <>
              <Link href="/" className={styles.logo_link}>
                <GatewayLogo withName variant={variant} />
              </Link>

              <div className={styles.links}>
                <Link className={styles.link} href="/learn">
                  <Button variant="text">Learn</Button>
                </Link>
                <Link className={styles.link} href="/build">
                  <Button variant="text">Build</Button>
                </Link>
              </div>

              <div className={styles.buttons_container}>
                <Link href="/login">
                  <Button
                    variant="contained"
                    className={styles.button_contained}
                  >
                    Open dashboard
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Wrapper>

        <div
          className={joinClasses(
            styles.mobile_menu_mask,
            burgerActive ? styles['mobile_menu_mask--open'] : ''
          )}
          ref={mobileMenuRef}
        >
          <Wrapper className={styles.mobile_wrapper}>
            <Link
              className={styles.mobile_link}
              href="/learn"
              onClick={() => setBurgerActive(false)}
            >
              <Button variant="text">
                <span>Learn</span>
                <ArrowRight2 className={styles.mobile_link_arrow} />
              </Button>
            </Link>
            <Link
              className={styles.mobile_link}
              href="/build"
              onClick={() => setBurgerActive(false)}
            >
              <Button variant="text">
                <span>Build</span>
                <ArrowRight2 className={styles.mobile_link_arrow} />
              </Button>
            </Link>

            <div className={styles.mobile_menu_buttons}>
              <Link
                className={styles.mobile_menu_button_link}
                href="/login"
                onClick={() => setBurgerActive(false)}
              >
                <Button
                  variant="contained"
                  className={styles.mobile_menu_button_link_contained}
                >
                  Open dashboard
                </Button>
              </Link>
            </div>
          </Wrapper>
        </div>
      </nav>
    </>
  );
}
