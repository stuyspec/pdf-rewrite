import { useState } from "react";
import { useNavigate } from "react-router";

export default function VolIssSearchHero() {
  const navigate = useNavigate();
  const [volume, setVolume] = useState<string>();
  const [issue, setIssue] = useState<string>();
  const [problem, setProblem] = useState<string>();

  function submit(e: { preventDefault: () => void }) {
    e.preventDefault();
    let url;
    if (Number.isNaN(Number(volume))) {
      setProblem("Volume must be a number.");
      return;
    } else if (Number.isNaN(Number(issue)) && issue !== undefined) {
      setProblem("Issue must be a number.");
      return;
    } else if (issue === undefined) url = `/archive/${volume}`;
    else url = `/archive/${volume}/${issue}`;
    navigate(url);
  }
  return (
    <div>
      <form className="flex justify-center gap-x-1">
        <label htmlFor="volume-button-hero" className="hidden">
          Input the volume number.
        </label>
        <input
          type="number"
          placeholder="Volume"
          name="volume-hero"
          value={volume}
          onChange={(e) => {
            setVolume(e.target.value);
          }}
          aria-describedby="volume-button-hero"
          className="input w-2/10
              focus:outline-0
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <label htmlFor="issue-button-hero" className="hidden">
          Input the issue number.
        </label>
        <input
          type="number"
          placeholder="Issue"
          name="issue-hero"
          value={issue}
          onChange={(e) => {
            setIssue(e.target.value);
          }}
          aria-describedby="issue-button-hero"
          className="input w-2/10
              focus:outline-0
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button type="submit" className="btn" onClick={submit}>
          Search
        </button>
      </form>
      <p className="text-center text-error">{problem}</p>
    </div>
  );
}
