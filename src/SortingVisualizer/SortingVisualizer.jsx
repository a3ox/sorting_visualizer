import React from "react";
import "./SortingVisualizer.css";
import { genBubbleSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";

const ANIMATION_SPEED = 5;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randomIntFromInterval(50, 800));
    }
    this.setState({ array });
  }

  mergeSort() {}

  bubbleSort() {
    const animations = genBubbleSortAnimations(this.state.array);
    const arrayBar = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const [barOneIndex, barTwoIndex, swap] = animations[i];
      const barOneStyle = arrayBar[barOneIndex].style;
      const barTwoStyle = arrayBar[barTwoIndex].style;
      setTimeout(() => {
        barOneStyle.background = SECONDARY_COLOR;
        barTwoStyle.background = SECONDARY_COLOR;
      }, i * ANIMATION_SPEED - ANIMATION_SPEED / 3);
      setTimeout(() => {
        barOneStyle.background = PRIMARY_COLOR;
        barTwoStyle.background = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED + ANIMATION_SPEED / 3);
      if (swap) {
        setTimeout(() => {
          const barOneHeight = parseInt(barOneStyle.height);
          barOneStyle.height = `${parseInt(barTwoStyle.height)}px`;
          barTwoStyle.height = `${barOneHeight}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  }

  quickSort() {}

  heapSort() {}

  radixSort() {}

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.radixSort()}>Radix Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
