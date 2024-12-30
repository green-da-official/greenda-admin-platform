// components/Layout.tsx
import React, { ReactNode } from "react";

// import styles from "../styles/layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <div className={styles.layout}>
    //   <div className={styles.mainContent}>
    //     <main className={styles.content}>{children}</main>

    //   </div>
    // </div>
    <div>
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
