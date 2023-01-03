import { Variants } from "framer-motion";

export const themeVariants: Variants = {
  start: { y: -50, opacity: 0 },
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
};
