import React from "react";
import { MessageNotification } from "../MessageNotification";
import { Outlet } from "react-router-dom";
import { CustomBreadcrumb } from "../CustomBreadcrumb";

export const AccountHome = () => {
  return (
    <>
      <CustomBreadcrumb />
      <main className="d-flex">
        <Outlet />
      </main>
      <MessageNotification />
    </>
  );
};
