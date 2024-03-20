import React from "react";
import classes from './style.module.css';

const PageNotFound = () => {
  return (
    <div>
      <section className={classes.page_404}>
        <div className={classes.container}>
          <div className={classes.row}>
            <div className={classes["col-sm-12"]}>
              <div className={`${classes["col-sm-10"]} ${classes["col-sm-offset-1"]} text-center`}>
                <div className={classes.four_zero_four_bg}>
                  <h1 className="text-center">404</h1>
                </div>

                <div className={classes.contant_box_404}>
                  <h3 className={classes.h2}>Look like you're lost</h3>

                  <p>the page you are looking for not available!</p>

                  <a href="/" className={classes.link_404}>
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
