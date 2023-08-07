import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FilterBy = ({ filterBy, updateFilterBy }) => {
  return (
    <div className="flex flex-row justify-end border items-center shadow-sm border-zinc-700 rounded-sm mb-4 py-2 md:py-4 w-full">
      <h4 className="md:text-base text-sm absolute left-2">
        Filter
      </h4>
      <select
        className="bg-inherit md:text-base text-sm py-1 mx-2 leading-tight focus: hover:cursor-pointer rounded ease"
        id="filter"
        value={filterBy.skillQuery}
        onChange={e =>
          updateFilterBy({ ...filterBy, skillQuery: e.target.value })
        }>
        <option className="bg-zinc-900 " value="">
          None
        </option>
        <option className="bg-zinc-900 " value="Mobile Dev">
          Mobile Dev
        </option>
        <option className="bg-zinc-900" value="Data Science">
          Data Science
        </option>
        <option className="bg-zinc-900" value="UX">
          UX
        </option>
        <option className="bg-zinc-900" value="Cyber Security">
          Cyber Security
        </option>
        <option className="bg-zinc-900" value="Game Dev">
          Game Dev
        </option>
        <option className="bg-zinc-900" value="Web Dev">
          Web Dev
        </option>
      </select>
      <select
        className="bg-inherit md:text-base text-sm mx-2 leading-tight focus: hover:cursor-pointer rounded ease"
        id="filter"
        value={filterBy.levelQuery}
        onChange={e =>
          updateFilterBy({ ...filterBy, levelQuery: e.target.value })
        }>
        <option className="bg-zinc-900 " value="">
          None
        </option>
        <option className="bg-zinc-900 " value="Beginner">
          Beginner
        </option>
        <option className="bg-zinc-900" value="Intermediate">
          Intermediate
        </option>
        <option className="bg-zinc-900" value="Advanced">
          Advanced
        </option>
      </select>
    </div>
  );
};

export default FilterBy;
