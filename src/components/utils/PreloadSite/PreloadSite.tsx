import React, { FC } from "react";
import styles from "./Loader.module.css";

export const PreloadSite: FC = () => {
  return (
    <div className="flex justify-center py-[250px]">
      <span className={styles.loader}></span>
    </div>
  );
};
