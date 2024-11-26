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

export const Navbar = () => {
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
      className="py-5 md:py-3 bg-black/20 backdrop-blur-xl"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle className="sm:hidden text-orange-400" />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p
              className={clsx(
                "text-orange-400 text-xl font-extrabold md:text-3xl",
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
                  "data-[active=true]:text-orange-400 data-[active=true]:font-medium text-gray-400 hover:text-orange-400 transition-colors font-mono"
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
            fontSans.variable,
            "font-league"
          )}
        >
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                href={item.href}
                size="lg"
                className="text-gray-400 hover:text-orange-400 transition-colors"
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
