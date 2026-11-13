// import React, { useEffect}  from "react";
// import { Fragment, useState } from "react";
// import PropTypes from "prop-types";
// import { Box, Divider, keyframes, Tab, Tabs } from "@mui/material";
// import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
// import { chunk } from "lodash";
// import { Link } from "react-router-dom";
// import TabPanel from "./TabPanel";

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import Collapse from '@mui/material/Collapse';
// import StarBorder from '@mui/icons-material/StarBorder';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import ListSubheader from '@mui/material/ListSubheader';

// import { RichTreeView } from '@mui/x-tree-view/RichTreeView';




// const initialData = [
//   {
//     title: "HOME",
//     children: [
//       {
//         title: "Manage",
//         type: "multiple",
//         children: [
//           {
//             icon: <ContentPasteSearchIcon />,
//             title: "View",
//           },
//           {
//             icon: <ContentPasteSearchIcon />,
//             title: "Edit",
//           },
//           {
//             icon: <ContentPasteSearchIcon />,
//             title: "New",
//           },
//         ],
//       },
//       {
//         title: "ApplicationAssessment",
//         type: "single",
//         children: [
//           {
//             icon: <ContentPasteSearchIcon fontSize="large" />,
//             title: "ApplicationAssessment",
//           },
//         ],
//       },
//     ],
//   },
// ];

// const scaleAnimation = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   100% {
//     transform: scale(1.05); // Scale to 110% on hover
//   }
// `;
// const Toolbar = ({ data = initialData }) => {
//   const [value, setValue] = useState("HOME");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const [open, setOpen] = useState(false);
//   const [childOpen, setChildOpen] = useState(false);


//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const handleChildClick = () => {
//     setChildOpen(!childOpen);
//   };

//   // const DrawerList = (
//   //   <Box sx={{ width: 250 }} role="presentation" >
//   //     <List
//   //       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//   //       component="nav"
//   //       aria-labelledby="nested-list-subheader"
//   //       subheader={
//   //         <ListSubheader component="div" id="nested-list-subheader">
//   //           Nested List Items
//   //         </ListSubheader>
//   //       }
//   //     >
//   //       {data[0].children.map((item, index) => (
//   //         // <ListItem key={index} disablePadding>
//   //         <>
//   //           <ListItemButton onClick={handleChildClick}>
//   //             <ListItemIcon>
//   //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//   //             </ListItemIcon>
//   //             <ListItemText primary={item.title} />
//   //             {childOpen ? <ExpandLess /> : <ExpandMore />}

//   //           </ListItemButton>
//   //           <Collapse in={childOpen} timeout="auto" unmountOnExit onClick={toggleDrawer(false)}>
//   //       <List component="div" disablePadding>
//   //         <ListItemButton sx={{ pl: 4 }}>
//   //           <ListItemIcon>
//   //             <StarBorder />
//   //           </ListItemIcon>
//   //           <ListItemText primary="Starred" />
//   //         </ListItemButton>
//   //       </List>
//   //     </Collapse>
//   //     </>
//   //         // </ListItem>
//   //       ))}
//   //     </List>
//   //   </Box>
//   // );

//   const MUI_X_PRODUCTS = [
//     {
//       id: 'grid',
//       label: 'Data Grid',
//       children: [
//         { id: 'grid-community', label: '@mui/x-data-grid' },
//         { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
//         { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
//       ],
//     },
//     {
//       id: 'pickers',
//       label: 'Date and Time Pickers',
//       children: [
//         { id: 'pickers-community', label: '@mui/x-date-pickers' },
//         { id: 'pickers-pro', label: '@mui/x-date-pickers-pro' },
//       ],
//     },
//   ];



//   const [ temporaryData, setTemporaryData ] = useState( data[0].children );

//   useEffect(() => {
//     // if (data[0].length > 0) {
//       const updatedData = data[0].children?.map((item) => {
//           return {
//             ...item,
//             id: item.title,
//             label: item.title,
//             children: item?.children?.map((child) => ({
//               ...child,
//               id: child.title,
//               label: child.title
//             }))
//           };
//       });

//       console.log("updatedData",updatedData)

//       setTemporaryData(updatedData);
//     // }
//   }, [data,]);

//   console.log("temporaryData", temporaryData);
//   const getAllItemsWithChildrenItemIds = () => {
//     const itemIds = [];
//     const registerItemId = (item) => {
//       if (item.children?.length) {
//         itemIds.push(item.title);
//         item.children.forEach(registerItemId);
//       }
//     };
  
//     data[0].children.forEach(registerItemId);
  
//     return itemIds;
//   };
  
//     const [expandedItems, setExpandedItems] = useState([]);
  
//     const handleExpandedItemsChange = (event, itemIds) => {
//       setExpandedItems(itemIds);
//     };
  
//     const handleExpandClick = () => {
//       setExpandedItems((oldExpanded) =>
//         oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : [],
//       );
//     };

    

//   const DrawerList = (
//     <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
//       {/* <Box sx={{ mb: 1 }}>
//         <Button onClick={handleExpandClick}>
//           {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
//         </Button>
//       </Box> */}
//       <Box sx={{ minHeight: 200, flexGrow: 1 }}>
//         <RichTreeView
//           items={temporaryData}
//           // expandedItems={expandedItems}
//           // onExpandedItemsChange={handleExpandedItemsChange}
//         />
//       </Box>
//     </Box>
//   );

//   return (
//     <>
//     <Box sx={{ width: "100%" }}>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           sx={{
//             minHeight: "35px",
//             "& .MuiButtonBase-root": {
//               minHeight: "35px",
//             },
//           }}
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//           style={{ display: 'none' }}
//         >
//           {data.map((item) => (
//             <Tab label={item.title} key={item.title} value={item.title} />
//           ))}
//         </Tabs>
//       </Box>
//       {data.map((item) => (
//         <TabPanel key={item.title} value={value} index={item.title} >
//           <Box
//             sx={{
//               flexWrap: "wrap",
//               display: "flex",
//               p: 1,
//               gap: 2,
//             }}
//           >
//             {item.children.map((item2) => (
//               <Fragment key={item2.title}>
//                 <Box
//                   sx={{
//                     flexWrap: "wrap",
//                     flexDirection: "column",
//                     display: "flex",
//                   }}
//                 >
//                   {item2.type === "single" && item2.children.length ? (
//                     <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
//                       {item2.children.map((item3) => (
//                         <Box
//                           key={item3.title}
//                           variant="contained"
//                           {...(item3.onClick && !item3?.disabled
//                             ? {
//                                 onClick: item3.onClick,
//                                 component: Link,
//                               }
//                             : null)}
//                           {...(item3.url && !item3?.disabled
//                             ? {
//                                 component: Link,
//                                 to: item3.url,
//                                 target: "_blank",
//                               }
//                             : null)}
//                           sx={{
//                             flexWrap: "wrap",
//                             flexDirection: "column",
//                             display: "flex",
//                             gap: 1,
//                             color: item3?.disabled
//                               ? "rgba(0, 0, 0, 0.26)"
//                               : "black",
//                             flex: 1,
//                             textDecoration: "none",
//                             ...(item3.width ? { width: item3.width } : null),
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               display: "flex",
//                               flexDirection: "column",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               cursor: "pointer",
//                               transition: "transform 0.3s ease-in-out", // Add a smooth transition for scaling
//                               "&:hover": {
//                                 animation: `${scaleAnimation} 0.3s ease-in-out forwards`, // Apply the scaling animation on hover
//                               },
//                             }}
//                           >
//                             {item3.icon}
//                             <Box sx={{ textAlign: "center" }}>
//                               {" "}
//                               {item3.title}
//                             </Box>
//                           </Box>
//                         </Box>
//                       ))}
//                     </Box>
//                   ) : (
//                     <Box
//                       sx={{
//                         flexWrap: "wrap",
//                         flexDirection: "row",
//                         display: "flex",
//                         gap: 1,
//                         flex: 1,
//                       }}
//                     >
//                       {chunk(item2.children, 3).map((item3) => (
//                         <Box
//                           sx={{
//                             flexWrap: "wrap",
//                             flexDirection: "column",
//                             display: "flex",
//                             gap: 1,
//                           }}
//                         >
//                           {item3.map((item4) => (
//                             <Box
//                               key={item4.title}
//                               {...(item4.onClick && !item4?.disabled
//                                 ? {
//                                     onClick: item4.onClick,
//                                   }
//                                 : null)}
//                               {...(item4.url && !item4?.disabled
//                                 ? {
//                                     component: Link,
//                                     to: item4.url,
//                                     target: "_blank",
//                                   }
//                                 : null)}
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 cursor: "pointer",
//                                 textDecoration: "none",
//                                 color: item4?.disabled
//                                   ? "rgba(0, 0, 0, 0.26)"
//                                   : "black",
//                                 gap: 0.5,
//                                 transition: "transform 0.3s ease-in-out", // Add a smooth transition for scaling
//                                 "&:hover": {
//                                   animation: `${scaleAnimation} 0.3s ease-in-out forwards`, // Apply the scaling animation on hover
//                                 },
//                               }}
//                             >
//                               {item4.icon}
//                               {item4.title}
//                             </Box>
//                           ))}
//                         </Box>
//                       ))}
//                     </Box>
//                   )}

//                   <Box sx={{ textAlign: "center", mt: 1 }}>{item2.title}</Box>
//                   <Divider
//                     orientation="horizontal"
//                     sx={{ borderColor: "#d1abab", mt: 1 }}
//                   />
//                 </Box>
//                 <Divider
//                   orientation="vertical"
//                   flexItem
//                   sx={{ borderColor: "#d1abab" }}
//                 />
//               </Fragment>
//             ))}
//           </Box>
//         </TabPanel>
//       ))}
//     </Box>


// <div>
// <Button onClick={toggleDrawer(true)}>Open drawer</Button>
// <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
//   {DrawerList}
// </Drawer>
// </div>
// </>
//   );
// };

// Toolbar.propTypes = {
//   children: PropTypes.node,
// };

// export default React.memo(Toolbar);


import * as React from "react";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, keyframes, Tab, Tabs } from "@mui/material";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { chunk } from "lodash";
import { Link } from "react-router-dom";
import TabPanel from "./TabPanel";

const initialData = [
  {
    title: "HOME",
    children: [
      {
        title: "Manage",
        type: "multiple",
        children: [
          {
            icon: <ContentPasteSearchIcon />,
            title: "View",
          },
          {
            icon: <ContentPasteSearchIcon />,
            title: "Edit",
          },
          {
            icon: <ContentPasteSearchIcon />,
            title: "New",
          },
        ],
      },
      {
        title: "ApplicationAssessment",
        type: "single",
        children: [
          {
            icon: <ContentPasteSearchIcon fontSize="large" />,
            title: "ApplicationAssessment",
          },
        ],
      },
    ],
  },
];

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05); // Scale to 110% on hover
  }
`;
const Toolbar = ({ data = initialData }) => {
  const [value, setValue] = useState("HOME");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%"}} >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{
            minHeight: "35px",
            "& .MuiButtonBase-root": {
              minHeight: "35px",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.map((item) => (
            <Tab label={item.title} key={item.title} value={item.title} />
          ))}
        </Tabs>
      </Box>
      {data.map((item) => (
        <TabPanel key={item.title} value={value} index={item.title}>
          <Box
            sx={{
              //flexWrap: "wrap",
              display: "flex",
              p: 1,
              gap: 2,
              //overflowX: 'auto', 
              position: '-webkit-sticky',
              position: 'sticky',
            }}
          >
            {item.children.map((item2) => (
              <Fragment key={item2.title}>
                <Box
                  sx={{
                    flexWrap: "wrap",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  {item2.type === "single" && item2.children.length ? (
                    <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
                      {item2.children.map((item3) => (
                        <Box
                          key={item3.title}
                          variant="contained"
                          {...(item3.onClick && !item3?.disabled
                            ? {
                                onClick: item3.onClick,
                                component: Link,
                              }
                            : null)}
                          {...(item3.url && !item3?.disabled
                            ? {
                                component: Link,
                                to: item3.url,
                                target: "_blank",
                              }
                            : null)}
                          sx={{
                            flexWrap: "wrap",
                            flexDirection: "column",
                            display: "flex",
                            gap: 1,
                            color: item3?.disabled
                              ? "rgba(0, 0, 0, 0.26)"
                              : "black",
                            flex: 1,
                            width: item3.title.length * 10,
                            textDecoration: "none",
                            ...(item3.width ? { width: item3.width } : null),
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              transition: "transform 0.3s ease-in-out", // Add a smooth transition for scaling
                              "&:hover": {
                                animation: `${scaleAnimation} 0.3s ease-in-out forwards`, // Apply the scaling animation on hover
                              },
                            }}
                          >
                            {item3.icon}
                            <Box sx={{ textAlign: "center" }}>
                              {" "}
                              {item3.title}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        flexWrap: "wrap",
                        flexDirection: "row",
                        display: "flex",
                        gap: 1,
                        flex: 1,
                      }}
                    >
                      {chunk(item2.children, 3).map((item3) => (
                        <Box
                          sx={{
                            flexWrap: "wrap",
                            flexDirection: "column",
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          {item3.map((item4) => (
                            <Box
                              key={item4.title}
                              {...(item4.onClick && !item4?.disabled
                                ? {
                                    onClick: item4.onClick,
                                  }
                                : null)}
                              {...(item4.url && !item4?.disabled
                                ? {
                                    component: Link,
                                    to: item4.url,
                                    target: "_blank",
                                  }
                                : null)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                textDecoration: "none",
                                color: item4?.disabled
                                  ? "rgba(0, 0, 0, 0.26)"
                                  : "black",
                                gap: 0.5,
                                transition: "transform 0.3s ease-in-out", // Add a smooth transition for scaling
                                "&:hover": {
                                  animation: `${scaleAnimation} 0.3s ease-in-out forwards`, // Apply the scaling animation on hover
                                },
                              }}
                            >
                              {item4.icon}
                              {item4.title}
                            </Box>
                          ))}
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box sx={{ textAlign: "center", mt: 1 }}>{item2.title}</Box>
                  <Divider
                    orientation="horizontal"
                    sx={{ borderColor: "#d1abab", mt: 1 }}
                  />
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: "#d1abab" }}
                />
              </Fragment>
            ))}
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Toolbar);
