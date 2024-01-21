"use client";
import { FunctionComponent, useRef, useState } from "react";
import { translateFunc } from "./translateFunc";

interface SearchFormProps {}

const SearchForm: FunctionComponent<SearchFormProps> = () => {
  const [caseName, setCaseName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full">
      <section className="flex items-center justify-center">
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
        <button className="m-4 bg-red-600 px-4" onClick={() => setCaseName("")}>
          X
        </button>
      </section>
      <ul className="min-h-40 w-full pl-40">
        {translateFunc(caseName).map((val) => {
          return (
            <li key={val[0]}>
              <div>{`${val[0]}: ${val[1]}`}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchForm;
