# 🖍 React-Draggable-Selector

<img src="https://user-images.githubusercontent.com/71599639/262469722-eaed6334-1a1f-446b-9078-749773e852e1.png" alt="intro" style="width: 700px" />


### Select with a simple drag!

React-Draggable-Selector is a react component that allows users to easily select time ranges by dragging.

This package is for react applications, and uses [@emotion](https://emotion.sh/docs/introduction) for styling and [dayjs](https://www.npmjs.com/package/dayjs) for date and time management. Its main advantages are its intuitive drag-to-select functionality. You can select a time zone by day of the week or by date. Let's get started!

# Live example & Document 
[Go to Document](https://64d1f2641de7b9e923f3c9d6-iebuvlnift.chromatic.com/?path=/docs/intro-quickstart--docs)

You can learn how to use it directly in the document.


# 🚀 Quick Start

## **1. Installation**

Use npm package manager to install

```bash
$ npm install react-draggable-selector
```

or install with yarn

```bash
$ yarn add react-draggable-selector
```

## **2. Usage**
Take out the component in your React project.

### 1. When using Javascript:

```jsx
import { useState } from 'react';
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
```

### 2. When using Typescript:

```tsx
import { useState } from 'react';
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
```

## **3. Props**

### **3.1. Required Props**

| Name (Prop)  | Type                                             | Description                                                                                                   | Default value | Required |
|--------------|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------|---------------|----------|
| dates        | Date[]                                           | Selected dates, you can making a selection for that date. Required default value is `[]`                      | -             | ✔️       |
| minTime      | number                                           | The start time to display. Type it in 24-hour notation and write it as follows, `9`                           | -             | ✔️       |
| maxTime      | number                                           | The last time to display. Type it in 24-hour notation and write it as follows, `18`                           | -             | ✔️       |
| timeSlots    | TimeSlot[]                                       | Array of selected time cells. You can also convert the information from output into a Date object and use it. | -             | ✔️       |
| setTimeSlots | React.Dispatch<React.SetStateAction<TimeSlot[]>> | The setState function of the selectedTimeSlots.                                                               | -             | ✔️       |


### **3.2. Optional Props**

| Name (Prop)                | Type                            | Description                                                                                                                                                                                              | Default value       | Required |
|----------------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|----------|
| timeUnit                   | 5 \| 10 \| 15 \| 20 \| 30 \| 60 | The time interval for the selector. The amount of time a cell has.                                                                                                                                       | 30                  |          | 
| dateFormat                 | string                          | Use the date format method of dayjs. You can use the following link to set the formatting form. (https://day.js.org/docs/en/display/format)                                                              | 'M.D'               |          |
| timeFormat                 | string                          | Use the time format method of dayjs. You can use the following link to set the formatting form. (https://day.js.org/docs/en/display/format)                                                              | 'HH:mm A'           |          |
| mode                       | 'date' \| 'day'                 | Decide whether to indicate all dates or by day of the week. (In the `day` version) If there is no day of the week corresponding to the selected date, the cell is blocked so that it cannot be selected. | 'day'               |          |
| slotWidth                  | number                          | The width of each slot. Assign the value in `number`.                                                                                                                                                    | 62                  |          |
| slotHeight                 | number                          | The height of each slot. Assign the value in `number`.                                                                                                                                                   | 18                  |          |
| slotsMarginTop             | number                          | The margin-top of slots container. Assign the value in `number`.                                                                                                                                         | 11                  |          |
| slotsMarginLeft            | number                          | The margin-left of slots container. Assign the value in `number`.                                                                                                                                        | 20                  |          |
| maxWidth                   | string                          | The max-width of selector. Assign the value in `string`. e.g. `536px`                                                                                                                                    | '546px'             |          |
| maxHeight                  | string                          | The max-height of selector. Assign the value in `string`. e.g. `452px`, `100%`                                                                                                                           | '452px'             |          |
| defaultSlotColor           | string                          | The default color of each slot. Assign the value in `string`. e.g. `#FFFFFF`                                                                                                                             | '#FFFFFF'           |          |
| selectedSlotColor          | string                          | The color of each slot when it is selected. Assign the value in `string`. e.g. `#FFF5E5`                                                                                                                 | '#b3c6d3'           |          |
| disabledSlotColor          | string                          | The color of each slot when it is disabled. Assign the value in `string`. e.g. `#e1e1e1`                                                                                                                 | '#e1e1e1'           |          |
| hoveredSlotColor           | string                          | The color of each slot when it is hovered. Assign the value in `string`. e.g. `#FFF5E5`                                                                                                                  | '#eef2f6'           |          |
| slotsContainerBorder       | string                          | The border of slots container. Assign the value in `string`. e.g. `1px solid #8c8d94`                                                                                                                    | '1px solid #8c8d94' |          |
| slotsContainerBorderRadius | string                          | The border-radius of slots container. Assign the value in `string`. e.g. `0px`, `5px`                                                                                                                    | '0px'               |          |


# License
The MIT License.

# Contribution & Issues & Bug report

Always welcome! 
I would appreciate it if you could leave it as an issue in the repository.
