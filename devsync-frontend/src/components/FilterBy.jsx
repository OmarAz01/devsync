import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FilterBy = ({ updatePostsWithFilter }) => {
  const [filterBy, setFilterBy] = useState({
    skillQuery: '',
    levelQuery: ''
  });
  const [secondRender, setSecondRender] = useState(false);
  const BASE_URL = 'http://localhost:8080';

  const handleFilterChange = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/posts/query`,
        filterBy
      );
      if (response.status === 200) {
        updatePostsWithFilter(response.data);
        console.log(response.data);
        console.log(filterBy);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // This is to prevent the filter from running on the first render
    if (!secondRender) {
      setSecondRender(true);
    }
    if (
      filterBy.skillQuery === '' &&
      filterBy.levelQuery === '' &&
      !secondRender
    ) {
      return;
    } else {
      handleFilterChange();
    }
  }, [filterBy]);

  return (
    <div className="flex flex-row justify-end border items-center shadow-sm border-zinc-700 rounded-sm py-4 w-full">
      <h4 className="text-sm absolute left-2">Filter</h4>
      <select
        className="bg-inherit text-sm py-1 mx-2 leading-tight focus: hover:cursor-pointer rounded ease"
        id="filter"
        value={filterBy.skillQuery}
        onChange={e => {
          setFilterBy({
            ...filterBy,
            skillQuery: e.target.value
          });
        }}>
        <option className="bg-zinc-900 " value="">
          None
        </option>
        <option className="bg-zinc-900 " value="Mobile Dev">
          Mobile Dev
        </option>
        <option className="bg-zinc-900" value="Data Science">
          Data Science
        </option>
        <option className="bg-zinc-900" value="UI/UX">
          UI/UX
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
        className="bg-inherit text-sm mx-2 leading-tight focus: hover:cursor-pointer rounded ease"
        id="filter"
        value={filterBy.levelQuery}
        onChange={e => {
          setFilterBy({
            ...filterBy,
            levelQuery: e.target.value
          });
        }}>
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
