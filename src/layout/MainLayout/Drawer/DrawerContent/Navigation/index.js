// material-ui
import {
  Backdrop,
  Box,
  CircularProgress,
  Portal,
  Typography,
} from "@mui/material";

import NavGroup from "./NavGroup";
import menuItem from "../../../../../menu-items";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";

const icons = {
  ProfileOutlined,
};

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const items = cloneDeep(menuItem.items);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // if (isLoading) {
  //   return (
  //     <Portal container={document.body}>
  //       <Backdrop sx={{ color: "#fff", zIndex: 1500 }} open={true}>
  //         <CircularProgress color="inherit" />
  //       </Backdrop>
  //     </Portal>
  //   );
  // }

  // if (applicationSetups.length) {
  //   for (const category of applicationSetups) {
  //     items
  //       ?.find((item) => item.id === "group-dashboard")
  //       ?.children?.find((item) => item.id === "credit-management")
  //       ?.children?.unshift({
  //         id: category.uuid,
  //         title: category?.name,
  //         permission: "CreditProjectCategoryMenu",
  //         icon: icons.ProfileOutlined,
  //         url: `/CreditManagement/Application/${category?.name}/${category.id}/dashboard`,
  //       });
  //   }
  // }

  // if (applicationSetups.length) {
  //   for (const category of applicationSetups) {
  //     // Apply specific condition for CMCO group
  //     if ((user?.user_group === "CMCO" ?? "Agent") && category.mob_status === 1) {
  //       items
  //         ?.find((item) => item.id === "group-dashboard")
  //         ?.children?.find((item) => item.id === "credit-management")
  //         ?.children?.unshift({
  //           id: category.uuid,
  //           title: category?.name,
  //           permission: "CreditProjectCategoryMenu",
  //           icon: icons.ProfileOutlined,
  //           url: `/CreditManagement/Application/${category?.name}/${category.id}/dashboard`,
  //         });
  //     }

  //     // For non-CMCO users, simply add the menu item without conditions
  //     if (user?.user_group !== "CMCO" && user?.user_group !== "Agent") {
  //       items
  //         ?.find((item) => item.id === "group-dashboard")
  //         ?.children?.find((item) => item.id === "credit-management")
  //         ?.children?.unshift({
  //           id: category.uuid,
  //           title: category?.name,
  //           permission: "CreditProjectCategoryMenu",
  //           icon: icons.ProfileOutlined,
  //           url: `/CreditManagement/Application/${category?.name}/${category.id}/dashboard`,
  //         });
  //     }
  //   }
  // }

  const navGroups = items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
