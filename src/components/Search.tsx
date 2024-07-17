"use client";
import { FiSearch } from "react-icons/fi";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useState } from "react";

const Search = ({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <form className="flex items-center relative w-full max-w-[320px]">
      {!focus && <FiSearch size={20} className="absolute ml-3 opacity-50" />}
      <Input
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="border-none bg-primary/40 focus:px-3 px-10"
        placeholder="Search"
      />
    </form>
  );
};

export default Search;
