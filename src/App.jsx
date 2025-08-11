import './App.css'
import { createConfig, http, useAccount, useBalance, useConnect, useSendTransaction, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "wagmi/chains"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  }
})

function MyAddress() {
  const { address } = useAccount()
  const balance = useBalance({ address })

  return <div>
    {address}
    Balance: {balance?.data?.formatted}
  </div>
}

function WalletConnector () {
  const { connectors, connect } = useConnect()

  return connectors.map(connector => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

function EthSend() {
  const { data, sendTransaction } = useSendTransaction()

  function sendEth() {
    console.log("Clicked!")
    const txn = sendTransaction({
      to: document.getElementById('address').value,
      value: '1000000000000000',
    })

    console.log(txn)
  }

  return <div>
    <input id="address" type="text" placeholder="Address"></input>
    <button onClick={sendEth}>Send 0.1 ETH</button>
    {data}
  </div>
}

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <MyAddress />
          <WalletConnector />
          <EthSend />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default App
