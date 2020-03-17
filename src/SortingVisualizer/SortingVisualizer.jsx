import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "../animate.css";
import "./SortingVisualizer.css";
import { genBubbleSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";
import { genInsertionSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";
import { genMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";

const ANIMATION_SPEED_MS = 10;
const PRIMARY_COLOR = "#40e0d0";
const SECONDARY_COLOR = "#a7726e";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      width: parseInt(window.innerWidth),
      height: parseInt(window.innerHeight),
      algorithm: null
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

  updateAlgorithm(alg = null) {
    this.setState({
      algorithm: alg.bind(this)
    });
    const sortButton = document.getElementsByClassName("sort-button");
    sortButton[0].style.color = "#b1cc74";
  }

  resetArray() {
    const newArray = [];
    const pad = 12;

    this.updateWindowDimensions();
    for (let i = 0; i < (this.state.width - pad * 2) / pad; i++) {
      newArray.push(
        randomIntFromInterval(
          this.state.height / 6,
          this.state.height - 55 - pad
        )
      );
    }
    this.setState({ array: newArray });
  }

  sendNotification(title_in, type_in, message_in) {
    store.addNotification({
      title: title_in,
      message: message_in,
      type: type_in,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  }

  callSelectedSort() {
    if (this.state.algorithm) {
      const totalSortingTime = this.state.algorithm.call();
      setTimeout(() => {
        this.sendNotification("Success!", "success", "Sorting completed.");
      }, totalSortingTime);
    } else {
      this.sendNotification(
        "Error",
        "danger",
        "Please select a sorting algorithm."
      );
    }
  }

  mergeSort() {
    const animations = genMergeSortAnimations(this.state.array);
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
    return animations.length * ANIMATION_SPEED_MS;
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
    return animations.length * ANIMATION_SPEED_MS;
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
    return animations.length * ANIMATION_SPEED_MS;
  }

  // quickSort() {}
  // selectionSort() {}
  // heapSort() {}
  // radixSort() {}

  render() {
    const { array } = this.state;

    return (
      <div>
        <div className="opt-bar">
          <button className="opt-button" onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button
            className="opt-button"
            onClick={() => this.updateAlgorithm(this.mergeSort)}
          >
            Merge Sort
          </button>
          <button
            className="opt-button"
            onClick={() => this.updateAlgorithm(this.insertionSort)}
          >
            Insertion Sort
          </button>
          <button
            className="opt-button"
            onClick={() => this.updateAlgorithm(this.bubbleSort)}
          >
            Bubble Sort
          </button>
          <button
            className="sort-button"
            onClick={() => this.callSelectedSort()}
          >
            Preform Sort
          </button>

          {/* <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.selectionSort()}>Selection Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.radixSort()}>Radix Sort</button> */}
        </div>
        <div className="array-container">
          <ReactNotification />
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
