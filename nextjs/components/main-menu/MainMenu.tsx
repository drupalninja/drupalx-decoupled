"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MainMenuItem, MainMenuProps } from './Types'
import { frontpagePath } from '@/utils/routes'
import { cn } from "@/lib/utils"

const MainMenu: React.FC<MainMenuProps> = ({
  modifier,
  linkModifier,
  siteLogo,
  siteLogoWidth,
  siteLogoHeight,
  siteName,
  showLogo,
  showSiteName,
  menuItems,
  ctaLinkCount,
}) => {
  const pathname = usePathname() || '';
  ctaLinkCount = Math.min(ctaLinkCount, menuItems.length)

  // Add active trail classes to menu items.
  menuItems = menuItems.map((item, index) => {
    const isCTA = index >= menuItems.length - ctaLinkCount

    const inActiveTrail = item.url === frontpagePath && pathname === '/'
      ? true
      : pathname.startsWith(item.url)

    const below = item.below?.map((subItem) => ({
      ...subItem,
      inActiveTrail: pathname.startsWith(subItem.url),
    }))

    return { ...item, isCTA, inActiveTrail, below }
  })

  const navItems = menuItems.filter(item => !item.isCTA)
  const ctaItems = menuItems.filter(item => item.isCTA)

  return (
    <nav className={`${modifier}`}>
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className={`flex items-center ${!showLogo ? "text-2xl font-bold" : ""}`}
          >
            {showLogo && (
              <Image
                src={siteLogo ?? ''}
                alt="Site Logo"
                width={siteLogoWidth ?? 200}
                height={siteLogoHeight ?? 100}
                className="mr-2"
              />
            )}
            {showSiteName && siteName && <span className="text-2xl">{siteName.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}</span>}
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <DesktopMenuItems items={navItems} linkModifier={linkModifier} />
            <div className="flex items-center space-x-6">
              {ctaItems.map((item, index) => (
                <Button
                  key={index}
                  asChild
                  variant={index === ctaItems.length - 1 ? "default" : "outline"}
                  className="text-lg"
                >
                  <Link href={item.url}>{item.title}</Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="mobile-menu lg:hidden">Menu</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6">
                <MobileMenuItems items={navItems} linkModifier={linkModifier} />
                <div className="mt-4">
                  {ctaItems.map((item, index) => (
                    <Button
                      key={index}
                      asChild
                      variant={index === ctaItems.length - 1 ? "default" : "outline"}
                      className="w-full mt-2 text-lg"
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </Button>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

const MobileMenuItems: React.FC<{
  items: MainMenuItem[]
  linkModifier?: string
}> = ({ items, linkModifier }) => {
  return (
    <ul className="space-y-6">
      {items.map((item, index) => (
        <MobileMenuItem key={index} item={item} linkModifier={linkModifier} />
      ))}
    </ul>
  )
}

const MobileMenuItem: React.FC<{
  item: MainMenuItem
  linkModifier?: string
}> = ({ item, linkModifier }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault()
    if (item.below) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <li>
      {item.below ? (
        <div>
          <button
            onClick={toggleExpand}
            className={cn(
              "text-lg font-semibold w-full text-left flex justify-between items-center",
              linkModifier,
              item.inActiveTrail ? 'font-bold' : ''
            )}
          >
            {item.title}
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isExpanded && (
            <ul className="ml-4 mt-3 space-y-3">
              {item.below.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <Link
                    href={subItem.url}
                    className={cn(
                      "block text-base",
                      linkModifier,
                      subItem.inActiveTrail ? 'font-bold' : ''
                    )}
                  >
                    {subItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Link
          href={item.url}
          className={cn(
            "block text-lg",
            linkModifier,
            item.inActiveTrail ? 'font-bold' : ''
          )}
        >
          {item.title}
        </Link>
      )}
    </li>
  )
}

const DesktopMenuItems: React.FC<{
  items: MainMenuItem[]
  linkModifier?: string
}> = ({ items, linkModifier }) => {
  return (
    <div className="flex space-x-8">
      {items.map((item, index) => (
        <div key={index} className="relative group">
          {item.below ? (
            <>
              <button className={cn(
                "flex items-center text-lg text-foreground hover:text-primary",
                linkModifier,
                item.inActiveTrail ? 'font-bold' : ''
              )}>
                {item.title}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {item.below.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.url}
                      className={cn(
                        "block px-4 py-3 text-base text-foreground hover:bg-muted",
                        linkModifier,
                        subItem.inActiveTrail ? 'font-bold' : ''
                      )}
                      role="menuitem"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Link
              href={item.url}
              className={cn(
                "text-lg text-foreground hover:text-primary",
                linkModifier,
                item.inActiveTrail ? 'font-bold' : ''
              )}
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

export default MainMenu
