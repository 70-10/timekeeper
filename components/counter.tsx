import React from "react";
import { NextComponentType } from "next";
import numeral from "numeral";
import { useCounterItem } from "../app/store";
import { useDispatch } from "react-redux";
import counterModule, { startTime } from "../app/modules/counter";

const Counter: NextComponentType = () => {
  const { count, pause } = useCounterItem();
  const dispatch = useDispatch();

  return (
    <>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">{numeral(count).format("00:00:00")}</h1>
            <div className="buttons is-centered">
              {pause ? (
                <button className="button is-link" onClick={() => dispatch(startTime())}>
                  Start
                </button>
              ) : (
                <button className="button" onClick={() => dispatch(counterModule.actions.stop())}>
                  Pause
                </button>
              )}
            </div>
            <div className="buttons has-addons is-centered">
              <button className="button" onClick={() => dispatch(counterModule.actions.add(1))}>
                + 1 second
              </button>
              <button className="button" onClick={() => dispatch(counterModule.actions.add(1 * 60))}>
                + 1 minute
              </button>
              <button className="button" onClick={() => dispatch(counterModule.actions.add(1 * 60 * 60))}>
                + 1 hour
              </button>
            </div>
            <div className="buttons has-addons is-centered">
              <button className="button" onClick={() => dispatch(counterModule.actions.add(-1))}>
                - 1 second
              </button>
              <button className="button" onClick={() => dispatch(counterModule.actions.add(-1 * 60))}>
                - 1 minute
              </button>
              <button className="button" onClick={() => dispatch(counterModule.actions.add(-1 * 60 * 60))}>
                - 1 hour
              </button>
            </div>
            <button className="button" onClick={() => dispatch(counterModule.actions.setCount(0))}>
              Clear
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Counter;
