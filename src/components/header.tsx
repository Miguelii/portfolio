"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "./menu-icon";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CloseIcon } from "./close-icon";
import { getBuildId } from "@/utils/getBuildId";

type NavItem = {
  title: string;
  url: string;
  external?: boolean;
};

const NAV: NavItem[] = [
  {
    title: "OO",
    url: "/",
  },
  {
    title: "ABOUT",
    url: "/about",
  },
  {
    title: "CONTACT",
    url: "/contact",
  },
  {
    title: "linkedin",
    url: "https://www.linkedin.com/in/miguelgoncalves18/",
    external: true,
  },
  {
    title: "CV",
    url: "/CV_20250413.pdf",
    external: true,
  },
];

export default function Header() {
  const currPath = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const id = getBuildId();
  
  return (
    <header className="container mx-auto items-center px-5 md:px-0 mt-5 mb-12 w-full md:my-24 lg:my-36 xl:my-36 justify-between gap-6 flex flex-row">
      <Link href={"/"} prefetch={false} className="">
        <Image
          width={110}
          height={48}
          quality={100}
          //unoptimized
          src={`/sig_new.png?v=${id}`}
          alt="Miguel Gonçalves hearder signature"
          className="w-26 md:w-26 h-12 md:h-12 aspect-square shrink-0"
        />
      </Link>


      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} nav={NAV} currPath={currPath}/>

      <MenuIcon
        className="flex md:hidden w-12 h-12 shrink-0"
        onClick={toggleMenu}
      />

      <nav className="hidden md:flex flex-row gap-6">
        {NAV.map((item, index) => {
          const isSelected = item.url === currPath;

          return (
            <Link
              href={item.url}
              prefetch={!item.external}
              target={item.external ? "_blank" : "_self"}
              className={cn(
                "text-sm font-mono uppercase font-semibold hover:text-[#FF7070]",
                isSelected ? "text-[#7D7D7D]" : "text-white"
              )}
              key={`nav-item-${index}`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

type MobileMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  nav: NavItem[];
  currPath: string;
};
const MobileMenu = ({ isMenuOpen, toggleMenu, nav, currPath }: MobileMenuProps) => {
  // Variantes de animação para o container do menu
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  // Variantes de animação para os itens do menu
  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <div className="w-full flex justify-end pt-5 pr-5">
            <CloseIcon
              className="w-12 h-12 shrink-0 text-black"
              onClick={toggleMenu}
            />
          </div>

          <nav className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
            {nav?.map((item, index) => {
              const isSelected = item.url === currPath;
              return (
                <motion.div variants={itemVariants} key={`mobile-nav-${index}`}>
                  <Link
                    href={item.url}
                    prefetch={!item.external}
                    target={item.external ? "_blank" : "_self"}
                    className={cn(
                      "text-4xl font-semibold transition-colors block uppercase hover:text-[#FF7070]",
                      isSelected ? 'text-[#7D7D7D]' : 'text-black'
                    )}
                    onClick={toggleMenu}
                  >
                    {item.title}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
