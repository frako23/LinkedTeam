import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { First } from "../component/first";
import { Second } from "../component/second";
import { Third } from "../component/third";
import { Fourth } from "../component/fourth";
import { Fifth } from "../component/fifth";
import { Login } from "../component/login";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <First />
      <Login />
      <Second />
      <Third />
      <Fourth />
      <Fifth />
    </div>
  );
};
