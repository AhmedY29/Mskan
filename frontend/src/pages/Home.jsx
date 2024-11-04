import * as React from "react";
import Content2 from '../components/Content2.jsx';
import { usePropertiesStore } from "../store/propertiesStore.js";
import { useEffect } from "react";
export default function Home() {
  // const {getProperties} = usePropertiesStore()
  // // useEffect(()=>{
  // //   getProperties()
  // // },[getProperties])
  return (
    <div style={{direction:'rtl'}}>
      <Content2/>
    </div>
  );
}
