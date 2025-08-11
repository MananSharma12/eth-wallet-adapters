import './App.css'
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

const queryClient = new QueryClient();

async function getBalance() {
  const client = createPublicClient({
    chain: mainnet,
    transport: http()
  })

  const res = await client.getBalance({ address: "0x6208c4D6847ac839AA5eB04E535a934a5CF28D2F" });
  console.log(res);
}

const useBalance = () => useQuery({ queryKey: ['balance'], queryFn: getBalance, refetchInterval: 10 * 1000});

function Balance() {
  const { data, isLoading, isError } = useBalance();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching balance</div>
  }

  return (
    <div>
      Balance: {data}
    </div>
  )
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <button onClick={getBalance}>Get Balance</button>
        <Balance />
      </QueryClientProvider>
    </>
  )
}

export default App
