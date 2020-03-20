import React, {useState} from "react";

import {Box, Image, ResponsiveContext} from "grommet";
//import {NavBar} from "@centrifuge/axis-nav-bar";
import {NavBar} from "./navbar"
import {MenuItem} from "@centrifuge/axis-nav-bar";
import {Menu as MenuIcon, User as UserIcon, Close as CloseIcon} from "grommet-icons";
import Search from "../Search";
import styled from "styled-components";
import {navigate} from "gatsby";
const wordmark = require("../../images/centrifuge-developer-wordmark.svg")as string;


const Logo = styled(Image)`
  vertical-align: middle;
  height: 32px;
  margin: 16px 0;
`;

const Nav = (props) => {
    const [selectedRoute, setSelectedRoute] = useState("/");
    const [searchOpen, setSearchOpen] = React.useState(false);

    const menuItems: MenuItem[] = [
        {
            label: "Centrifuge P2P Node",
            route: "/cent-node/"
        },
        {
            label: "Tinlake",
            route: "/tinlake/"
        },
        {
            label: "NFTs",
            route: "/nfts/overview/introduction/"
        },
        {
            label: 'Centrifuge Chain',
            route: "/chain/"
        }, {
            label: 'Github',
            route: "https://github.com/centrifuge"
        }, {
            label: 'Slack',
            route: "https://centrifuge.io/slack/"
        }
    ];
    const onRouteClick = (route) => {
        setSelectedRoute(route);
        if (route.startsWith('/')) {
            navigate(route);
        } else {
            window.open(route);
        }
    };
    const theme = {
        navBar: {
            icons: {
                menu: MenuIcon,
                close: CloseIcon,
                user: UserIcon
            }
        }
    };

    return (
        <ResponsiveContext.Consumer>
            {size => size !== "small" ? 
            <Box direction="row" 
            fill="horizontal"
            align="stretch"
            width="xxlarge" > 
                <NavBar 
                        pad={"medium"}
                        margin={{"right":"medium"}}
                        logo={<Logo src={wordmark}                    
                        onClick={ () => { onRouteClick('/') }       
                        }/>}
                        mainMenuAlignment="right"
                        border={false}
                        menuItems={menuItems}
                        theme={theme}
                        selectedRoute={selectedRoute}
                        onRouteClick={
                            (item : MenuItem) => {
                                onRouteClick(item.route);
                            }
                        }
                        overlayWidth="100vw"
                        >
                    <Box style={{minHeight: '48px', padding: '12px'}} flex={false}>
                        <Search open={searchOpen} setOpen={value => setSearchOpen(value)}/>
                    </Box>                                              
                    
                </NavBar>
            </Box>
            : 
            <Box direction="row" 
            fill="horizontal"
            align="stretch"
            width="xxlarge" > 
                <Logo margin={{"left":"medium"}} src={wordmark}                    
                            onClick={ () => { onRouteClick('/') }       
                            }/>
                <Box style={{minHeight: '48px', padding: '12px'}} flex={true} alignContent="end">
                    <Search open={searchOpen} setOpen={value => setSearchOpen(value)}/>
                </Box>    
                <NavBar 
                        pad={"medium"}
                        margin={{"right":"medium"}}

                        mainMenuAlignment="right"
                        border={false}
                        menuItems={menuItems}
                        theme={theme}
                        selectedRoute={selectedRoute}
                        onRouteClick={
                            (item : MenuItem) => {
                                onRouteClick(item.route);
                            }
                        }
                        overlayWidth="100vw"
                        >
                </NavBar>
            </Box>
            }
        </ResponsiveContext.Consumer>
    );
};

export default Nav;
