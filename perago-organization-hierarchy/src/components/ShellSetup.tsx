"use client";
import React from 'react'
import {
  AppShell,
  Burger,
  Drawer,
  Box,
  Text,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link"; 


const ShellSetup = ({children}: any) => {
    const [opened, { toggle, close }] = useDisclosure();

  return (
    <>
      <AppShell header={{ height: 70 }} padding="md" withBorder={false}>
        <AppShell.Header  >
          <div className="flex bg-white w-screen items-center justify-between border-b border-gray-400 h-16">
            <div className="ml-10 mr-10">
              <a href="/">
                Logo
              </a>
            </div>
            <div className='gap-4 flex px-4'> 
              <Link className=' border  px-4 rounded-full  border-emerald-800  py-1  hover:bg-emerald-500 hover:text-white text-emerald-600  text-lg' href={'/signup'}>Signup</Link>
              <Link className=' border px-4 rounded-full  border-emerald-800  py-1 hover:bg-emerald-500 hover:text-white text-emerald-600  text-lg' href={'/signin'}>Signin</Link>
              <Link className=' border px-4 rounded-full border-emerald-800  py-1 hover:bg-emerald-500 hover:text-white text-emerald-600  text-lg' href={'/positions'}>Positions</Link>

            </div>
            <Burger   
              opened={opened}
              onClick={toggle}
              className="md:hidden ml-auto mr-7"
              size="sm"
              left={0}
              color="#55ba4a"
            />
          </div>
        </AppShell.Header>

        <AppShell.Main className="pl-0 pr-0 pt-20 ">{children}</AppShell.Main>

        <AppShell.Footer >
          <div className="flex-row bg-gray-600 h-20 justify-center pb-5 font-bold items-center">

              <Box className="flex w-full md:w-1/3 justify-center">
                <Text>
                  Email:{" "}
                  <a href="mailto:risekab@gmail.com">perago</a>
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
        <Link className='hover:bg-emerald-100 text-black text-lg' href={'/signup'}>Signup</Link>
        <Link className='hover:bg-emerald-100 text-black text-lg' href={'/signin'}>Signin</Link>
        <Link className='hover:bg-emerald-100 text-black text-lg' href={'/positions'}>Positions</Link>

      </Drawer>
    </>
  );
}

export default ShellSetup



