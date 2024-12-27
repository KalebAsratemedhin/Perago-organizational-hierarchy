"use client";
import React from "react";
import { AppShell, Burger, Drawer, Box, Text, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import ProviderWrapper from "./ProviderWrapper";

const ShellSetup = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <ProviderWrapper>
      <AppShell
        withBorder={false}
        styles={{
          main: {
            paddingTop: "4rem", 
            paddingBottom: "5rem", 
            minHeight: "100vh",
            overflow: "auto",
          },
        }}
      >
        <AppShell.Header>
          <div className="flex bg-white w-full items-center justify-between border-b border-gray-200 h-16 fixed top-0 z-10 shadow-md px-10">
            <div className="flex items-center">
              
              <Text className="text-xl font-bold text-gray-800">Organizational Hierarchy Chart</Text>
            </div>
            <div className="gap-6 flex items-center">
              
              <Link
                className="px-4 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-200"
                href="/positions"
              >
                Positions
              </Link>
            </div>

            <Burger
              opened={opened}
              onClick={toggle}
              className="md:hidden ml-auto"
              size="sm"
              color="#55ba4a"
            />
          </div>
        </AppShell.Header>

        <AppShell.Main className="bg-gray-50 p-4">{children}</AppShell.Main>

        <AppShell.Footer>
          <div className="flex-row bg-gray-800 h-20 justify-center items-center text-white font-semibold fixed bottom-0 w-full">
            <Box className="flex w-full justify-center gap-24 p-8  ">
              <Text className="text-xl font-bold text-gray-800">Organizational Hierarchy Chart</Text>

              <Text>
                <a href="mailto:risekab@gmail.com" className="underline">perago</a>
              </Text>
            </Box>
          </div>
        </AppShell.Footer>
      </AppShell>

      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="sm"
        position="top"
      >
        <div className="flex flex-col gap-4">
          
          <Link
            className="hover:bg-emerald-100 text-black text-lg px-4 py-2 rounded"
            href="/positions"
          >
            Positions
          </Link>
        </div>
      </Drawer>
    </ProviderWrapper>
  );
};

export default ShellSetup;
