import React from "react";
import "./SortingVisualizer.css";
import { genBubbleSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";
import { genInsertionSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";
import { genMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      width: parseInt(window.innerWidth),
      height: parseInt(window.innerHeight)
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    this.resetArray();
  }

  updateWindowDimensions() {
    this.setState({
      width: parseInt(window.innerWidth),
      height: parseInt(window.innerHeight)
    });
  }

  resetArray() {
    const newArray = [];
    const pad = 12;

    this.updateWindowDimensions();
    for (let i = 0; i < (this.state.width - pad * 2) / pad; i++) {
      newArray.push(randomIntFromInterval(40, this.state.height - 50 - pad));
    }
    this.setState({ array: newArray });
  }

  mergeSort() {
    const animations = genMergeSortAnimations(this.state.array);
    console.log(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  insertionSort() {
    const animations = genInsertionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      setTimeout(() => {
        barOneStyle.background = SECONDARY_COLOR;
        barTwoStyle.background = SECONDARY_COLOR;
      }, i * ANIMATION_SPEED_MS - ANIMATION_SPEED_MS / 3);
      setTimeout(() => {
        barOneStyle.background = PRIMARY_COLOR;
        barTwoStyle.background = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS + ANIMATION_SPEED_MS / 3);
      setTimeout(() => {
        const barOneHeight = parseInt(barOneStyle.height);
        barOneStyle.height = `${parseInt(barTwoStyle.height)}px`;
        barTwoStyle.height = `${barOneHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }

  bubbleSort() {
    const animations = genBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      setTimeout(() => {
        barOneStyle.background = SECONDARY_COLOR;
        barTwoStyle.background = SECONDARY_COLOR;
      }, i * ANIMATION_SPEED_MS - ANIMATION_SPEED_MS / 3);
      setTimeout(() => {
        barOneStyle.background = PRIMARY_COLOR;
        barTwoStyle.background = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS + ANIMATION_SPEED_MS / 3);
      if (swap) {
        setTimeout(() => {
          const barOneHeight = parseInt(barOneStyle.height);
          barOneStyle.height = `${parseInt(barTwoStyle.height)}px`;
          barTwoStyle.height = `${barOneHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {}

  selectionSort() {}

  heapSort() {}

  radixSort() {}

  render() {
    const { array } = this.state;

    return (
      <div>
        <div className="opt-bar">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.insertionSort()}>Insertion Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.selectionSort()}>Selection Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.radixSort()}>Radix Sort</button>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
