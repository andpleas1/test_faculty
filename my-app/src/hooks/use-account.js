
import React, { useEffect, useState } from "react";
import Web3 from "web3"

export function useAccount() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      console.log(window.ethereum);
      const web3 = new Web3(window.ethereum);
      setAccount(web3);
    }
    else {
    }
  }, [])

  return {
    account
  }
}

export default useAccount;