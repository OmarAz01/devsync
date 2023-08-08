import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CircumIcon from '@klarr-agency/circum-icons-react';

const ProfileView = ({ user, createAlert }) => {
  const currUser = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState(user.bio || '');
  const [level, setLevel] = useState('');
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (user.level) setLevel(user.level);
    if (user.skill) setSkills(user.skill.split(', '));
  }, [user]);

  const handleEditBio = () => {
    if (editBio === false) {
      setBio(user.bio);
      setEditBio(true);
      return;
    }
    if (editBio === true) {
      if (bio === user.bio || bio === '' || bio === null) {
        setBio(user.bio);
        setEditBio(false);
        return;
      }
      axios
        .put(BASE_URL + `/api/user/${currUser.userId}/bio`, bio, {
          headers: {
            Authorization: `Bearer ${currUser.jwt}`,
            'Content-Type': 'text/plain'
          }
        })
        .then(res => {
          user.bio = bio;
          createAlert('Bio updated!', 'success');
          setEditBio(false);
        })
        .catch(err => {
          createAlert('Bio update failed!', 'error');
          console.log(err);
        });
    }
  };

  const handleLevelChange = () => {
    if (level === user.level || level === '' || level === null) {
      return;
    }
    axios
      .put(BASE_URL + `/api/user/${currUser.userId}/level`, level, {
        headers: {
          Authorization: `Bearer ${currUser.jwt}`,
          'Content-Type': 'text/plain'
        }
      })
      .then(res => {
        user.level = level;
        createAlert('Level updated!', 'success');
        setLevel(level);
      })
      .catch(err => {
        createAlert('Level update failed!', 'error');
        console.log(err);
      });
  };

  const handleSkillChange = skill => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
      return;
    }
    setSkills([...skills, skill]);
  };

  const handleSkillsSubmit = () => {
    const skillString = skills.join(', ');
    if (
      skillString === user.skill ||
      skillString === '' ||
      skillString === null
    ) {
      return;
    }
    axios
      .put(
        BASE_URL + `/api/user/${currUser.userId}/skill`,
        skillString,
        {
          headers: {
            Authorization: `Bearer ${currUser.jwt}`,
            'Content-Type': 'text/plain'
          }
        }
      )
      .then(res => {
        user.skill = skillString;
        createAlert('Skills updated!', 'success');
      })
      .catch(err => {
        createAlert('Skills update failed!', 'error');
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex flex-col p-1">
        {/* About me section */}
        <div className="flex flex-row border-b justify-between pb-2 ">
          <h4 className="md:text-xl text-lg text-left">About Me</h4>
          <button
            className="bg-zinc-700 rounded-md px-4 hover:cursor-pointer py-1 hover:bg-blue-500"
            onClick={handleEditBio}>
            Edit
          </button>
        </div>
        {user.bio === null && editBio === false ? (
          <p className="text-neutral-100 italic mt-3 text-left md:h-56 h-44">
            Add a bio{' '}
          </p>
        ) : editBio === false ? (
          <p className="text-neutral-100 mt-4 text-left md:h-56 h-44">
            {user.bio}
          </p>
        ) : editBio === true ? (
          <textarea
            maxLength={750}
            minLength={2}
            value={bio}
            autoFocus
            onChange={e => setBio(e.target.value)}
            className="flex flex-col md:h-56 h-44 max-w-full relative rounded-lg bg-inherit resize-none pb-2 pt-4 outline-none text-xs md:text-base"></textarea>
        ) : null}
        <div className="flex flex-row justify-between border-b pb-2 mt-4">
          {/* Skills section */}
          <h4 className="md:text-xl text-lg ">Skills</h4>
          <div className="flex flex-row">
            <select
              required
              id="skills"
              value={skills.at(-1)}
              onChange={e => {
                handleSkillChange(e.target.value);
              }}
              className="w-auto h-auto px-2 bg-neutral-900 flex md:text-base text-xs leading-tight focus:outline-none hover:cursor-pointer focus:shadow-outline rounded ease">
              <option value="Web Dev">Web Dev</option>
              <option value="Mobile Dev">Mobile Dev</option>
              <option value="Data Science">Data Science</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Game Dev">Game Dev</option>
            </select>
            <button
              className="bg-zinc-700 rounded-md px-4 ml-4 hover:cursor-pointer py-1 hover:bg-blue-500"
              onClick={handleSkillsSubmit}>
              Save
            </button>
          </div>
        </div>

        <div className="flex flex-row w-full flex-wrap justify-start items-left mt-4 h-24">
          {skills !== undefined &&
          skills !== null &&
          skills.length !== 0 ? (
            skills.map(skill => (
              <h4
                onClick={() => handleSkillChange(skill)}
                key={skill}
                className="flex items-center flex-row md:text-base text-sm w-fit mr-2 mt-1 h-fit rounded-md bg-zinc-700 px-2 py-1
                    hover:bg-red-500 hover:cursor-pointer">
                {skill + ' |'}&nbsp;
                <CircumIcon size="22px" name="square_remove" />
              </h4>
            ))
          ) : (
            <p className="text-neutral-100 italic text-left md:h-56 h-44">
              Add skills to your profile
            </p>
          )}
        </div>
        <div className="flex flex-row border-b justify-between pb-2 mt-4">
          {/* Level section */}
          <h4 className="md:text-xl text-lg text-left ">Level</h4>
          <button
            onClick={handleLevelChange}
            className="bg-zinc-700 rounded-md px-4 hover:cursor-pointer py-1 hover:bg-blue-500">
            Save
          </button>
        </div>
        <label
          htmlFor="Beginner"
          className="text-left mt-4 text-base md:text-lg">
          <input
            onChange={() => setLevel('Beginner')}
            type="radio"
            name="level"
            value="Beginner"
            className="mt-4 mr-2"
            checked={level === 'Beginner'}
          />
          Beginner - If you are new to coding and are building your
          first project
        </label>
        <label
          htmlFor="Beginner"
          className="text-left mt-4 text-base md:text-lg">
          <input
            onChange={() => setLevel('Intermediate')}
            type="radio"
            name="level"
            value="Intermediate"
            className="mt-4 mr-2"
            checked={level === 'Intermediate'}
          />
          Intermediate - If you have some experience with coding and
          building projects
        </label>
        <label
          htmlFor="Beginner"
          className="text-left mt-4 text-base md:text-lg">
          <input
            onChange={() => setLevel('Advanced')}
            type="radio"
            name="level"
            value="Advanced"
            className="mt-4 mr-2"
            checked={level === 'Advanced'}
          />
          Advanced - If you have a lot of experience with coding or
          have experience in the field and you're looking to build a
          complex project
        </label>
      </div>
    </>
  );
};

export default ProfileView;
