import { FC, useState, useEffect, Fragment } from "react";

import { Watch } from "react-loader-spinner";

import { CharTypes } from "../../types";
import "./styles.css";

interface CharacterProps {
  apiArr: string[];
}

export const Character: FC<CharacterProps> = ({ apiArr }) => {
  const [charInfo, setCharInfo] = useState<CharTypes[]>([]);
  const [isLoading, setIsLaoding] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("all");

  const handleSetGender = (e: any) => {
    setGender(e.target.value);
  };

  const handleIsArrSorted = () => setIsSorted(!isSorted);

  const getCharInfo = async () => {
    if (apiArr) {
      setIsLaoding(true);
      Promise.all(
        apiArr.map((url: string) =>
          fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .catch((error) => {
              console.log("There was a problem!", error);
              setIsLaoding(false);
            })
        )
      ).then((data) => {
        setCharInfo(data);
        setIsLaoding(false);
      });
    }

    function checkStatus(response: any) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    function parseJSON(response: any) {
      return response.json();
    }
  };
  useEffect(() => {
    getCharInfo();
  }, [apiArr]);

  const heightSum = () =>
    charInfo.reduce(
      (prev: number, cur: CharTypes) => prev + parseInt(cur.height, 10),
      0
    );

  const sortGender = (gender: string) =>
    charInfo.filter((cur: CharTypes) => cur.gender === gender);

  return (
    <Fragment>
      {isLoading ? (
        <div>
          <Watch ariaLabel="loading-indicator" color="yellow" />
        </div>
      ) : (
        <Fragment>
          {gender === "all" && charInfo.length !== 0 ? (
            <Fragment>
              <table className="table">
                <thead onClick={handleIsArrSorted}>
                  <tr className="table-header">
                    <th>Name</th>
                    <th>Height</th>
                    <th>Gender</th>
                    <th>
                      <select
                        className="table-select"
                        onChange={handleSetGender}
                        value={gender}
                      >
                        <option value={"all"}>all</option>
                        <option value={"Male"}>male</option>
                        <option value={"Female"}>Female</option>
                      </select>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {charInfo.map((cur: CharTypes) => (
                    <Fragment key={cur.name}>
                      <tr>
                        <td>{cur.name}</td>
                        <td>{cur.height}</td>
                        <td>{cur.gender === "male" ? "M" : "F"}</td>
                      </tr>
                    </Fragment>
                  ))}
                  <tr>
                    <td>char num: {charInfo.length}</td>
                    <td>
                      total height: {heightSum()}cm ({heightSum() * 0.032808}in)
                    </td>
                  </tr>
                </tbody>
              </table>
            </Fragment>
          ) : null}

          {gender !== "all" && charInfo.length !== 0 ? (
            <Fragment>
              <table className="table">
                <thead onClick={handleIsArrSorted}>
                  <tr className="table-header">
                    <th>Name</th>
                    <th>Height</th>
                    <th>Gender</th>
                    <th>
                      <select
                        className="table-select"
                        onChange={handleSetGender}
                        value={gender}
                      >
                        <option value={"all"}>all</option>
                        <option value={"male"}>male</option>
                        <option value={"female"}>Female</option>
                      </select>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortGender(gender).map((cur: CharTypes) => (
                    <Fragment key={cur.name}>
                      <tr>
                        <td>{cur.name}</td>
                        <td>{cur.height}</td>
                        <td>{cur.gender === "male" ? "M" : "F"}</td>
                      </tr>
                    </Fragment>
                  ))}
                  <tr>
                    <td>char num: {charInfo.length}</td>
                    <td>
                      total height: {heightSum()}cm ({heightSum() * 0.032808}in)
                    </td>
                  </tr>
                </tbody>
              </table>
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export { Character as default };
