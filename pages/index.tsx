import React from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
// import contractInterface from '../contract-abi.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';

// import { contractInterface, addressOrName } from "../pages/constants";
import contractInterface from '../pages/constants/contract-abi.json';

const contractConfig = {
  addressOrName: '0x4fF8Ec266fC9d133E4ff5f90930bD963362Cedce',
  contractInterface: contractInterface,
};

const Home: NextPage = () => {
  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();

  // const { config: contractWriteConfig } = usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: 'mint',
  // });

  // const {
  //   data: mintData,
  //   write: mint,
  //   isLoading: isMintLoading,
  //   isSuccess: isMintStarted,
  //   error: mintError,
  // } = useContractWrite(contractWriteConfig);

  const { data: getTokenIdsMinted } = useContractRead({
    ...contractConfig,
    functionName: 'tokenIds',
    watch: true,
  });

  // const {
  //   data: txData,
  //   isSuccess: txSuccess,
  //   error: txError,
  // } = useWaitForTransaction({
  //   hash: mintData?.hash,
  // });

  React.useEffect(() => {
    if (getTokenIdsMinted) {
      setTotalMinted(getTokenIdsMinted.toNumber());
    }
  }, [getTokenIdsMinted]);

  // const isMinted = txSuccess;

  return (
    <div className="page">
      <div className="container">
        <div style={{ flex: '1 1 auto' }}>
          <div style={{ padding: '24px 24px 24px 0' }}>
            <h1>NFT Demo Mint</h1>
            <p style={{ margin: '12px 0 24px' }}>
              {totalMinted} minted so far!
            </p>
            <ConnectButton />
{/* 
            {mintError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {mintError.message}
              </p>
            )}
            {txError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {txError.message}
              </p>
            )} */}

            {/* {isConnected && !isMinted && (
              <button
                style={{ marginTop: 24 }}
                disabled={!mint || isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() => mint?.()}
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Mint'}
              </button>
            )} */}
          </div>
        </div>
{/* 
        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={isMinted}>
              <Image
                layout="responsive"
                src="/nft.png"
                width="500"
                height="500"
                alt="RainbowKit Demo NFT"
              />
              <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
              <ConnectButton />
            </FrontCard>
            <BackCard isCardFlipped={isMinted}>
              <div style={{ padding: 24 }}>
                <Image
                  src="/nft.png"
                  width="80"
                  height="80"
                  alt="RainbowKit Demo NFT"
                  style={{ borderRadius: 8 }}
                />
                <h2 style={{ marginTop: 24, marginBottom: 6 }}>NFT Minted!</h2>
                <h3 style={{ marginBottom: 24 }}>
                  Your NFT will show up in your wallet in the next few minutes.
                </h3>
                <h3 style={{ marginBottom: 6 }}>
                  View on{' '}
                  <a href={`https://rinkeby.etherscan.io/tx/${mintData?.hash}`}>
                    Etherscan
                  </a>
                </h3>
                <h3>
                  View on{' '}
                  <a
                    href={`https://testnets.opensea.io/assets/rinkeby/${txData?.to}/1`}
                  >
                    Opensea
                  </a>
                </h3>
              </div>
            </BackCard>
          </FlipCard>
        </div> */}
      </div>
    </div>
  );
};

export default Home;