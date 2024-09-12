'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
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
  siteName,
  showLogo,
  menuItems,
  ctaLinkCount,
}) => {
  const pathname = usePathname()

  // Add active trail classes to menu items.
  menuItems = menuItems.map((item, index) => {
    const isCTA = index >= menuItems.length - ctaLinkCount
    if (item.url === frontpagePath && pathname === '/') {
      item.inActiveTrail = true
    }
    else if (pathname) {
      item.inActiveTrail = pathname.startsWith(item.url)
    }
    if (item.below && pathname) {
      item.below = item.below.map((subItem) => {
        subItem.inActiveTrail = pathname.startsWith(subItem.url)
        return subItem
      })
    }
    return { ...item, isCTA }
  })

  const navItems = menuItems.filter(item => !item.isCTA)
  const ctaItems = menuItems.filter(item => item.isCTA)

  return (
    <div className={`flex items-center justify-between ${modifier}`}>
      <Link href="/" className={!showLogo ? "text-2xl font-bold" : ""}>
        {showLogo && <Image src={siteLogo ?? ''} alt="Site Name" width={200} height={100} className="mr-1" />}
        {!showLogo && siteName}
      </Link>

      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden">Menu</Button>
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

      {/* Desktop menu */}
      <div className="hidden lg:flex lg:items-center lg:space-x-4">
        <NavigationMenu>
          <NavigationMenuList className="space-x-2">
            <DesktopMenuItems items={navItems} linkModifier={linkModifier} />
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
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
    </div>
  )
}

const MobileMenuItems: React.FC<{
  items: MainMenuItem[]
  linkModifier?: string
}> = ({ items, linkModifier }) => {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index}>
          {item.below ? (
            <div>
              <span className={cn(
                "text-lg font-semibold",
                linkModifier,
                item.inActiveTrail ? 'font-bold' : ''
              )}>
                {item.title}
              </span>
              <ul className="ml-4 mt-2 space-y-2">
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
      ))}
    </ul>
  )
}

const DesktopMenuItems: React.FC<{
  items: MainMenuItem[]
  linkModifier?: string
}> = ({ items, linkModifier }) => {
  return (
    <>
      {items.map((item, index) => {
        if (item.below) {
          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger className={cn(
                "text-lg",
                linkModifier,
                item.inActiveTrail ? 'font-bold' : ''
              )}>
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.below.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={subItem.url}
                          className={cn(
                            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "text-base",
                            linkModifier,
                            subItem.inActiveTrail ? 'font-bold' : ''
                          )}
                        >
                          {subItem.title}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        }

        return (
          <NavigationMenuItem key={index}>
            <Link href={item.url} legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-lg")}>
                <span className={cn(
                  linkModifier,
                  item.inActiveTrail ? 'font-bold' : ''
                )}>
                  {item.title}
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )
      })}
    </>
  )
}

export default MainMenu
