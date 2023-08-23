import{j as t}from"./jsx-runtime-4ca860c5.js";import{r as o}from"./index-61bf1805.js";import{n as a,D as W,T as A,a as Y,C as R}from"./index-78f95b87.js";import"./_commonjsHelpers-de833af9.js";import"./extends-35d9a1b8.js";function r({slotWidth:n=62,slotHeight:g=18,slotsMarginTop:x=11,slotsMarginLeft:h=20,maxWidth:S="546px",maxHeight:F="452px",defaultSlotColor:y="#FFFFFF",selectedSlotColor:C="#b3c6d3",disabledSlotColor:D="#e1e1e1",hoveredSlotColor:M="#eef2f6",slotsContainerBorder:v="1px solid #8c8d94",slotsContainerBorderRadius:b="0px",dateFormat:T="MM.DD",timeFormat:H="HH:mm A"}){const e=new Date,[s,j]=o.useState("11:00"),[i,q]=o.useState("19:00"),[d,w]=o.useState(30),[m,B]=o.useState([new Date(e.getFullYear(),e.getMonth(),e.getDate()),new Date(e.getFullYear(),e.getMonth(),e.getDate()+1),new Date(e.getFullYear(),e.getMonth(),e.getDate()+2),new Date(e.getFullYear(),e.getMonth(),e.getDate()+3),new Date(e.getFullYear(),e.getMonth(),e.getDate()+4),new Date(e.getFullYear(),e.getMonth(),e.getDate()+5)]),[V,_]=o.useState([]);return t.jsxs(E,{children:[t.jsxs(L,{children:[t.jsx(p,{children:t.jsx(U,{children:"* DraggableSelector"})}),t.jsx(W,{dates:m,minTime:Number(s.split(":")[0]),maxTime:Number(i.split(":")[0]),timeSlots:V,setTimeSlots:_,mode:"day",timeUnit:d,dateFormat:T,timeFormat:H,slotWidth:n,slotHeight:g,slotsMarginTop:x,slotsMarginLeft:h,maxWidth:S,maxHeight:F,defaultSlotColor:y,selectedSlotColor:C,disabledSlotColor:D,hoveredSlotColor:M,slotsContainerBorder:v,slotsContainerBorderRadius:b})]}),t.jsxs(N,{children:[t.jsxs(p,{children:[t.jsx(k,{children:"* Control Ex."}),t.jsx(z,{children:"(not provided)"})]}),t.jsx(A,{timeUnit:d,setTimeUnit:w}),t.jsx(Y,{maxTime:i,minTime:s,setMaxTime:q,setMinTime:j}),t.jsx(R,{dates:m,setDates:B})]})]})}const E=a.div`
  display: flex;
  padding: 20px 30px 20px 0;
  justify-content: space-evenly;
  min-width: 870px;
  width: 100%;
`,L=a.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,N=a.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
  gap: 20px;
`,z=a.h1`
  font-size: 14px;
  font-weight: 700;
  font-family: 'SBAggroB', sans-serif;
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
`,p=a.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 40px;
`,U=a.h1`
  font-size: 26px;
  font-weight: 700;
  font-family: 'SBAggroB', sans-serif;
  background-color: rgba(30, 167, 253, 0.21);
`,k=a.h1`
  font-size: 20px;
  font-weight: 700;
  font-family: 'SBAggroB', sans-serif;
  background-color: rgba(255, 117, 146, 0.29);
`;try{r.displayName="SampleDayMode",r.__docgenInfo={description:"",displayName:"SampleDayMode",props:{dateFormat:{defaultValue:{value:"MM.DD"},description:"",name:"dateFormat",required:!1,type:{name:"string"}},timeFormat:{defaultValue:{value:"HH:mm A"},description:"",name:"timeFormat",required:!1,type:{name:"string"}},slotWidth:{defaultValue:{value:"62"},description:"",name:"slotWidth",required:!1,type:{name:"number"}},slotHeight:{defaultValue:{value:"18"},description:"",name:"slotHeight",required:!1,type:{name:"number"}},slotsMarginTop:{defaultValue:{value:"11"},description:"",name:"slotsMarginTop",required:!1,type:{name:"number"}},slotsMarginLeft:{defaultValue:{value:"20"},description:"",name:"slotsMarginLeft",required:!1,type:{name:"number"}},maxWidth:{defaultValue:{value:"546px"},description:"",name:"maxWidth",required:!1,type:{name:"string"}},maxHeight:{defaultValue:{value:"452px"},description:"",name:"maxHeight",required:!1,type:{name:"string"}},defaultSlotColor:{defaultValue:{value:"#FFFFFF"},description:"",name:"defaultSlotColor",required:!1,type:{name:"string"}},selectedSlotColor:{defaultValue:{value:"#b3c6d3"},description:"",name:"selectedSlotColor",required:!1,type:{name:"string"}},disabledSlotColor:{defaultValue:{value:"#e1e1e1"},description:"",name:"disabledSlotColor",required:!1,type:{name:"string"}},hoveredSlotColor:{defaultValue:{value:"#eef2f6"},description:"",name:"hoveredSlotColor",required:!1,type:{name:"string"}},slotsContainerBorder:{defaultValue:{value:"1px solid #8c8d94"},description:"",name:"slotsContainerBorder",required:!1,type:{name:"string"}},slotsContainerBorderRadius:{defaultValue:{value:"0px"},description:"",name:"slotsContainerBorderRadius",required:!1,type:{name:"string"}}}}}catch{}const K={title:"Playground/SampleDayMode",component:r,tags:[""],parameters:{layout:"padded"}},l={args:{slotWidth:62,slotHeight:18,slotsMarginTop:11,slotsMarginLeft:20,maxWidth:"546px",maxHeight:"452px",defaultSlotColor:"#FFFFFF",selectedSlotColor:"#b3c6d3",disabledSlotColor:"#e1e1e1",hoveredSlotColor:"#eef2f6",slotsContainerBorder:"1px solid #8c8d94",slotsContainerBorderRadius:"0px",dateFormat:"MM.DD",timeFormat:"HH:mm A"}};var u,c,f;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    slotWidth: 62,
    slotHeight: 18,
    slotsMarginTop: 11,
    slotsMarginLeft: 20,
    maxWidth: '546px',
    maxHeight: '452px',
    defaultSlotColor: '#FFFFFF',
    selectedSlotColor: '#b3c6d3',
    disabledSlotColor: '#e1e1e1',
    hoveredSlotColor: '#eef2f6',
    slotsContainerBorder: '1px solid #8c8d94',
    slotsContainerBorderRadius: '0px',
    dateFormat: 'MM.DD',
    timeFormat: 'HH:mm A'
  }
}`,...(f=(c=l.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};const Q=["DateMode"];export{l as DateMode,Q as __namedExportsOrder,K as default};
//# sourceMappingURL=DayMode.stories-5b52c6d1.js.map
