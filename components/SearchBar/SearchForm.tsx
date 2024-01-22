"use client";
import { FunctionComponent, useRef, useState } from "react";
import { translateFunc } from "./translateFunc";

interface SearchFormProps {}

const SearchForm: FunctionComponent<SearchFormProps> = () => {
  const [caseName, setCaseName] = useState("I 2 C 24/97");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <section className="flex items-center justify-center gap-4">
        <button
          className="w-36 rounded-lg  bg-amber-700 px-8 py-2 text-white"
          onClick={() => setCaseName("I 2 C 24/97")}
        >
          Reset
        </button>
        <search>
          <form>
            <label>
              <input
                ref={inputRef}
                onChange={(e) => setCaseName(e.target.value)}
                value={caseName}
                className="border-4 border-solid border-red-950 uppercase"
                type="text"
              ></input>
            </label>
          </form>
        </search>
        <button
          className="w-36 rounded-lg  bg-red-700 px-8 py-2 text-white"
          onClick={() => setCaseName("")}
        >
          X
        </button>
      </section>

      <ul className="min-h-40">
        {translateFunc(caseName).map((val) => {
          return (
            <li className="pb-3 text-center" key={val[0]}>
              <div className="font-bold">{`${val[0]}`}</div>
              <div>{` ${val[1]}`}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchForm;
