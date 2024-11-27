"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { SearchIcon } from "@/components/icons";
import { fontSans, fontMono } from "@/config/fonts";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false); // Close menu
    router.push(href); // Navigate to the new route
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      isBordered
      className="py-5 md:py-3 bg-black/20 backdrop-blur-xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle className="sm:hidden text-green-600" />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <p
              className={clsx(
                "text-white text-xl font-extrabold md:text-3xl",
                fontMono.variable,
                "font-mono"
              )}
            >
              ANANDKUMAR NS
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full pl-5"
        justify="end"
      >
        <ul
          className={clsx(
            "hidden sm:flex gap-8 justify-start ml-5",
            fontMono.variable
          )}
        >
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-green-300 data-[active=true]:font-medium text-gray-400 hover:text-green-600 transition-colors font-mono"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarMenu className="bg-black/90 backdrop-blur-xl">
        <div
          className={clsx(
            "mx-4 mt-2 flex flex-col gap-2 ml-5",
            fontMono.variable,
            "font-mono"
          )}
        >
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="text-gray-400 hover:text-green-600 transition-colors font-mono w-full"
                onClick={() => handleLinkClick(item.href)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
