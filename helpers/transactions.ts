const dataFetcher = async () => {
  const response = await fetch("./data/complicated-ledger.json", {
    cache: "no-store",
  });

  return response.json();
};

export default dataFetcher;
