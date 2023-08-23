import{j as e}from"./jsx-runtime-4ca860c5.js";import{M as s}from"./index-8dd0ffe9.js";import{u as i}from"./index-e744116c.js";import"./index-61bf1805.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-256fc3e8.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./extends-35d9a1b8.js";import"./index-6a5bd4ef.js";import"./index-d37d4223.js";import"./index-356e4a49.js";const a=""+new URL("code-brackets-54d2874b.svg",import.meta.url).href,o=""+new URL("direction-6311b881.svg",import.meta.url).href,l=""+new URL("introduction-c60df8f8.png",import.meta.url).href;function r(n){const t=Object.assign({h1:"h1",h3:"h3",p:"p",a:"a",code:"code",h2:"h2",strong:"strong",pre:"pre",ol:"ol",li:"li"},i(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Intro & QuickStart"}),`
`,e.jsx("style",{children:`
    .subheading {
      --mediumdark: '#999999';
      font-weight: 700;
      font-size: 13px;
      color: #999;
      letter-spacing: 6px;
      line-height: 24px;
      text-transform: uppercase;
      margin-bottom: 12px;
      margin-top: 40px;
    }

    .link-list {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      row-gap: 10px;
    }

    @media (min-width: 620px) {
      .link-list {
        row-gap: 20px;
        column-gap: 20px;
        grid-template-columns: 1fr 1fr;
      }
    }

    @media all and (-ms-high-contrast:none) {
    .link-list {
        display: -ms-grid;
        -ms-grid-columns: 1fr 1fr;
        -ms-grid-rows: 1fr 1fr;
      }
    }

    .link-item {
      display: block;
      padding: 20px;
      border: 1px solid #00000010;
      border-radius: 5px;
      transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
      color: #333333;
      display: flex;
      align-items: flex-start;
    }

    .link-item:hover {
      border-color: #1EA7FD50;
      transform: translate3d(0, -3px, 0);
      box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
    }

    .link-item:active {
      border-color: #1EA7FD;
      transform: translate3d(0, 0, 0);
    }

    .link-item strong {
      font-weight: 700;
      display: block;
      margin-bottom: 2px;
    }

    .link-item img {
      height: 40px;
      width: 40px;
      margin-right: 15px;
      flex: none;
    }

    .link-item span,
    .link-item p {
      margin: 0;
      font-size: 14px;
      line-height: 20px;
    }

    .tip {
      display: inline-block;
      border-radius: 1em;
      font-size: 11px;
      line-height: 12px;
      font-weight: 700;
      background: #E7FDD8;
      color: #66BF3C;
      padding: 4px 12px;
      margin-right: 10px;
      vertical-align: top;
    }

    .tip-wrapper {
      font-size: 13px;
      line-height: 20px;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .tip-wrapper code {
      font-size: 12px;
      display: inline-block;
    }
  `}),`
`,e.jsx(t.h1,{id:"-react-draggable-selector",children:"🖍 React-Draggable-Selector"}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx(t.h3,{id:"select-with-a-simple-drag",children:"Select with a simple drag!"}),`
`,e.jsx(t.p,{children:"React-Draggable-Selector is a react component that allows users to easily select time ranges by dragging."}),`
`,e.jsxs(t.p,{children:["This package is for react applications, and uses ",e.jsx(t.a,{href:"https://emotion.sh/docs/introduction",target:"_blank",rel:"nofollow noopener noreferrer",children:"@emotion"})," for styling and ",e.jsx(t.a,{href:"https://www.npmjs.com/package/dayjs",target:"_blank",rel:"nofollow noopener noreferrer",children:"dayjs"})," for date and time management. Its main advantages are its intuitive drag-to-select functionality. You can select a time zone by ",e.jsx(t.code,{children:"day"})," of the week or by ",e.jsx(t.code,{children:"date"}),`.
Let's get started!`]}),`
`,e.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center"},children:e.jsx("img",{src:l,alt:"introImg",style:{width:"70%"}})}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx(t.h2,{id:"-quick-start",children:"🚀 Quick Start"}),`
`,e.jsx(t.h3,{id:"1-installation",children:e.jsx(t.strong,{children:"1. Installation"})}),`
`,e.jsx(t.p,{children:"Use npm package manager to install"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`$ npm install react-draggable-selector
`})}),`
`,e.jsx(t.p,{children:"or install with yarn"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`$ yarn add react-draggable-selector
`})}),`
`,e.jsx(t.h3,{id:"2-usage",children:e.jsx(t.strong,{children:"2. Usage"})}),`
`,e.jsx(t.p,{children:"Take out the component in your React project."}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"When using Javascript:"}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`import { useState } from 'react';
import { DraggableSelector } from "react-draggable-selector";

function App () {
  const [dates, setDates] = useState([]);  // Should inject sorted, not duplicated Date[]
  const [times, setTimes] = useState([]);

  return (
    <DraggableSelector
      minTime={9}              // required
      maxTime={14}             // required
      dates={dates}            // required, required default: []
      timeSlots={times}        // required, required default: []
      setTimeslots={setTimes}  // required
    />
  );
};

export default App;
`})}),`
`,e.jsxs(t.ol,{start:"2",children:[`
`,e.jsx(t.li,{children:"When using Typescript:"}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import { useState } from 'react';
import { DraggableSelector, TimeSlot } from "react-draggable-selector";

/*
interface TimeSlot {
  day: number;
  date: string;
  minTime: string;  // '09:00', '14:00'
  maxTime: string;  // '09:30', '14:30'
}
*/

function App () {
  const [dates, setDates] = useState<Date[]>([]);  // Should inject sorted, not duplicated Date[]
  const [times, setTimes] = useState<TimeSlot[]>([]);

  return (
    <DraggableSelector
      minTime={9}              // required, type: 'number'
      maxTime={14}             // required, type: 'number'
      dates={dates}            // required, type: 'Date[]', required default: []
      timeSlots={times}        // required, type: 'TimeSlot[]', required default: []
      setTimeslots={setTimes}  // required, type: 'React.Dispatch<React.SetStateAction<TimeSlot[]>>'
    />
  );
};

export default App;
`})}),`
`,e.jsx("br",{}),`
`,e.jsx("div",{className:"subheading",children:"SOURCE"}),`
`,e.jsxs("div",{className:"link-list",children:[e.jsxs("a",{className:"link-item",href:"https://github.com/lerrybe/react-draggable-selector",target:"_blank",children:[e.jsx("img",{src:a,alt:"code"}),e.jsx("span",{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"GitHub Source Code"}),`
View the source and add issues to contribute!`]})})]}),e.jsxs("a",{className:"link-item",href:"https://www.npmjs.com/package/react-draggable-selector",target:"_blank",children:[e.jsx("img",{src:o,alt:"direction"}),e.jsx("span",{children:e.jsxs(t.p,{children:[e.jsx("strong",{children:"NPM Publish"}),`
Go to npm to see the more info about the package.`]})})]})]})]})}function y(n={}){const{wrapper:t}=Object.assign({},i(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(r,n)})):r(n)}export{y as default};
//# sourceMappingURL=Introduction-64f00485.js.map
