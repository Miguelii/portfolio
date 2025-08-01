'use client'

import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon } from '../icons/menu-icon'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CloseIcon } from '../icons/close-icon'

type NavItem = {
   title: string
   url: string
   external?: boolean
}

const NAV: NavItem[] = [
   {
      title: 'OO',
      url: '/',
   },
   {
      title: 'ABOUT',
      url: '/about',
   },
   {
      title: 'linkedin',
      url: 'https://www.linkedin.com/in/miguelgoncalves18/',
      external: true,
   },
]

export default function Header() {
   const currPath = usePathname()

   const [isMenuOpen, setIsMenuOpen] = useState(false)

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   return (
      <header className="main-container mx-auto items-center my-5 md:my-10 w-full justify-between gap-6 flex flex-row">
         <Link href={'/'} prefetch={false} className="text-2xl font-bold">
            MG.
         </Link>

         <MobileMenu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            nav={NAV}
            currPath={currPath}
         />

         <MenuIcon className="flex md:hidden w-12 h-12 shrink-0" onClick={toggleMenu} />

         <nav className="hidden md:flex flex-row gap-6">
            {NAV?.map((item, index) => {
               const currPathNormalized = normalizePath(currPath || '/')

               const itemPathNormalized = normalizePath(item.url)

               const isSelected = itemPathNormalized === currPathNormalized

               return (
                  <Link
                     href={item.url}
                     prefetch={!item.external}
                     target={item.external ? '_blank' : '_self'}
                     className={cn('font-mono uppercase font-bold text-lg transition-colors')}
                     style={{
                        color: isSelected ? 'var(--neutral)' : 'var(--primary)',
                     }}
                     key={`nav-item-${item?.url}-${index}`}
                  >
                     {item.title}
                  </Link>
               )
            })}
         </nav>
      </header>
   )
}

type MobileMenuProps = {
   isMenuOpen: boolean
   toggleMenu: () => void
   nav: NavItem[]
   currPath: string
}
const MobileMenu = ({ isMenuOpen, toggleMenu, nav, currPath }: MobileMenuProps) => {
   // Variantes de animação para o container do menu
   const menuVariants = {
      closed: {
         opacity: 0,
         transition: {
            ease: 'easeOut',
            duration: 0.3,
         },
      },
      open: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
            when: 'beforeChildren',
         },
      },
   }

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
            ease: 'easeOut',
            duration: 0.6,
         },
      },
   }

   return (
      <AnimatePresence>
         {isMenuOpen && (
            <motion.div
               className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden"
               initial="closed"
               animate="open"
               exit="closed"
               //@ts-expect-error erro de versão
               variants={menuVariants}
            >
               <div className="w-full flex justify-end pt-5 pr-5">
                  <CloseIcon className="w-12 h-12 shrink-0 text-primary" onClick={toggleMenu} />
               </div>

               <nav className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                  {nav?.map((item, index) => {
                     const currPathNormalized = normalizePath(currPath || '/')

                     const itemPathNormalized = normalizePath(item.url)

                     const isSelected = itemPathNormalized === currPathNormalized

                     return (
                        //@ts-expect-error erro de versão
                        <motion.div variants={itemVariants} key={`mobile-nav-${index}`}>
                           <Link
                              href={item.url}
                              prefetch={!item.external}
                              target={item.external ? '_blank' : '_self'}
                              className={cn(
                                 'text-4xl font-semibold transition-colors block uppercase'
                              )}
                              style={{
                                 color: isSelected ? 'var(--neutral)' : 'var(--primary)',
                              }}
                              onClick={toggleMenu}
                              key={`mobile-nav-item-${item?.url}-${index}`}
                           >
                              {item.title}
                           </Link>
                        </motion.div>
                     )
                  })}
               </nav>
            </motion.div>
         )}
      </AnimatePresence>
   )
}

const normalizePath = (path: string) => path.replace(/\/$/, '') || '/'
