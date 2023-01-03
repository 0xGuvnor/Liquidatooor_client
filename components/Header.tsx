import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";
import Link from "next/link";
import { RiMoonFill } from "react-icons/ri";
import { HiSun } from "react-icons/hi";
import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { themeVariants } from "../lib/motion";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav className="sticky top-0 z-50 px-4 py-2 xl:px-0 bg-base-100/50 backdrop-blur-sm">
      <div className="flex items-center justify-between w-full mx-auto lg:max-w-7xl">
        <Link href="/" className="flex items-end space-x-2 hover:opacity-75">
          <span className="text-5xl">🌊</span>
          <span className="text-3xl font-bold">LiquidatooOr</span>
        </Link>
        <div className="flex items-center space-x-2">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={theme === "customLight" ? "light" : "darl"}
              variants={themeVariants}
              initial="start"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", duration: 0.2 }}
              className="flex items-center justify-center w-12 h-12 text-2xl rounded-full cursor-pointer hover:bg-base-300"
            >
              {theme === "customDark" ? (
                <RiMoonFill onClick={() => setTheme("customLight")} />
              ) : (
                <HiSun onClick={() => setTheme("customDark")} />
              )}
            </m.div>
          </AnimatePresence>
          <div className="text-sm">
            <ConnectButton chainStatus="icon" showBalance={false} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
