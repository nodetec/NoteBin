"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsLightningChargeFill } from "react-icons/bs";
import { GiOstrich } from "react-icons/gi";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { TbNote } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io"
import { CgCloseO } from "react-icons/cg"

import Button from "./Button";
import Buttons from "./Buttons";
import TextInput from "./TextInput";

export default function Header({ onSetUser }: any) {
  // const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [keys, setKeys] = useState({ private: "", public: "" });
  const [isLightningConnected, setIsLightningConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const connected = sessionStorage.getItem("connected");

    const getConnected = async (connected: string) => {
      let enabled = false;
      if (connected === "true") {
        // @ts-ignore
        enabled = await window.webln.enable();
        setIsLightningConnected(true);
      }
      return enabled;
    };

    if (connected) {
      getConnected(connected);
    }
  }, []);

  function handleClick() {
    onSetUser("chris");
    setIsOpen(true);
  }

  const connectLightningHandler = async () => {
    // @ts-ignore
    if (typeof window.webln !== "undefined") {
      // @ts-ignore
      const enabled = await window.webln.enable();

      sessionStorage.setItem("connected", "true");
    }
    console.log("connected");
    setIsLightningConnected(true);
  };

  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <HiOutlineSun className="w-16 h-16 text-white" role="button" onClick={() => setTheme('light')} />
      )
    }
    else {
      return (
        <HiOutlineMoon className="w-16 h-16 text-black" role="button" onClick={() => setTheme('dark')} />
      )
    }
  };
  return (
    <div>
      <nav className="flex justify-between items-center pb-12">
        <Link className="text-3xl font-bold dark:text-white" href="/">
          <div className="flex flex-row">
            <TbNote
              // color={"#111"}
              size="40"
            />
            <span className="text-zinc-200">note</span>
            <span className="text-blue-400">bin</span>
          </div>
        </Link>
        <div className="flex gap-4 flex-row">
          {renderThemeChanger()}
          {/* <Link href="/"> */}
          <Button
            color="neutralLight"
            onClick={handleClick}
            size="sm"
            icon={
              <GiOstrich
                // color={"#111"}
                size="14"
              />
            }
          >
            login
          </Button>
          {/* <Button onClick={() => setIsOpen(true)}>Open Popup</Button> */}
          <Button
            onClick={connectLightningHandler}
            color="yellow"
            size="sm"
            icon={
              <BsLightningChargeFill
                // color={"#111"}
                size="14"
              />
            }
          >
            {isLightningConnected ? "connected" : "connect"}
          </Button>
        </div>
      </nav>
      {isOpen && (
        <>
          <div className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm border-2 border-neutral-500 rounded-md">
            <Button
              icon={<IoMdCloseCircleOutline size={24} />}
              className="absolute w-fit right-0 top-0 text-neutral-400"
              onClick={() => setIsOpen(false)}
              color="transparent"
            />
            <div className="bg-neutral-900 flex flex-col justify-center items-stretch gap-4 p-6 rounded-md shadow-lg ">
              <h3 className="text-xl text-neutral-400 text-center pb-4">Generate Keys</h3>
              <TextInput value={keys.private} onChange={(e) => setKeys(current => ({ ...current, private: e.target.value }))} label="Private Key" />
              <TextInput value={keys.public} onChange={(e) => setKeys(current => ({ ...current, public: e.target.value }))} label="Pubilc Key" />
              <Buttons>
                <Button color="neutralDark" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOpen(false)}>Generate</Button>
              </Buttons>
            </div>
          </div>
          <div className="bg-neutral-900 opacity-50 fixed z-40 w-full h-full" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}
