"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { connect } from "http2";
import Base64 from "base64-js";

const Home: NextPage = () => {
    const { address: connectedAddress } = useAccount();
    // const [imageSrc, setImageSrc] = useState('');
    // const [nftJson, setNFTJson] = useState({});

    const [imageSrc, setImageSrc] = useState('');
    const [decodedJson, setDecodedJson] = useState('');
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const { data: nftID } = await useScaffoldReadContract({
    //       contractName: "YourContract",
    //       functionName: "tokenOfOwnerByIndex",
    //       args: [connectedAddress, 0],
    //     });
  
    //     const { data: encodedJson } = await useScaffoldReadContract({
    //       contractName: "YourContract",
    //       functionName: "tokenURI",
    //       args: [nftID],
    //     });
  
    //     const decodedJson = Base64.decode(encodedJson);
    //     const json = JSON.parse(decodedJson);
    //     setImageSrc(json.image);
    //   };
  
    //   fetchData();
    // }, [connectedAddress]);

    // useEffect(() => {
      
    // }, [connectedAddress])
  
    const { data: nftID, isLoading: isNFTIDLoading } = useScaffoldReadContract({
      contractName: "YourContract",
      functionName: "tokenOfOwnerByIndex",
      args: [connectedAddress, BigInt(0)],
    });
  
    const { data: nftMeta, isLoading: isNFTMetaLoading } = useScaffoldReadContract({
      contractName: "YourContract",
      functionName: "tokenURI",
      args: [nftID],
    });


    console.log(nftID, nftMeta);

    // console.log("base64 byte length", Base64.byteLength(nftMeta));

    useEffect(() => {
      if(nftMeta) {
        const base64String = nftMeta.split(',')[1]; // Split the string and take the part after the comma
        const decodedJson = window.atob(base64String);
        const json = JSON.parse(decodedJson);
        setImageSrc(json.image); // Directly use the image data URI
        setDecodedJson(JSON.stringify(json, null, 2)); // Pretty print JSON
      }
    }, [nftMeta])


  // const NFTInfo = () => {
  //   const { data: nftID, isLoading: isNFTIDLoading } = useScaffoldReadContract({
  //     contractName: "YourContract",
  //     functionName: "tokenOfOwnerByIndex",
  //     // @ts-ignore
  //     args: [connectedAddress, 0],
  //   });

  //   const { data: nftInfo, isLoading: isNFTInfoLoading } = useScaffoldReadContract({
  //     contractName: "YourContract",
  //     functionName: "tokenURI",
  //     args: [nftID],
  //   });

  //   return { nftInfo, nftID, isNFTInfoLoading };
  // };

  // console.log(NFTInfo().isNFTInfoLoading, NFTInfo().nftInfo);
  console.log(decodedJson);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <img src={imageSrc} alt="NFT" className="w-1/2 h-1/2" />
          </div>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
