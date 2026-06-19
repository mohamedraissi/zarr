"use client";
import dynamic from "next/dynamic";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import {  usePathname, useSearchParams } from "next/navigation";
import { useContext, useMemo } from "react";
import { headerOptionsMap } from "../../data/LayoutData";

const StandardHeader = dynamic(() => import('./StandardHeader'));
const MinimalHeader = dynamic(() => import('./MinimalHeader'));
const BasicHeader = dynamic(() => import('./BasicHeader'));
const ClassicHeader = dynamic(() => import('./ClassicHeader'));

const MainHeader = () => {
  const path = useSearchParams()
  const theme = path.get('theme')
  const pathName = usePathname()
  const { themeOption ,isCairoThemeActive } = useContext(ThemeOptionContext);

  const headerList = {
    basic_header: <BasicHeader extraClass={theme == "tokyo" ? true : ""} headerClass={theme == 'cairo' ? 'header-gradient' : isCairoThemeActive && theme === null && pathName === "/" ? "header-gradient":""}/>,
    classic_header: <ClassicHeader  headerClass={theme == 'cairo' ? 'header-gradient' : isCairoThemeActive && theme === null && pathName === "/" ? "header-gradient":""}/>,
    minimal_header: <MinimalHeader headerClass={theme == 'cairo' ? 'header-gradient' : isCairoThemeActive && theme === null && pathName === "/" ? "header-gradient":""}/>,
    standard_header: <StandardHeader  headerClass={theme == 'cairo' ? 'header-gradient' : isCairoThemeActive && theme === null && pathName === "/" ? "header-gradient":""}/>,
  };

  const showHeader = useMemo(() => {
    return headerOptionsMap[theme] || themeOption?.header?.header_options;
  }, [theme, themeOption?.header?.header_options]);
  
  return headerList[showHeader] || <BasicHeader />
};  

export default MainHeader;