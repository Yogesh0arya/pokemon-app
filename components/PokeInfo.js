import React from "react";

function PokeInfo({ data }) {
  console.log(data);
  return (
    <div key={data.id}>
      {!data ? (
        ""
      ) : (
        <>
          <h1 className="text-2xl lg:text-4xl font-bold text-center">
            {data.name}
          </h1>
          <img
            className="w-32 h-32 lg:w-48 lg:h-48"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt="img"
          />
          <div className="flex gap-2 flex-wrap">
            {data.abilities.map((poke, i) => {
              return (
                <h2
                  key={i}
                  className="px-2 py-1 text-white bg-blue-400 rounded-lg"
                >
                  {poke.ability.name}
                </h2>
              );
            })}
          </div>
          <div>
            {data.stats.map((poke, i) => {
              return (
                <h3 key={id}>
                  {poke.stat.name}: {poke.base_stat}
                </h3>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default PokeInfo;
