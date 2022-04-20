import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import PokeInfo from "./PokeInfo";
import { SearchIcon } from "@heroicons/react/outline";

function Main() {
  const [inputData, setInputData] = useState("");
  const [searchData, setSearchData] = useState();
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    // console.log(res.data.results)
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
    // console.log(pokeData)
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      // console.log(result.data)
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="relative lg:col-span-3 h-screen overflow-y-scroll  scrollbar-hide">
        <div className="fixed flex items-center justify-center top-0 left-0 right-0 h-16 shadow-md bg-white">
          <div className="p-2 rounded-full border border-gray-200 flex items-center">
            <input
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Search"
              className="outline-none"
            />
            <button
              onClick={async () => {
                setSearchData(inputData);
                if (inputData != "") {
                  const update = await axios
                    .get(
                      `https://pokeapi.co/api/v2/pokemon/${inputData?.toLowerCase()}`
                    )
                    .catch((err) => alert(err.message));
                  //   console.log(update);

                  setPokeDex(update.data);
                  setInputData("");
                }
              }}
            >
              <SearchIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 p-5 pt-24">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />
        </div>
      </div>

      <div className="pt-24 p-5 flex flex-col justify-between">
        <PokeInfo data={pokeDex} />
        <div className="flex space-x-3">
          {prevUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(prevUrl);
              }}
              className="px-3 py-1 bg-red-400 text-white rounded-md "
            >
              previous
            </button>
          )}
          {nextUrl && (
            <button
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}
              className="px-3 py-1 bg-red-400 text-white rounded-md "
            >
              next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
