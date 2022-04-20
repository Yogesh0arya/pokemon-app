import React from "react";

function Card({ pokemon, loading, infoPokemon }) {
  //   console.log(pokemon);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <>
              <div
                key={item.id}
                onClick={() => infoPokemon(item)}
                className="p-3 flex flex-col lg:flex-row items-center justify-around rounded-md bg-blue-200"
              >
                <h1 className="text-xl lg:text-2xl">{item.id}</h1>
                <img
                  className="w-24 h-24 lg:w-28 lg:h-28"
                  src={item.sprites.front_default}
                  alt="img"
                />
                <h1 className="text-xl lg:text-2xl capitalize">{item.name}</h1>
              </div>
            </>
          );
        })
      )}
    </>
  );
}

export default Card;
